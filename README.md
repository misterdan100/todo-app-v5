# 📝 Todo App - Task Management Web Application

[![Next.js](https://img.shields.io/badge/Next.js-^14.0-black.svg?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-^18.0-blue.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-^5.0-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-^3.0-38B2AC.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Shadcn/UI](https://img.shields.io/badge/Shadcn/UI-latest-black.svg)](https://ui.shadcn.com/)
[![SWR](https://img.shields.io/badge/SWR-latest-black.svg?logo=zeit)](https://swr.vercel.app/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-^7.0-ec5990.svg?logo=reacthookform)](https://react-hook-form.com/)
[![Zod](https://img.shields.io/badge/Zod-latest-blue.svg)](https://zod.dev/)
[![Styled Components](https://img.shields.io/badge/Styled_Components-^6.0-db7093.svg?logo=styledcomponents)](https://styled-components.com/)
[![Axios](https://img.shields.io/badge/Axios-^1.0-5A29E4.svg?logo=axios)](https://axios-http.com/)

[![Node.js](https://img.shields.io/badge/Node.js-^20.0-339933.svg?logo=nodedotjs)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-^4.0-000000.svg?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-^15.0-336791.svg?logo=postgresql)](https://www.postgresql.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-^6.0-52B0E7.svg?logo=sequelize)](https://sequelize.org/)
[![JWT](https://img.shields.io/badge/JWT-latest-000000.svg?logo=jsonwebtokens)](https://jwt.io/)

Full-stack web application designed for efficient management of personal and project tasks. It allows users to create, edit, organize, and filter tasks, featuring secure authentication and a modern, responsive interface with dark mode.

## 🚀 Online Demo

[Live App todo-app-v5-five.vercel.app](https://todo-app-v5-five.vercel.app/) 
## ✨ Key Features

- 📝 **Complete Task Management:** Create, read, update, and delete tasks.
- 🔐 **Authentication & Authorization:** Secure user registration and login using JWT and cookies.
- 👤 **User Profile:** Dedicated page for managing user information.
- 🚦 **Task Filters:** Separate views for Pending, Completed, and Overdue tasks.
- 📂 **Organization:** Group tasks by Projects and Tags.
- 🎨 **Modern Design:** Clean interface with dark mode and responsive design.
- ⚙️ **Quick Actions:** Button to load demo tasks.
- 📱 **Responsive Design:** Optimized for correct display on various screen sizes.

## 🛠️ Technologies Used


### Backend (Deployed on Neon and Vercel)

- **Environment:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL (deployed on Neon)
- **ORM:** Sequelize
- **Authentication:** JSON Web Tokens (JWT)
- **Middleware:** CORS, Manual Cookie Handling
- **Architecture:** Model-View-Controller (MVC)

### Frontend (Deployed on Vercel)

- **Framework:** Next.js 14 (with Server Components)
- **UI Library:** React 18
- **Language:** TypeScript
- **Schema Validation:** Zod
- **HTTP Requests:** SWR, Axios
- **Authorization:** Next.js Middleware and Cookies
- **Styling:** Tailwind CSS, Styled Components
- **UI Components:** Shadcn/UI
- **Form Management:** React Hook Form


## 🚀 Local Quick Start

Follow these steps to set up and run the project in your local environment:

```bash
# 1. Clone the repository
git clone git@github.com:misterdan100/todo-app-v5.git 
cd todo-app-v5

# 2. Set up the Backend
cd backend
npm install

# 3. Create a .env file based on .env.example and configure the variables
JWT_SECRET, DATABASE_URL, etc.

# 4. Run the backend server
npm run dev

# 5. Set up the Frontend (in another terminal)
cd ../frontend
npm install

# 6. Create a .env.local file based on .env.local.example
change NEXT_PUBLIC_API_URL variable

# 7. Run the Next.js development server
npm run dev # Starts the Next.js development server

# 8. Access the application
Open http://localhost:3000 (or the configured port) in your browser.

```
Note: Ensure you have Node.js (v20 or higher recommended) and PostgreSQL installed and configured on your system.

You will need to create the database in PostgreSQL and configure the environment variables in the corresponding .env (backend) and .env.local (frontend) files.