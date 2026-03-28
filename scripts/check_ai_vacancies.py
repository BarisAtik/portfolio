#!/usr/bin/env python3
"""
Check for new AI-related vacancies on mijn.freelance.nl/dashboard.
Logs in with user-provided credentials via Playwright, then scrapes
the dashboard for vacancies with 'ai' in the title.
"""

import getpass
import sys
import re
from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout


def get_credentials():
    email = input("Email: ").strip()
    if not email:
        print("Error: email cannot be empty.")
        sys.exit(1)
    password = getpass.getpass("Password: ")
    if not password:
        print("Error: password cannot be empty.")
        sys.exit(1)
    return email, password


def login(page, email, password):
    print("Navigating to login page...")
    page.goto("https://mijn.freelance.nl/login", wait_until="networkidle", timeout=30000)

    # Try common login form selectors
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

    email_field = None
    for sel in email_selectors:
        if page.locator(sel).count() > 0:
            email_field = page.locator(sel).first
            break

    password_field = None
    for sel in password_selectors:
        if page.locator(sel).count() > 0:
            password_field = page.locator(sel).first
            break

    if not email_field or not password_field:
        # Fallback: dump page content for debugging
        print("Could not find login form fields. Page title:", page.title())
        print("Visible input fields:")
        for inp in page.locator("input").all():
            print(f"  type={inp.get_attribute('type')} name={inp.get_attribute('name')} id={inp.get_attribute('id')}")
        sys.exit(1)

    print("Filling in credentials...")
    email_field.fill(email)
    password_field.fill(password)

    # Click submit button
    submit_selectors = [
        'button[type="submit"]',
        'input[type="submit"]',
        'button:has-text("Log in")',
        'button:has-text("Inloggen")',
        'button:has-text("Login")',
    ]
    submitted = False
    for sel in submit_selectors:
        if page.locator(sel).count() > 0:
            page.locator(sel).first.click()
            submitted = True
            break

    if not submitted:
        # Fallback: press Enter in the password field
        password_field.press("Enter")

    # Wait for navigation after login
    try:
        page.wait_for_url("**/dashboard**", timeout=15000)
    except PWTimeout:
        # Maybe redirected elsewhere — check if still on login page
        if "login" in page.url.lower():
            print("Login appears to have failed. Check your credentials.")
            print(f"Current URL: {page.url}")
            sys.exit(1)
        print(f"Logged in, but landed on: {page.url}")


def check_ai_vacancies(page):
    print("Navigating to dashboard...")
    if "dashboard" not in page.url:
        page.goto("https://mijn.freelance.nl/dashboard", wait_until="networkidle", timeout=30000)
    else:
        page.wait_for_load_state("networkidle")

    print("Scanning for AI-related vacancies...\n")

    # Collect all text content from links and headings that could be vacancy titles
    vacancy_selectors = [
        "a",
        "h1", "h2", "h3", "h4", "h5",
        "[class*='vacancy']",
        "[class*='Vacancy']",
        "[class*='project']",
        "[class*='Project']",
        "[class*='assignment']",
        "[class*='opdracht']",
        "tr td",
        "li",
    ]

    ai_pattern = re.compile(r"\bai\b", re.IGNORECASE)
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
            if ai_pattern.search(text):
                href = el.get_attribute("href") or ""
                found.append((text, href))

    # Deduplicate: remove entries whose text is a substring of another
    unique = []
    texts_sorted = sorted(found, key=lambda x: len(x[0]), reverse=True)
    for text, href in texts_sorted:
        if not any(text in other_text and text != other_text for other_text, _ in unique):
            unique.append((text, href))

    if not unique:
        print("No vacancies with 'AI' in the title found on the dashboard.")
    else:
        print(f"Found {len(unique)} AI-related vacancy/vacancies:\n")
        for i, (text, href) in enumerate(unique, 1):
            # Truncate very long text
            display = text[:120] + "..." if len(text) > 120 else text
            print(f"  {i}. {display}")
            if href and href.startswith("http"):
                print(f"     Link: {href}")
            elif href and href.startswith("/"):
                print(f"     Link: https://mijn.freelance.nl{href}")
            print()

    return unique


def main():
    email, password = get_credentials()

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            )
        )
        page = context.new_page()

        try:
            login(page, email, password)
            vacancies = check_ai_vacancies(page)
            sys.exit(0 if vacancies else 1)
        except PWTimeout as e:
            print(f"Timeout error: {e}")
            sys.exit(1)
        except Exception as e:
            print(f"Error: {e}")
            sys.exit(1)
        finally:
            browser.close()


if __name__ == "__main__":
    main()
