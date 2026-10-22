/**
 * ==============================================================================
 * CENTRAL PORTFOLIO DATA CONFIGURATION
 * ==============================================================================
 * Candidate: Nehal Mittal
 * Degree:    B.Tech in Computer Science and Engineering
 * Institute: JK Lakshmipat University, Jaipur
 * Focus:     Software Development, Machine Learning, and AI
 * 
 * 💡 HOW TO USE THIS FILE:
 * This is the SINGLE SOURCE OF TRUTH for all your personal portfolio content.
 * To update your details, simply edit the values below — no need to touch JSX
 * or component code!
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// 1. PERSONAL INFORMATION, CONTACT & SOCIAL MEDIA
// ------------------------------------------------------------------------------
export const personalInfo = {
  // Your Full Name as displayed across navbar, hero, about, resume, and footer
  name: 'Nehal Mittal',

  // Current Academic Degree and Institution
  degree: 'B.Tech in Computer Science and Engineering',
  institution: 'JK Lakshmipat University',
  location: 'Jaipur, Rajasthan, India',

  // Academic / Employment Status
  status: 'Student',
  statusBadge: 'B.Tech CSE Student • JK Lakshmipat University • Available for SDE Opportunities',

  // Profile Image URL (stored in client/public/images/profile.jpeg)
  profileImage: '/images/profile.jpeg',

  // Contact Information
  email: 'nehalmittal5251218@gmail.com',
  phone: '+91 9829939993', // Update with your contact phone if desired

  // Professional Profiles (Leave as '' if you don't want a button shown)
  github: 'https://github.com/nehalmittal-05',
  linkedin: 'https://www.linkedin.com/in/nehal511',

  // Hero Section Headline & Typing Roles
  role: 'Software Developer & ML Enthusiast',
  heroHeadline: 'Building intelligent solutions through code.',
  typewriterRoles: [
    'Software Developer',
    'Machine Learning Enthusiast',
    'CSE Student',
    'AI Enthusiast',
  ],

  // Brief tagline shown right below the typewriter in Hero
  tagline:
    'B.Tech Computer Science and Engineering student at JK Lakshmipat University preparing for software engineering placements with a core interest in software development, machine learning, and AI.',

  // About Me Section narrative paragraphs
  bio:
    'I am a Computer Science and Engineering undergraduate at JK Lakshmipat University, Jaipur. Passionate about software development, machine learning, and artificial intelligence, I focus on building robust applications, analyzing data-driven systems, and designing thoughtful software solutions. Currently preparing for software engineering placements and eager to contribute to innovative engineering teams.',

  bioSecondParagraph:
    'My academic and project experience spans supervised machine learning classification, relational database design with MySQL, and exploratory deep learning for medical image analysis. I enjoy solving algorithmic problems, writing clean code, and preparing to make an immediate impact on real-world engineering teams.',

  // Academic snapshot metrics for About Me bento cards
  stats: [
    { label: 'Degree', value: 'B.Tech CSE' },
    { label: 'University', value: 'JKLU Jaipur' },
    { label: 'Focus Domains', value: 'SDE & ML' },
    { label: 'Verified Projects', value: '3 Major' },
  ],

  // Core technical focus areas displayed in the Hero cards
  focusAreas: [
    {
      title: 'Machine Learning',
      subtitle: 'Python & Scikit-Learn',
      iconName: 'Terminal',
    },
    {
      title: 'Databases & SQL',
      subtitle: 'MySQL & Schemas',
      iconName: 'Database',
    },
    {
      title: 'AI & Deep Learning',
      subtitle: 'Computer Vision & CNNs',
      iconName: 'Cpu',
    },
    {
      title: 'Software Dev',
      subtitle: 'DSA & Web Systems',
      iconName: 'Layers',
    },
  ],

  // Core engineering principles displayed in About Me
  corePrinciples: [
    {
      title: 'Data-Driven Engineering',
      description: 'Applying machine learning principles to extract insights from structured datasets.',
    },
    {
      title: 'Relational Integrity',
      description: 'Designing normalized schemas and reliable queries with MySQL.',
    },
    {
      title: 'Algorithmic Foundations',
      description: 'Strong grasp of core data structures, algorithms, and complexity analysis.',
    },
    {
      title: 'Continuous Learning',
      description: 'Actively expanding knowledge across modern AI research and software stacks.',
    },
  ],

  // Target placement roles displayed in the Resume section
  targetRoles: [
    'Software Development Engineer (SDE I / Graduate)',
    'Machine Learning / AI Trainee',
    'Full-Stack / Backend Developer Intern',
  ],

  // Core technical competencies list
  competenciesSummary:
    'Python, C/C++, MySQL, Relational Database Design, Machine Learning (Scikit-Learn), Deep Learning Concepts, Data Structures & Algorithms, Git, REST APIs.',
};

// Aliases for compatibility
export const profile = personalInfo;
export const initialProfile = personalInfo;


// ------------------------------------------------------------------------------
// 2. LIVE COLLECTIONS (Fetched from MongoDB via backend API)
// ------------------------------------------------------------------------------
// Live data is retrieved from MongoDB via GET /api/portfolio-data.
// Redundant fallback sample data has been removed so the UI accurately
// reflects the database state.
export const skillsData = {};
export const skills = skillsData;
export const initialSkills = skillsData;

export const projectsData = [];
export const projects = projectsData;
export const initialProjects = projectsData;

export const timelineData = [];
export const timeline = timelineData;
export const initialTimeline = timelineData;

export const certificatesData = [];
export const certificates = certificatesData;
export const initialCertificates = certificatesData;

// ------------------------------------------------------------------------------
// DEFAULT EXPORT (Complete Portfolio Object)
// ------------------------------------------------------------------------------
export default {
  personalInfo,
  profile: personalInfo,
  skills: skillsData,
  projects: projectsData,
  timeline: timelineData,
  certificates: certificatesData,
};
