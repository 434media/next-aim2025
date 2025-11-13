# AIM Health R&D Summit

## 🚀 Project Overview
 
The AIM Summit website serves as the central hub for attendees, sponsors, and speakers to access event information, register, and engage with the summit content. Built with modern web technologies, it features dynamic content, interactive elements, and seamless user experience across all devices.

### Key Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Components**: Dynamic hero sections, animated elements, and engaging UI
- **Event Management**: Integration with Whova for registration and scheduling
- **Content Management**: Dynamic speaker profiles, sponsor showcases, and event information
- **Performance Optimized**: Fast loading times and smooth animations
- **Accessibility Focused**: WCAG compliant with proper semantic HTML and ARIA labels

## 🛠 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Motion
- **External Integrations**: Whova, Airtable, Turnstile

## 📁 Project Structure

Here's an overview of the key directories and files in this project:

-   `app/`: Contains the core application logic using the Next.js App Router.
    -   [`layout.tsx`](app/layout.tsx): The main layout component that wraps all pages. It defines the root `<html>` and `<body>` tags and includes global components like the [`NavBar`](components/ui/Navbar.tsx) and [`Footer`](components/ui/Footer.tsx).
    -   `page.tsx`: The entry point for the homepage of the application.
    -   `globals.css`: Global stylesheet, including Tailwind CSS directives and base styles.
    -   `api/`: Holds all API route handlers for server-side logic, such as form submissions.
-   `components/`: Contains all reusable React components used throughout the application.
-   `data/`: For static data, such as site configuration, navigation links, or partner information.
-   `hooks/`: Stores custom React hooks (e.g., for media queries or other shared logic).
-   `lib/`: A place for utility functions, helper scripts, and external API client configurations.


## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- pnpm package manager
- Git

### Local Development Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-org/next-aim2025.git
    cd next-aim2025
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables**
    Create a `.env.local` file in the root directory and add the required keys:
    ```env
    # Required for contact form
    AIRTABLE_BASE_ID=your_airtable_base_id
    AIRTABLE_API_KEY=your_airtable_api_key
   
    # Required for Turnstile (Cloudflare captcha)
    TURNSTILE_SECRET_KEY=your_turnstile_secret_key
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
    ```

4.  **Start the development server**
    ```bash
    pnpm run dev
    ```

5.  **Open your browser**
    Navigate to [http://localhost:3000](http://localhost:3000)

## 🔄 Development Workflow & Contribution Process

Follow these steps to contribute to the project.

### 1. Create a New Feature Branch

Ensure you are on the `main` branch and have the latest changes. Then, create a descriptive branch name for your feature or fix.

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### 2. Make and Commit Changes

Make your code changes and test them locally. Once you are done, commit them with a descriptive, conventional commit message.

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add mobile-optimized speaker profile cards"
```

### 3. Push and Create a Pull Request

Push your branch to GitHub and open a Pull Request (PR) to merge into the `main` branch.

```bash
git push origin feature/your-feature-name
```

In GitHub, create a new PR, provide a clear title and description, and request a review from the team leads.

### 4. Code Review and Merge

The team leads will review your code for quality and adherence to guidelines. Address any feedback by pushing new commits to your branch. Once your PR is approved, a team lead will merge it into `main`.

### 5. Clean Up

After your PR is merged, switch back to the `main` branch, pull the latest changes, and delete your feature branch.

```bash
git checkout main
git pull origin main
git branch -d feature/your-feature-name
```

## 📦 Deployment

The site is deployed automatically when changes are merged to the main branch. The deployment process:

1. **Automatic deployment** via Vercel
   - Connects to the GitHub repository
   - Monitors the main branch for changes
   - Runs build scripts and deploys the latest version
2. **Environment variables** are configured in Vercel dashboard
   - Ensure all required variables are set before merging
   - Sensitive keys like API keys are stored securely
3. **Build process** runs automatically
4. **Live site** updates within minutes

## 🎨 Design System

### Colors
- **AIM Navy**: \`#101310\` - Primary dark background
- **Bexar Blue**: \`#548cac\` - Accent color for links and highlights  
- **Military Green**: \`#4f4f2c\` - Secondary accent
- **Orange**: \`#f97316\` - Call-to-action elements

### Typography
- **Primary Font**: Geist Sans (modern, clean)
- **Responsive scaling** using clamp() functions
- **Accessibility-first** approach with proper contrast ratios

### Components
- All components are in the \`components/\` directory
- Use existing components before creating new ones
- Follow the established naming conventions
- Maintain responsive design principles

### Modifying Styles
1. Use Tailwind classes when possible
2. Custom styles go in component files or \`globals.css\`
3. Follow the established color scheme
4. Test on multiple screen sizes

## 🆘 Getting Help

### Resources
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Motion**: [motion.dev](https://www.framer.com/motion/)
- **TypeScript**: [typescriptlang.org/docs](https://www.typescriptlang.org/docs/)
- **GitHub Issues**: Check for existing issues before creating new ones


## 📝 Contributing Guidelines

1. **Follow the established code style**
2. **Write descriptive commit messages**
3. **Test thoroughly before submitting PRs**
4. **Ask questions when unsure**
5. **Be respectful in code reviews**
6. **Document complex logic with comments**
7. **Keep PRs focused and small when possible**

---

**Happy coding! 🚀**

For questions or issues, reach out to the development team leads or create an issue in the GitHub repository.
