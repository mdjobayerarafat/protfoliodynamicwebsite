# Flexy Dev - Next.js Portfolio Template

![](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)

![](https://img.shields.io/badge/license-MIT-blue.svg)

[![Premium Version](https://img.shields.io/badge/PREMIUM_%20VERSION-AVAILABLE-%2300C7B7?style=for-the-badge&logo=stellar&logoColor=white)](https://basit313.gumroad.com/l/nextjs-developer-portfolio-template)

✨ **Professional Portfolio Template** built with Next.js 14 • 🚀 Tailwind CSS • 📱 Fully Responsive • 🎨 Modern Design • 🔍 SEO Friendly

![Next.js Portfolio Template Hero Section](https://ik.imagekit.io/cpnw7c0xpe/Tailwind%20Components/Templates/flexy-dev-portfolio-hero-section.png?updatedAt=1741687009768)

## 🚀 How to Run the Project

Follow these steps to set up and run the project locally:

### 1️⃣ Install Dependencies

After downloading/cloning the project, navigate to the project directory and run:

```bash
npm install
# or
yarn install
```

This will install all required dependencies.

### 2️⃣ Start the Development Server

Once the installation is complete, start the server with:

```bash
npm run dev
# or
yarn dev
```

Your portfolio will now be running at `http://localhost:3000`.

### ⚠️ Important: Set Up Environment Variables

Before running the project, make sure to create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

This ensures proper configuration of environment variables.

## Folder Structure Overview

![Next.js portfolio template folder structure overview](https://ik.imagekit.io/cpnw7c0xpe/Tailwind%20Components/Templates/Folder%20Structure%20Overview.png?updatedAt=1741684501824)

- **content:** Contains data for projects. Add any additional section data here.
- **Components:** All the UI components of app e.g. navbar, hero, projects, footer etc
- **src/services:** Retrieves data (e.g., projects) using the fs module. Update this file if you change or modify the data source.
- **src/assets:** Stores all assets, including images and icons, additionally you can add audio, video, and local fonts here.
- **src/hooks:** Holds custom hooks.
- **src/lib/types.d.ts:** Contains TypeScript types.
- **util/icons:** Centralizes icons and images for easy updates.
- **appData:** Includes app data, such as services and skills (including icons).
- **app/page.tsx:** Root file of the app.
- **app/layout.tsx:** Manages global and SEO configurations (e.g., fonts, head tags, analytics).

## Customizing the Template

1. Navbar
   - File: navbar.tsx
     - Update the navbar name from john_doe to your name.
2. Hero Section
   - File: hero.tsx
     - Edit the title, description, and optionally, replace the SVG with your image.
3. Projects Section
   - File: content/projects
     - Replace the dummy projects with your own.
     - If you are modifying the properties or going to add new ones, then update types in types.d.ts.
4. Services Section
   - File: appData
     - Add your services with relevant icons. If icons are missing, contact me on LinkedIn or via email.
5. Skills Section
   - File: appData
     - Add your skills with relevant icons. Contact if you can’t find specific icons online.
6. Footer
   - Location: Visit [Flexy UI](http://flexyui.com/)
     - You can replace the default footer or choose from additional variants [from Flexy UI](http://flexyui.com/) (simple or column footer).

![Project section](https://ik.imagekit.io/cpnw7c0xpe/Tailwind%20Components/Templates/flexy-dev-portfolio-portfolio.png?updatedAt=1739182152345)

## Configuring Online Images

To display online images (e.g., from a CDN) in your deployed project, configure allowed image hostnames in next.config.js.

For demo purposes, we’re using Unsplash images. You can use any image host, but be sure to add the hostname in your configuration.

Replace 'unsplash' with your own image `hostnames` if using a different service or add a new object.

## Theming and Styling

We use Tailwind CSS for styling. In tailwind.config.ts, you can customize theme settings such as fonts, colors, and animations.

## SEO & Branding

1. Favicon: Replace the default favicon with your own.
2. Metadata: Update meta title and description in layout.tsx.
3. SEO Files: robots.ts and sitemap.ts are included for search engines.
4. Open Graph Images:
   - Replace `opengraph-image.png` and `twitter-image.png `with custom images.
   - Alternatively, edit `opengraph-image.tsx` to generate images dynamically.

### If you find this template helpful, don't forget to ⭐️ the repo!

## 💎 Upgrade to Premium

✨ **Premium Features Include:**

- 🎨 **Advanced Theme System**  
  Switch or choose 4 built-in themes:  
  `Dark` | `Light` | `Retro` | `Aqua`

  [+] Create custom themes with CSS variables

- 📝 MDX Blog System with Categories/Tags
- 💬 Interactive Testimonials Section
- 📩 Contact Form with Formspree Integration
- 🖥️ Premium Footer Design
- 🚨 Priority Email Support
- 🔄 Regular Feature Updates

[Get Premium Version](https://basit313.gumroad.com/l/nextjs-developer-portfolio-template) | [View Premium Demo](https://nextjs-dev-portfolio.netlify.app/)

## 🆓 vs 💎 Premium

| **Feature**          | **Free Version** | **Premium Version**      |
| -------------------- | ---------------- | ------------------------ |
| Blog System (MDX)    | ❌               | ✅ Full Integration      |
| Testimonials Section | ❌               | ✅ Interactive           |
| Contact Form         | ❌               | ✅ Functional Premium UI |
| Footer Design        | Standard         | ✅ Premium UI            |
| Theme Options        | Dark Theme       | ✅ 4+Custom              |
| UI Components        | 10               | 25+                      |
| Email Support        | ✅               | ✅ Priority              |

![services and footer section](https://ik.imagekit.io/cpnw7c0xpe/Tailwind%20Components/Templates/flexy-dev-marquee-and-footer.png?updatedAt=1739182152260)

## Analytics

You can integrate analytics easily:

1. Simple Analytics or Vercel Analytics: Quick and easy to set up.
2. Google Analytics 4: Also straightforward.

## Deployment Notes

Before deploying, add environment variables from .env.local wherever you are deploying:

1. NEXT_PUBLIC_SITE_URL: Set to your actual site URL (e.g., https://johndoe.com).
2. For local development, use the localhost URL.

For any query or suggestion, I am available on [LinkedIn](https://www.linkedin.com/in/abdulbasitprofile/) or email me at basit@codevertiser.com
