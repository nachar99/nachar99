window.PORTFOLIO_DATA = {
  profile: {
    name: "Abdulrahman Al Nachar",
    shortBio:
      "Full-stack developer working with the MERN stack (MongoDB, Express, React, Node.js).",
    aboutBody:
      "Computer science has always been a passion of mine, and that's what pushed me toward learning full-stack development. I've always enjoyed understanding how systems work and how different parts of an application come together.\n\nSo I started focusing on the MERN stack (MongoDB, Express, React, and Node.js) and learning by building real projects. Along the way I've worked on things like authentication systems, APIs, and full CRUD applications, including a full-stack task management platform.\n\nFor me the best way to learn has been simple: build new projects, run into problems, figure them out, and keep improving.",
    skills: [
      {
        label: "Programming Languages",
        items: ["JavaScript", "HTML", "CSS", "Python", "Java"],
      },
      {
        label: "Frameworks & Libraries",
        items: ["React", "Express", "Mongoose"],
      },
      {
        label: "Technologies & Tools",
        items: [
          "Git",
          "Node",
          "npm",
          "GitHub",
          "MongoDB",
          "Render (Deployment)",
        ],
      },
    ],
    focus: "Full-stack Engineer",
    location: "Chicago, IL",
    email: "alnacharcs99@gmail.com",
    githubUrl: "https://github.com/nachar99",
    linkedinUrl: "https://www.linkedin.com/in/alnachar1999",
  },
  projects: [
    {
      title: "Task Management Platform",
      repo: "nachar99/Task-Management-Platform",
      summary:
        "A full-stack MERN application for managing projects and tasks with role-based access control.",
      details:
        "Built a full-stack task management platform using the MERN stack (MongoDB, Express, React, Node.js). Implemented user authentication with JWT and protected routes to secure user data. Developed RESTful APIs for task creation, updates, and deletion with full CRUD functionality. Designed a React frontend to allow users to manage tasks and interact with the application in real time. Integrated MongoDB to store user accounts and task data.",
      status: "Full-stack project",
      tech: [
        "React",
        "Vite",
        "tailwind CSS",
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "JWT",
        "bcryptjs",
      ],
      images: [
        {
          src: "./assets/screenshots/task management platform/1.png",
          alt: "Task management dashboard overview",
        },
        {
          src: "./assets/screenshots/task management platform/2.png",
          alt: "Projects page",
        },
        {
          src: "./assets/screenshots/task management platform/3.png",
          alt: "Tasks progress",
        },
        {
          src: "./assets/screenshots/task management platform/4.png",
          alt: "Task board",
        },
        {
          src: "./assets/screenshots/task management platform/5.png",
          alt: "Task board 2",
        },
        {
          src: "./assets/screenshots/task management platform/6.png",
          alt: "Profile page",
        },
        {
          src: "./assets/screenshots/task management platform/7.png",
          alt: "Dark mode",
        },
      ],
    },
    {
      title: "Book Library App",
      repo: "nachar99/React-Library-App",
      summary:
        "A personal book library built with React and the Google Books API. This app allows users to search for books, save them to a local library, and manage reading status.",
      details:
        "This project is a personal book library built with React that integrates the Google Books API for real-time search and discovery. Users can save books, organize them by reading status, and manage their personal library.\n\nState is handled using the Context API and custom hooks, while localStorage is used to persist data after refresh. React Router enables smooth navigation between pages and supports direct access to individual books using dynamic routes.\n\nOverall, it demonstrates API integration, state management, and building a structured multi-page React application.",
      year: "2026",
      status: "API and Front-end work",
      role: "NA",
      tech: [
        "React (Vite)",
        "React Router",
        "Context API",
        "Custom Hooks",
        "Google Books API",
        "LocalStorage",
      ],
      images: [
        {
          src: "./assets/screenshots/personal-library-app/1.png",
          alt: "Home page",
        },
        {
          src: "./assets/screenshots/personal-library-app/2.png",
          alt: "Library page",
        },
        {
          src: "./assets/screenshots/personal-library-app/3.png",
          alt: "Search page",
        },
        {
          src: "./assets/screenshots/personal-library-app/4.png",
          alt: "Favorites page",
        },
        {
          src: "./assets/screenshots/personal-library-app/5.png",
          alt: "Dark mode",
        },
      ],
    },
    {
      title: "StockTraderPro",
      repo: "nachar99/Major-Project-2-StockTraderPro",
      summary:
        "A stock tracking web application that allows users to search for stocks, view real-time price data, track their portfolio value, and manage a watchlist.",
      details: `
This project is a stock tracking web app built with vanilla JavaScript that integrates the Twelve Data API to display real-time market data. Users can search for stocks, track their portfolio value based on shares owned, and manage a personal watchlist.

The app uses localStorage to persist portfolio and watchlist data, ensuring information is saved across sessions. It also focuses on DOM manipulation, asynchronous API handling, and building a responsive interface for both desktop and mobile.
`,
      year: "2026",
      status: "Frontend implementation + API",
      role: "JavaScript + API",
      tech: ["API", "HTML", "JavaScript", "CSS", "Local Storage"],
      images: [
        {
          src: "./assets/screenshots/stocktraderpro/1.png",
          alt: "Home Page + Search function",
        },
        {
          src: "./assets/screenshots/stocktraderpro/2.png",
          alt: "Portfolio management function",
        },
        {
          src: "./assets/screenshots/stocktraderpro/3.png",
          alt: "Watchlist + Portfolio summary",
        },
      ],
      liveUrl: "https://nachar99.github.io/Major-Project-2-StockTraderPro/",
    },
  ],
};
