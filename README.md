# Ranjanalipi Calligraphy Web Application

A modern web application for Nepali calligraphy recognition and analysis, built with React, TypeScript, and Vite.

## 🚀 Features

- **User Authentication** - Login, signup, and password recovery
- **Calligraphy Analysis** - Upload and analyze Nepali calligraphy samples
- **Results Dashboard** - View detailed analysis results
- **User Profile** - Manage your account and preferences
- **History Tracking** - Access your previous analysis results
- **Dark/Light Theme** - Toggle between themes for comfortable viewing
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS with shadcn/ui components
- **Routing:** React Router v6
- **State Management:** TanStack Query (React Query)
- **Form Handling:** React Hook Form with Zod validation
- **UI Components:** Radix UI primitives
- **Theme:** next-themes for dark mode support

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/LokeshShrestha/Ranjanalipi-Calligraphy-Webapp.git
cd Ranjanalipi-Calligraphy-Webapp/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🌐 Deployment

This project is optimized for deployment on Vercel or Netlify:

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite and deploy automatically

### Netlify
1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   │   └── ui/        # shadcn/ui components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and API
│   ├── pages/         # Route pages/views
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── index.html         # HTML template
```

## 🎨 Key Components

- **Authentication Pages:** Login, Signup, Forgot Password
- **Main Pages:** Home, Dashboard, Results, History, Profile, About
- **Theme System:** Dark/Light mode with system preference detection
- **UI Library:** Full suite of accessible components from shadcn/ui

## 🔐 Environment Variables

Create a `.env` file in the root directory for any environment-specific configuration:

```env
VITE_API_BASE_URL=your_api_url_here
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is part of an academic assignment for Computer Vision (Sem 2.5).

## 👨‍💻 Author

**Lokesh Shrestha**

---

Built with ❤️ for Nepali Calligraphy Recognition
