/**
 * Central Portfolio Data Configuration for Nehal Mittal
 * B.Tech in Computer Science and Engineering at JK Lakshmipat University, Jaipur.
 * Editable data structure for projects, skills, education, experience, and certifications.
 */

export const profileInfo = {
  name: 'Nehal Mittal',
  degree: 'B.Tech in Computer Science and Engineering',
  institution: 'JK Lakshmipat University',
  status: 'Student',
  location: 'Jaipur, Rajasthan, India',
  profileImage: '/images/profile.jpeg',
  email: 'nehalmittal5251218@gmail.com',
  github: 'https://github.com/nehalmittal-05',
  linkedin: 'https://www.linkedin.com/in/nehal511',
  role: 'Software Developer & ML Enthusiast',
  heroHeadline: 'Building intelligent solutions through code.',
  typewriterRoles: [
    'Software Developer',
    'Machine Learning Enthusiast',
    'CSE Student',
    'AI Enthusiast',
  ],
  tagline:
    'B.Tech Computer Science and Engineering student at JK Lakshmipat University preparing for software engineering placements with an active interest in software development, machine learning, and AI.',
  bio:
    'I am a Computer Science and Engineering undergraduate at JK Lakshmipat University, Jaipur, preparing for software engineering placements. With a solid foundation in core computer science, software development, and machine learning, I enjoy transforming analytical concepts into functional, reliable code. Whether designing database schemas or developing machine learning models, I am committed to writing clean, maintainable, and purposeful software.',
  stats: [
    { label: 'Degree', value: 'B.Tech CSE' },
    { label: 'University', value: 'JKLU Jaipur' },
    { label: 'Key Domains', value: 'SDE & ML' },
    { label: 'Core Projects', value: '3 Major' },
  ],
};

export const seedProjects = [
  {
    title: 'Asteroid Risk Assessment',
    slug: 'asteroid-risk-assessment',
    tagline: 'Machine learning classification project for predicting hazardous near-Earth asteroids',
    description:
      'A machine learning classification project developed to evaluate astronomical observations and predict whether near-Earth asteroids present potential hazards. Implements end-to-end data preprocessing, exploratory data analysis, feature selection, and supervised classification models to categorize objects based on orbital trajectories and physical characteristics.',
    category: 'Machine Learning',
    tags: ['Python', 'Machine Learning', 'Scikit-Learn', 'Pandas', 'NumPy', 'Data Analysis'],
    githubUrl: 'https://github.com/nehalmittal-05/asteroid-risk-assessment',
    liveUrl: 'https://github.com/nehalmittal-05', // Verified GitHub profile link fallback
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    featured: true,
    highlights: [
      'Preprocessed astronomical dataset features including estimated diameter, relative velocity, and miss distance',
      'Implemented classification algorithms to distinguish hazardous from non-hazardous near-Earth objects',
      'Evaluated model performance using confusion matrices, precision, recall, and classification metrics',
    ],
    order: 1,
  },
  {
    title: 'Power Management System',
    slug: 'power-management-system',
    tagline: 'Database-driven system for tracking and managing campus electricity consumption with MySQL',
    description:
      'A database engineering project designed to record, structure, and query campus-wide electrical consumption. Built with relational database schemas in MySQL, it provides facilities and administrative teams with systematic views of energy metrics, utility distribution, and load tracking across campus units.',
    category: 'Database & Systems',
    tags: ['MySQL', 'Relational Databases', 'SQL Queries', 'Database Design', 'Data Normalization'],
    githubUrl: 'https://github.com/nehalmittal-05/power-management-system',
    liveUrl: 'https://github.com/nehalmittal-05',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    featured: true,
    highlights: [
      'Architected normalized relational tables in MySQL to track department-wise power logs and meter readings',
      'Wrote structured SQL queries, views, and aggregate routines to analyze peak consumption hours',
      'Enforced foreign key constraints and validation rules to ensure data consistency and eliminate redundancy',
    ],
    order: 2,
  },
  {
    title: 'Lung Nodule Detection',
    slug: 'lung-nodule-detection',
    tagline: 'Deep learning research project involving medical image analysis for nodule identification',
    description:
      'A deep learning research project investigating computer vision techniques applied to medical image analysis. Focuses on processing computed tomography (CT) scans to explore automated detection and localization of pulmonary nodules for diagnostic research support.',
    category: 'Deep Learning & AI',
    tags: ['Deep Learning', 'Computer Vision', 'Medical Imaging', 'Python', 'Convolutional Neural Networks', 'AI Research'],
    githubUrl: 'https://github.com/nehalmittal-05/lung-nodule-detection',
    liveUrl: 'https://github.com/nehalmittal-05',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    featured: true,
    highlights: [
      'Researched deep learning methods and convolutional neural network architectures for medical image understanding',
      'Handled volumetric CT scan image slices with normalization and intensity preprocessing steps',
      'Analyzed feature extraction and pattern recognition methodologies for computer-assisted detection',
    ],
    order: 3,
  },
];

export const seedSkills = [
  // Programming Languages
  { name: 'Python', category: 'Programming Languages', proficiency: 85, levelLabel: 'Proficient', iconName: 'Terminal', order: 1 },
  { name: 'C / C++', category: 'Programming Languages', proficiency: 80, levelLabel: 'Proficient', iconName: 'Binary', order: 2 },
  { name: 'JavaScript', category: 'Programming Languages', proficiency: 78, levelLabel: 'Intermediate', iconName: 'FileCode', order: 3 },
  { name: 'SQL', category: 'Programming Languages', proficiency: 82, levelLabel: 'Proficient', iconName: 'Database', order: 4 },

  // Databases
  { name: 'MySQL', category: 'Databases', proficiency: 84, levelLabel: 'Proficient', iconName: 'Database', order: 1 },
  { name: 'MongoDB', category: 'Databases', proficiency: 75, levelLabel: 'Intermediate', iconName: 'Layers', order: 2 },
  { name: 'Relational Schema Design', category: 'Databases', proficiency: 80, levelLabel: 'Proficient', iconName: 'Layers', order: 3 },
  { name: 'Database Query Optimization', category: 'Databases', proficiency: 76, levelLabel: 'Intermediate', iconName: 'Cpu', order: 4 },

  // Backend
  { name: 'Node.js', category: 'Backend', proficiency: 76, levelLabel: 'Intermediate', iconName: 'Server', order: 1 },
  { name: 'Express.js', category: 'Backend', proficiency: 78, levelLabel: 'Intermediate', iconName: 'Cpu', order: 2 },
  { name: 'RESTful API Concepts', category: 'Backend', proficiency: 80, levelLabel: 'Proficient', iconName: 'Network', order: 3 },

  // Frontend
  { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 85, levelLabel: 'Proficient', iconName: 'Layout', order: 1 },
  { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 80, levelLabel: 'Proficient', iconName: 'FileCode', order: 2 },
  { name: 'React.js (Core Concepts)', category: 'Frontend', proficiency: 75, levelLabel: 'Intermediate', iconName: 'Atom', order: 3 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 78, levelLabel: 'Intermediate', iconName: 'Palette', order: 4 },

  // Tools & Technologies
  { name: 'Git & GitHub', category: 'Tools & Technologies', proficiency: 85, levelLabel: 'Proficient', iconName: 'GitBranch', order: 1 },
  { name: 'VS Code', category: 'Tools & Technologies', proficiency: 88, levelLabel: 'Proficient', iconName: 'Laptop', order: 2 },
  { name: 'Jupyter Notebook', category: 'Tools & Technologies', proficiency: 84, levelLabel: 'Proficient', iconName: 'TerminalSquare', order: 3 },
  { name: 'Scikit-Learn & Pandas (ML)', category: 'Tools & Technologies', proficiency: 80, levelLabel: 'Proficient', iconName: 'Cpu', order: 4 },
  { name: 'Linux / Command Line Basics', category: 'Tools & Technologies', proficiency: 74, levelLabel: 'Familiar', iconName: 'Terminal', order: 5 },
];

export const seedTimeline = [
  {
    type: 'education',
    roleOrDegree: 'B.Tech in Computer Science and Engineering',
    organization: 'JK Lakshmipat University',
    location: 'Jaipur, Rajasthan, India',
    period: '[2024 - 2028]',
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
    type: 'education',
    roleOrDegree: 'Higher Secondary Education (Class XII) - Science Stream',
    organization: '[Advanced Academy / Senior Secondary School]',
    location: 'Indore, Madhya Pradesh, India',
    period: '[2021-2023]',
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
    type: 'experience',
    roleOrDegree: '[Summer Research Intern/ Deep Learning Based Medical Image Analysis]',
    organization: '[LNMIIT / Research Intern]',
    location: '[Jaipur, Rajasthan / Remote Work]',
    period: '[June 2026 - August 2026]',
    description:
      'Research internship at The LNM Institute of Information Technology focused on deep learning applications for medical image analysis.',
    points: [
      'Collaborated on Deep Learning tasks within project scope of Lung nodule Detection',
      'Applied openCV, image enhancement via GRAD-CAM++, Model optimization using TensorFlow, PyTorch and Keras with architectures like CNN- U-Net, ConvNext Tiny/Bse, EfficientNet B4',
    ],
    skills: ['Python', 'Git', 'Software Development', 'Problem Solving'],
    order: 3,
  },
  {
    type: 'experience',
    roleOrDegree: 'Sabrang fest Cultural Events Coordinator',
    organization: 'JK Lakshmipat University',
    location: 'Jaipur, Rajasthan, India',
    period: '[August 2025 - October 2025]',
    description:
      'Sabrang fest Cultural Events Coordinator for a major university festival.',
    points: [
      'Led coordination for cultural events within the Sabrang fest, collaborating with student teams and faculty convenors to ensure smooth execution of performances and activities.',
      'Managed logistics, scheduling, and on-ground support for multiple events, contributing to the successful delivery of the university’s flagship cultural festival.',
    ],
    skills: ['Collaboration', 'Coordination', 'Event Management'],
    order: 4,
  },
];

export const seedCertificates = [
  {
    type: 'certification',
    title: '[Machine Learning / Data Science Specialization - Title Placeholder]',
    issuer: '[Coursera / NPTEL / Platform Placeholder]',
    date: '[Month, Year Placeholder]',
    credentialId: '[Credential ID Placeholder]',
    credentialUrl: 'https://github.com/nehalmittal-05',
    description:
      '[Placeholder for machine learning, data science, or Python specialization certification. Replace with verified credential details.]',
    badgeLabel: 'Verified Credential',
    order: 1,
  },
  {
    type: 'certification',
    title: '[Database Systems / Software Development Certification - Title Placeholder]',
    issuer: '[Issuing Platform / Institution Placeholder]',
    date: '[Month, Year Placeholder]',
    credentialId: '[Credential ID Placeholder]',
    credentialUrl: 'https://github.com/nehalmittal-05',
    description:
      '[Placeholder for database management, SQL, or software engineering certification course.]',
    badgeLabel: 'Technical Certificate',
    order: 2,
  },
  {
    type: 'achievement',
    title: '[Academic Milestone / Hackathon Participation - Title Placeholder]',
    issuer: 'JK Lakshmipat University / Technical Event',
    date: '[Year Placeholder]',
    credentialId: '[Milestone ID / Placeholder]',
    credentialUrl: 'https://github.com/nehalmittal-05',
    description:
      '[Placeholder for collegiate coding competition, hackathon submission, or academic excellence recognition.]',
    badgeLabel: 'Academic Milestone',
    order: 3,
  },
];
