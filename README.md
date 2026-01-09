# Baris Cagri Atik - Portfolio

A sophisticated, minimal portfolio showcasing AI/ML and cybersecurity expertise with an interactive neural network visualization.

## Features

- **Professional Monochrome Design**: Clean black & white aesthetic inspired by top design studios
- **Interactive Neural Network**: Live canvas animation showing connected neurons that react to mouse movement
- **Dark/Light Mode**: Smooth theme switching with system preference detection
- **Fully Responsive**: Mobile-first approach with elegant mobile navigation
- **Performance Optimized**: Built with Next.js 16, TypeScript, and optimized animations

## Design Philosophy

Inspired by studios like [Bettina Sosa](https://www.bettinasosa.com/) and [Atipo Foundry](https://www.atipofoundry.com/), this portfolio embraces:

- Minimal color palette (monochromatic with subtle grays)
- Professional typography (Bricolage Grotesque, Playfair Display, Space Grotesk)
- Clean layouts with generous whitespace
- Subtle interactions and animations
- Focus on content and readability

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Canvas**: HTML5 Canvas for neural network visualization

## Sections

1. **Hero** - Animated introduction with live neural network background
2. **Work Experience** - Timeline of professional roles
3. **Projects** - Bento grid showcase of AI/ML projects
4. **Education & Certificates** - Academic and professional credentials
5. **Technical Skills** - Categorized skill levels with animated bars
6. **Personal** - Hobbies, interests, and philosophy
7. **Contact** - Multiple ways to get in touch

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Customization

Update these files with your information:

- `components/Hero.tsx` - Name and introduction
- `components/WorkExperience.tsx` - Work history
- `components/Projects.tsx` - Your projects
- `components/Certificates.tsx` - Education
- `components/Skills.tsx` - Technical skills
- `components/Personal.tsx` - Hobbies
- `components/Contact.tsx` - Contact info

## Deployment

### Vercel (Recommended)

```bash
npx vercel
```

### Build

```bash
npm run build
npm start
```

## Known Issues

- Remove `@next/font` package (deprecated): `npm uninstall @next/font`
- Theme toggle requires browser refresh in development mode

## License

MIT
