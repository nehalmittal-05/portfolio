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
// 2. TECHNICAL SKILLS & PROFICIENCY LEVELS
// ------------------------------------------------------------------------------
// Realistic, explainable proficiencies (70%-88%) suitable for placement interviews
export const skillsData = {
  'Programming Languages': [
    { name: 'Python', proficiency: 85, levelLabel: 'Proficient', iconName: 'Terminal' },
    { name: 'C / C++', proficiency: 80, levelLabel: 'Proficient', iconName: 'Binary' },
    { name: 'JavaScript', proficiency: 78, levelLabel: 'Intermediate', iconName: 'FileCode' },
    { name: 'SQL', proficiency: 82, levelLabel: 'Proficient', iconName: 'Database' },
  ],
  Databases: [
    { name: 'MySQL', proficiency: 84, levelLabel: 'Proficient', iconName: 'Database' },
    { name: 'MongoDB', proficiency: 75, levelLabel: 'Intermediate', iconName: 'Layers' },
    { name: 'Relational Schema Design', proficiency: 80, levelLabel: 'Proficient', iconName: 'Layers' },
    { name: 'SQL Query Optimization', proficiency: 76, levelLabel: 'Intermediate', iconName: 'Cpu' },
  ],
  Backend: [
    { name: 'Node.js', proficiency: 76, levelLabel: 'Intermediate', iconName: 'Server' },
    { name: 'Express.js', proficiency: 78, levelLabel: 'Intermediate', iconName: 'Cpu' },
    { name: 'RESTful API Architecture', proficiency: 80, levelLabel: 'Proficient', iconName: 'Network' },
    { name: 'MVC Architecture', proficiency: 75, levelLabel: 'Intermediate', iconName: 'Layers' },
  ],
  Frontend: [
    { name: 'HTML5 & CSS3', proficiency: 85, levelLabel: 'Proficient', iconName: 'Layout' },
    { name: 'JavaScript (ES6+)', proficiency: 80, levelLabel: 'Proficient', iconName: 'FileCode' },
    { name: 'React.js (Core Concepts)', proficiency: 75, levelLabel: 'Intermediate', iconName: 'Atom' },
    { name: 'Tailwind CSS', proficiency: 78, levelLabel: 'Intermediate', iconName: 'Palette' },
  ],
  'Tools & Technologies': [
    { name: 'Git & GitHub', proficiency: 85, levelLabel: 'Proficient', iconName: 'GitBranch' },
    { name: 'VS Code', proficiency: 88, levelLabel: 'Proficient', iconName: 'Laptop' },
    { name: 'Jupyter Notebook', proficiency: 84, levelLabel: 'Proficient', iconName: 'TerminalSquare' },
    { name: 'Scikit-Learn & Pandas (ML)', proficiency: 80, levelLabel: 'Proficient', iconName: 'Cpu' },
    { name: 'Postman', proficiency: 78, levelLabel: 'Intermediate', iconName: 'Send' },
    { name: 'Linux / CLI Basics', proficiency: 74, levelLabel: 'Familiar', iconName: 'Terminal' },
  ],
};

// Aliases for compatibility
export const skills = skillsData;
export const initialSkills = skillsData;


// ------------------------------------------------------------------------------
// 3. VERIFIED PROJECTS
// ------------------------------------------------------------------------------
// NOTE: If githubUrl or liveUrl is set to '' or '#', the link button will NOT
// be displayed, preventing dead or misleading buttons.
export const projectsData = [
  {
    _id: 'proj_asteroid_risk',
    title: 'Asteroid Risk Assessment',
    slug: 'asteroid-risk-assessment',
    tagline: 'Machine learning classification project for predicting hazardous near-Earth asteroids',
    description:
      'A machine learning classification project developed to evaluate astronomical data and predict whether near-Earth asteroids pose potential hazards. Features complete data preprocessing, exploratory analysis, feature engineering, and supervised classification models based on orbital trajectories and physical parameters.',
    category: 'Machine Learning',
    tags: ['Python', 'Machine Learning', 'Scikit-Learn', 'Pandas', 'NumPy', 'Data Analysis'],
    githubUrl: 'https://github.com/nehalmittal-05/asteroid-risk-assessment',
    liveUrl: 'https://github.com/nehalmittal-05', // Set to '' if no live deployment
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    featured: true,
    highlights: [
      'Preprocessed astronomical dataset features including estimated diameter, relative velocity, and miss distance',
      'Trained classification models to identify potentially hazardous near-Earth objects from orbital attributes',
      'Evaluated model accuracy and error profiles using confusion matrices, precision, and recall metrics',
    ],
    order: 1,
  },
  {
    _id: 'proj_power_mgmt',
    title: 'Power Management System',
    slug: 'power-management-system',
    tagline: 'Database project for tracking campus electricity consumption using MySQL',
    description:
      'A database-centric system designed to record, structure, and query campus electricity consumption across various departments and facilities. Structured around relational database design principles and MySQL to enable energy tracking, peak-load analysis, and administrative reporting.',
    category: 'Database & Systems',
    tags: ['MySQL', 'Database Design', 'SQL Queries', 'Relational Schemas', 'Data Normalization'],
    githubUrl: 'https://github.com/nehalmittal-05/power-management-system',
    liveUrl: 'https://github.com/nehalmittal-05',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    featured: true,
    highlights: [
      'Designed normalized relational schemas in MySQL to log department-wise power consumption and meter values',
      'Wrote structured SQL queries, views, and aggregate procedures for usage monitoring and load identification',
      'Enforced data integrity constraints and keys to eliminate record duplication in utility management',
    ],
    order: 2,
  },
  {
    _id: 'proj_lung_nodule',
    title: 'Lung Nodule Detection',
    slug: 'lung-nodule-detection',
    tagline: 'Deep learning research project involving medical image analysis for nodule identification',
    description:
      'A deep learning research initiative focused on medical image analysis to investigate automated detection and localization of pulmonary nodules from computed tomography (CT) scans using convolutional neural network architectures and computer vision methods.',
    category: 'Deep Learning & AI',
    tags: ['Deep Learning', 'Computer Vision', 'Medical Imaging', 'Python', 'CNN Architectures', 'AI Research'],
    githubUrl: 'https://github.com/nehalmittal-05/lung-nodule-detection',
    liveUrl: 'https://github.com/nehalmittal-05',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    featured: true,
    highlights: [
      'Explored deep learning and convolutional neural network approaches for spatial medical image interpretation',
      'Handled volumetric CT scan image slices with normalization and intensity preprocessing steps',
      'Investigated feature extraction and pattern recognition techniques for computer-aided diagnostic research',
    ],
    order: 3,
  },
];

// Aliases for compatibility
export const projects = projectsData;
export const initialProjects = projectsData;


// ------------------------------------------------------------------------------
// 4. EDUCATION & EXPERIENCE TIMELINE
// ------------------------------------------------------------------------------
// Types: 'education' | 'experience'
export const timelineData = [
  {
    _id: 'time_1',
    type: 'education',
    roleOrDegree: 'B.Tech in Computer Science and Engineering',
    organization: 'JK Lakshmipat University',
    location: 'Jaipur, Rajasthan, India',
    period: '2022 - 2026',
    description:
      'Pursuing Bachelor of Technology in Computer Science and Engineering with an academic focus on core software engineering disciplines, algorithm design, database management systems, and introductory machine learning.',
    points: [
      'Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Machine Learning Foundations',
      'Actively developing practical projects applying machine learning algorithms and relational database architecture',
      'Preparing for software engineering graduate and internship placement drives',
    ],
    skills: ['DSA', 'Python', 'C / C++', 'MySQL', 'DBMS', 'Machine Learning'],
    order: 1,
  },
  {
    _id: 'time_2',
    type: 'education',
    roleOrDegree: 'Higher Secondary Education (Class XII) - Science Stream',
    organization: '[Higher Secondary School / College Name Placeholder]',
    location: 'Jaipur, Rajasthan, India',
    period: '[Year Placeholder]',
    description:
      'Completed higher secondary academic curriculum with concentration in Physics, Chemistry, and Mathematics.',
    points: [
      'Built strong analytical foundations in algebra, calculus, and scientific problem-solving',
      'Engaged in computer science basics and foundational programming concepts',
    ],
    skills: ['Mathematics', 'Physics', 'Analytical Problem Solving'],
    order: 2,
  },
  {
    _id: 'time_3',
    type: 'experience',
    roleOrDegree: '[Software Engineering / Project Intern - Title Placeholder]',
    organization: '[Company / Research Lab / Institution Placeholder]',
    location: '[Jaipur, Rajasthan / Remote Placeholder]',
    period: '[Duration / Dates Placeholder]',
    description:
      '[Placeholder for technical internship or academic research engagement. Ready to update as soon as confirmed.]',
    points: [
      '[Collaborated on software development or machine learning tasks within project scope]',
      '[Applied version control best practices and participated in iterative reviews]',
    ],
    skills: ['Python', 'Git', 'Software Development', 'Problem Solving'],
    order: 3,
  },
  {
    _id: 'time_4',
    type: 'experience',
    roleOrDegree: '[Campus Technical Club Member / Student Contributor]',
    organization: 'JK Lakshmipat University',
    location: 'Jaipur, Rajasthan, India',
    period: '[Year - Present Placeholder]',
    description:
      'Participated in campus technology activities, collaborative coding sessions, and peer technical discussions.',
    points: [
      'Engaged in university technical workshops, project showcases, and peer learning sessions',
      'Explored practical implementations of AI and software tools through community projects',
    ],
    skills: ['Collaboration', 'Peer Learning', 'Technical Communication'],
    order: 4,
  },
];

// Aliases for compatibility
export const timeline = timelineData;
export const initialTimeline = timelineData;


// ------------------------------------------------------------------------------
// 5. CERTIFICATIONS & ACHIEVEMENTS
// ------------------------------------------------------------------------------
// Types: 'certification' | 'achievement'
export const certificatesData = [
  {
    _id: 'cert_1',
    type: 'certification',
    title: '[Machine Learning / Data Science Specialization - Title Placeholder]',
    issuer: '[Coursera / NPTEL / Platform Placeholder]',
    date: '[Month, Year Placeholder]',
    credentialId: '[Credential ID Placeholder]',
    credentialUrl: '', // Leave empty if not yet published
    description:
      '[Placeholder for machine learning, data science, or Python specialization certification. Replace with verified credential details.]',
    badgeLabel: 'Verified Credential',
    order: 1,
  },
  {
    _id: 'cert_2',
    type: 'certification',
    title: '[Database Systems / Software Development Certification - Title Placeholder]',
    issuer: '[Issuing Platform / Institution Placeholder]',
    date: '[Month, Year Placeholder]',
    credentialId: '[Credential ID Placeholder]',
    credentialUrl: '',
    description:
      '[Placeholder for database management, SQL, or software engineering certification course.]',
    badgeLabel: 'Technical Certificate',
    order: 2,
  },
  {
    _id: 'cert_3',
    type: 'achievement',
    title: '[Academic Milestone / Hackathon Participation - Title Placeholder]',
    issuer: 'JK Lakshmipat University / Technical Event',
    date: '[Year Placeholder]',
    credentialId: '[Milestone ID / Placeholder]',
    credentialUrl: '',
    description:
      '[Placeholder for collegiate coding competition, hackathon submission, or academic excellence recognition.]',
    badgeLabel: 'Academic Milestone',
    order: 3,
  },
];

// Aliases for compatibility
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
