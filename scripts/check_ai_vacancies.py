#!/usr/bin/env python3
"""
Check for new AI-related vacancies on mijn.freelance.nl/dashboard.

Logs in with credentials (from env vars or interactive prompt), navigates
to the dashboard, searches for 'ai' via the search bar, and lists matching
vacancies.

Usage:
    # Interactive (prompts for email & password):
    python check_ai_vacancies.py

    # Non-interactive (env vars):
    FREELANCE_EMAIL=you@example.com FREELANCE_PASSWORD=secret python check_ai_vacancies.py

    # Debug mode (saves screenshots on each step):
    python check_ai_vacancies.py --debug
"""

import getpass
import os
import sys
import re
import argparse
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

BASE_URL = "https://mijn.freelance.nl"
SEARCH_TERM = "ai"


def get_credentials():
    email = os.environ.get("FREELANCE_EMAIL") or input("Email: ").strip()
    if not email:
        print("Error: email cannot be empty.")
        sys.exit(1)
    password = os.environ.get("FREELANCE_PASSWORD") or getpass.getpass("Password: ")
    if not password:
        print("Error: password cannot be empty.")
        sys.exit(1)
    return email, password


def screenshot(page, name, debug):
    if debug:
        path = f"/tmp/freelance_{name}.png"
        page.screenshot(path=path, full_page=True)
        print(f"  [debug] Screenshot saved: {path}")


def find_and_fill(page, selectors, value, field_name):
    """Try multiple selectors to find a field, fill it, and return it."""
    for sel in selectors:
        loc = page.locator(sel)
        if loc.count() > 0 and loc.first.is_visible():
            loc.first.fill(value)
            return loc.first
    # Fallback: try all visible inputs and match by placeholder/label heuristics
    for inp in page.locator("input:visible").all():
        placeholder = (inp.get_attribute("placeholder") or "").lower()
        aria = (inp.get_attribute("aria-label") or "").lower()
        if field_name.lower() in placeholder or field_name.lower() in aria:
            inp.fill(value)
            return inp
    return None


def login(page, email, password, debug):
    print("Navigating to login page...")
    page.goto(f"{BASE_URL}/login", wait_until="domcontentloaded", timeout=30000)
    # Wait for JS to render the form
    try:
        page.wait_for_selector("input", timeout=15000)
    except PWTimeout:
        screenshot(page, "login_no_inputs", debug)
        print("No input fields found on login page.")
        print(f"Current URL: {page.url}")
        print(f"Page title: {page.title()}")
        sys.exit(1)

    screenshot(page, "01_login_page", debug)

    email_selectors = [
        'input[name="email"]',
        'input[name="username"]',
        'input[type="email"]',
        'input[id="email"]',
        'input[id="username"]',
        'input[name="login"]',
    ]
    password_selectors = [
        'input[name="password"]',
        'input[type="password"]',
        'input[id="password"]',
    ]

    email_field = find_and_fill(page, email_selectors, email, "email")
    password_field = find_and_fill(page, password_selectors, password, "password")

    if not email_field or not password_field:
        screenshot(page, "login_fields_missing", debug)
        print("Could not find login form fields. Page title:", page.title())
        print("Visible input fields:")
        for inp in page.locator("input:visible").all():
            print(
                f"  type={inp.get_attribute('type')} "
                f"name={inp.get_attribute('name')} "
                f"id={inp.get_attribute('id')} "
                f"placeholder={inp.get_attribute('placeholder')}"
            )
        sys.exit(1)

    print("Filling in credentials...")
    screenshot(page, "02_credentials_filled", debug)

    # Click submit button
    submit_selectors = [
        'button[type="submit"]',
        'input[type="submit"]',
        'button:has-text("Log in")',
        'button:has-text("Inloggen")',
        'button:has-text("Login")',
        'button:has-text("Sign in")',
        'a:has-text("Inloggen")',
    ]
    submitted = False
    for sel in submit_selectors:
        loc = page.locator(sel)
        if loc.count() > 0 and loc.first.is_visible():
            loc.first.click()
            submitted = True
            break

    if not submitted:
        password_field.press("Enter")

    # Wait for navigation after login — accept dashboard or any non-login URL
    try:
        page.wait_for_url(
            lambda url: "login" not in url.lower(),
            timeout=20000,
        )
    except PWTimeout:
        screenshot(page, "login_failed", debug)
        print("Login appears to have failed — still on login page.")
        print(f"Current URL: {page.url}")
        sys.exit(1)

    screenshot(page, "03_after_login", debug)
    print(f"Logged in. Current URL: {page.url}")


def search_ai_vacancies(page, debug):
    """Try to use the site's search functionality to filter for 'ai' vacancies."""
    print("Looking for search functionality...")

    search_selectors = [
        'input[type="search"]',
        'input[name="search"]',
        'input[name="q"]',
        'input[name="query"]',
        'input[id="search"]',
        'input[placeholder*="oek"]',     # "Zoek" (Dutch for search)
        'input[placeholder*="earch"]',   # "Search"
        'input[placeholder*="Filter"]',
        'input[aria-label*="oek"]',
        'input[aria-label*="earch"]',
        '[class*="search"] input',
        '[class*="Search"] input',
        '[class*="filter"] input',
        '[role="search"] input',
    ]

    search_field = None
    for sel in search_selectors:
        loc = page.locator(sel)
        if loc.count() > 0 and loc.first.is_visible():
            search_field = loc.first
            print(f"  Found search field: {sel}")
            break

    if not search_field:
        # Try generic approach: look for any text input that looks like search
        for inp in page.locator("input:visible").all():
            input_type = (inp.get_attribute("type") or "text").lower()
            if input_type in ("text", "search", ""):
                placeholder = (inp.get_attribute("placeholder") or "").lower()
                name = (inp.get_attribute("name") or "").lower()
                # Skip login-related fields
                if any(kw in name + placeholder for kw in ["email", "password", "login", "user"]):
                    continue
                search_field = inp
                print(f"  Using text input as search (placeholder='{placeholder}')")
                break

    if search_field:
        search_field.fill(SEARCH_TERM)
        screenshot(page, "04_search_filled", debug)

        # Try to submit the search
        search_submitted = False

        # Look for a search button nearby
        search_btn_selectors = [
            'button[type="submit"]',
            'button:has-text("Zoek")',
            'button:has-text("Search")',
            'button:has-text("Filter")',
            '[class*="search"] button',
            'button[aria-label*="oek"]',
            'button[aria-label*="earch"]',
        ]
        for sel in search_btn_selectors:
            loc = page.locator(sel)
            if loc.count() > 0 and loc.first.is_visible():
                loc.first.click()
                search_submitted = True
                print(f"  Clicked search button: {sel}")
                break

        if not search_submitted:
            search_field.press("Enter")
            print("  Pressed Enter to submit search.")

        # Wait for results to load
        try:
            page.wait_for_load_state("networkidle", timeout=10000)
        except PWTimeout:
            pass
        screenshot(page, "05_search_results", debug)
        return True
    else:
        print("  No search bar found — will scan page content directly.")
        return False


def collect_vacancies(page, filter_ai):
    """Scan the current page for vacancy listings. If filter_ai is True,
    only return those matching 'ai' in the title."""
    ai_pattern = re.compile(r"\bai\b", re.IGNORECASE)

    vacancy_selectors = [
        "a",
        "h1", "h2", "h3", "h4", "h5",
        "[class*='vacancy']", "[class*='Vacancy']",
        "[class*='project']", "[class*='Project']",
        "[class*='assignment']", "[class*='Assignment']",
        "[class*='opdracht']", "[class*='Opdracht']",
        "[class*='result']", "[class*='Result']",
        "[class*='listing']", "[class*='Listing']",
        "tr td",
        "li",
        "[class*='card']",
    ]

    found = []
    seen_texts = set()

    for sel in vacancy_selectors:
        for el in page.locator(sel).all():
            try:
                text = el.inner_text(timeout=2000).strip()
            except Exception:
                continue
            if not text or text in seen_texts or len(text) < 5:
                continue
            seen_texts.add(text)
            if not filter_ai or ai_pattern.search(text):
                href = el.get_attribute("href") or ""
                found.append((text, href))

    # Deduplicate: keep longest non-substring entries
    unique = []
    texts_sorted = sorted(found, key=lambda x: len(x[0]), reverse=True)
    for text, href in texts_sorted:
        if not any(text in other_text and text != other_text for other_text, _ in unique):
            unique.append((text, href))

    return unique


def display_vacancies(vacancies):
    if not vacancies:
        print("\nNo AI-related vacancies found.")
        return

    print(f"\nFound {len(vacancies)} AI-related vacancy/vacancies:\n")
    for i, (text, href) in enumerate(vacancies, 1):
        # Show first line of text (vacancy title) and truncate
        title = text.split("\n")[0].strip()
        display = title[:140] + "..." if len(title) > 140 else title
        print(f"  {i}. {display}")
        if href and href.startswith("http"):
            print(f"     Link: {href}")
        elif href and href.startswith("/"):
            print(f"     Link: {BASE_URL}{href}")
        print()


def main():
    parser = argparse.ArgumentParser(description="Check AI vacancies on freelance.nl")
    parser.add_argument("--debug", action="store_true", help="Save screenshots at each step to /tmp/")
    parser.add_argument("--headed", action="store_true", help="Run browser in headed mode (visible)")
    args = parser.parse_args()

    email, password = get_credentials()

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=not args.headed)
        context = browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ),
            viewport={"width": 1280, "height": 900},
        )
        page = context.new_page()

        try:
            login(page, email, password, args.debug)

            # Navigate to dashboard
            print("Navigating to dashboard...")
            page.goto(f"{BASE_URL}/dashboard", wait_until="domcontentloaded", timeout=30000)
            try:
                page.wait_for_load_state("networkidle", timeout=15000)
            except PWTimeout:
                pass
            screenshot(page, "04_dashboard", args.debug)

            # Attempt to search for 'ai' via the search bar
            used_search = search_ai_vacancies(page, args.debug)

            # Collect vacancies — if we searched, grab all results;
            # if not, filter by 'ai' pattern locally
            vacancies = collect_vacancies(page, filter_ai=not used_search)

            # If search was used but returned no results, also try without
            # search to scan dashboard directly
            if used_search and not vacancies:
                print("Search returned no results, scanning dashboard directly...")
                page.goto(f"{BASE_URL}/dashboard", wait_until="domcontentloaded", timeout=30000)
                try:
                    page.wait_for_load_state("networkidle", timeout=15000)
                except PWTimeout:
                    pass
                vacancies = collect_vacancies(page, filter_ai=True)

            display_vacancies(vacancies)
            screenshot(page, "06_final", args.debug)

            sys.exit(0 if vacancies else 1)

        except PWTimeout as e:
            screenshot(page, "error_timeout", args.debug)
            print(f"Timeout error: {e}")
            sys.exit(1)
        except Exception as e:
            screenshot(page, "error_general", args.debug)
            print(f"Error: {e}")
            sys.exit(1)
        finally:
            browser.close()


if __name__ == "__main__":
    main()
