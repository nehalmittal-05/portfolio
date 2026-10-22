# Nehal Mittal — Developer Portfolio (MERN Stack Assignment)

A modern, full-stack personal developer portfolio built for **Nehal Mittal**, a **B.Tech Computer Science and Engineering** student at **JK Lakshmipat University, Jaipur**, preparing for software engineering placements with interests in software development, machine learning, and AI.

Features a dark navy background (`#080d1a`), blue and violet gradient accents, subtle ambient glows, smooth Framer Motion animations, interactive bento-style cards, verified academic and machine learning projects, and a real Express backend with MongoDB (Mongoose ODM).

---

## 👤 Profile & Candidate Detail

- **Candidate Name**: Nehal Mittal
- **Degree**: B.Tech in Computer Science and Engineering
- **Institution**: JK Lakshmipat University, Jaipur, Rajasthan, India
- **Current Status**: Student (Preparing for Software Engineering Placements)
- **Email**: [nehalmittal5251218@gmail.com](mailto:nehalmittal5251218@gmail.com)
- **GitHub**: [https://github.com/nehalmittal-05](https://github.com/nehalmittal-05)
- **LinkedIn**: [https://www.linkedin.com/in/nehal511](https://www.linkedin.com/in/nehal511)
- **Hero Headline**: *"Building intelligent solutions through code."*
- **Role Rotations (Typewriter)**: Software Developer, Machine Learning Enthusiast, CSE Student, AI Enthusiast

---

## 🚀 Live Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React.js 19 + Vite 8** | High-performance Single Page Application |
| **Routing** | **React Router DOM v7** | Client-side routing and smooth section navigation |
| **Styling** | **Tailwind CSS v4** | Dark navy theme (`#080d1a`), glass panels, and gradient glows |
| **Animations** | **Framer Motion** | Micro-interactions, animated typewriter, layout springs, and modal transitions |
| **Icons** | **Lucide React + Custom SVGs** | Clean vector iconography (GitHub, LinkedIn, Terminal, Database, etc.) |
| **Backend** | **Node.js & Express.js** | RESTful API with MVC architecture, CORS, and request logging |
| **Database** | **MongoDB & Mongoose ODM** | Schemas for Projects, Skills, Timeline, Certifications, and Contact Messages |

---

## 🌟 Verified Projects & Sections

1. **Hero Section**:
   - Availability pill: *"B.Tech CSE Student • JK Lakshmipat University • Available for SDE Opportunities"*.
   - Headline: *"Building intelligent solutions through code."*
   - Animated typewriter subtitle cycling through: *Software Developer*, *Machine Learning Enthusiast*, *CSE Student*, *AI Enthusiast*.
   - Two CTA buttons: *"Explore Projects"* (smooth scroll) and *"Get in Touch"*.
   - Technical focus strip highlighting: *Machine Learning (Python)*, *Databases & SQL (MySQL)*, *AI & Deep Learning*, and *Software Dev (DSA & Web)*.

2. **About Me (Bento Grid)**:
   - Avatar card with active student status badge.
   - Concise, professional narrative about academic focus at JK Lakshmipat University.
   - Academic snapshot cards: Degree (`B.Tech CSE`), University (`JKLU Jaipur`), Key Domains (`SDE & ML`), Projects (`3 Major`).
   - Interactive `nehal.profile.json` code snippet window with one-click copy.
   - Core engineering principles: Data-Driven Engineering, Relational Integrity, Algorithmic Foundations, Continuous Learning.

3. **Skills & Capabilities**:
   - Genuinely explainable skills with realistic, unexaggerated proficiency levels (70%–88%):
     - **Programming Languages**: Python (85%), C / C++ (80%), JavaScript (78%), SQL (82%)
     - **Databases**: MySQL (84%), MongoDB (75%), Relational Schema Design (80%), SQL Query Optimization (76%)
     - **Backend**: Node.js (76%), Express.js (78%), RESTful API Architecture (80%), MVC Architecture (75%)
     - **Frontend**: HTML5 & CSS3 (85%), JavaScript ES6+ (80%), React.js Core (75%), Tailwind CSS (78%)
     - **Tools & Technologies**: Git & GitHub (85%), VS Code (88%), Jupyter Notebook (84%), Scikit-Learn & Pandas (80%), Postman (78%), Linux CLI Basics (74%)

4. **Verified Projects**:
   - **Asteroid Risk Assessment**: Machine learning classification project for predicting whether near-Earth asteroids are hazardous using astronomical parameters (diameter, velocity, miss distance). Built with Python, Scikit-Learn, Pandas, and NumPy.
   - **Power Management System**: Database engineering project for tracking and managing campus electricity consumption with relational schemas in MySQL, load tracking, and reporting queries.
   - **Lung Nodule Detection**: Deep learning research project in medical image analysis exploring convolutional neural network architectures for identifying pulmonary nodules from CT scans.

5. **Education & Experience Timeline**:
   - Vertical timeline with glowing line and circular milestone nodes.
   - B.Tech in CSE at JK Lakshmipat University, Jaipur.
   - Coursework: Data Structures & Algorithms, OOP, Database Management Systems, Operating Systems, Computer Networks, Machine Learning Foundations.
   - Clean placeholders for technical internships, research roles, and school details.

6. **Certifications & Achievements**:
   - Bento cards with verified credential badges and clear placeholders for certifications, course specializations, and hackathons.

7. **Resume & Curriculum Vitae**:
   - Summary card formatted for campus recruitment.
   - **Download PDF Resume** button: serves real PDF from Express route `GET /api/resume/pdf` (`server/resumes/Resume_Nehal-Mittal.pdf`).
   - **Download DOCX Resume** button: serves real Word document from Express route `GET /api/resume/docx` (`server/resumes/Resume_Nehal-Mittal.docx`).
   - Private server-side storage in `/server/resumes/` (never exposed directly as static frontend public assets).
   - Safe path resolution relative to `import.meta.url` (`__dirname`), ensuring downloads work regardless of terminal working directory.
   - Graceful 404 error handling with candidate guidance if files are missing.

8. **Contact Form & Direct Channels**:
   - Direct connection to Express backend `POST /api/contact`.
   - Client and server validation with error feedback and loading spinner.
   - Direct contact info: [nehalmittal5251218@gmail.com](mailto:nehalmittal5251218@gmail.com), Jaipur, Rajasthan, GitHub, and LinkedIn.

9. **Footer & Status**:
   - Live backend API status monitor (`🟢 API Online (Live / Hybrid)`).
   - Quick navigation links, social profiles, and dynamic copyright.

---

## 📁 Central Editable Data File

All personal information, skills, education, projects, and credentials are maintained in a single central file:
- **Central Portfolio Data**: [`client/src/data/portfolio.js`](file:///c:/Users/Lenovo/Downloads/Assignment/client/src/data/portfolio.js)
- **Backend Seed Dataset**: [`server/seed/seedData.js`](file:///c:/Users/Lenovo/Downloads/Assignment/server/seed/seedData.js)

---

## ⚡ Quick Start

```bash
# Install dependencies
npm run install:all

# Run both Client and Server concurrently
npm run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000/api/health`
- **Seeding Database**: `npm run seed`

---

## 📄 Resume Serving & Backend Endpoints

Resume files are kept privately in the server directory and are served through Node.js/Express with `res.download()`:

| Endpoint | Method | Source File | Content-Type | Download Filename |
| :--- | :--- | :--- | :--- | :--- |
| `/api/resume/pdf` | `GET` | `server/resumes/Resume_Nehal-Mittal.pdf` | `application/pdf` | `Resume_Nehal-Mittal.pdf` |
| `/api/resume/docx` | `GET` | `server/resumes/Resume_Nehal-Mittal.docx` | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` | `Resume_Nehal-Mittal.docx` |
| `/api/resume/info` | `GET` | Resume metadata and file status | `application/json` | N/A |
