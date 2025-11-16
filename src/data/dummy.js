// Dummy data for the application
export const users = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@iitd.ac.in',
    institute: 'IIT Delhi',
    year: '3rd Year',
    branch: 'Computer Science',
    skills: ['React', 'Node.js', 'Machine Learning', 'Python'],
    interests: ['Web Development', 'AI/ML', 'Blockchain'],
    bio: 'Passionate about building scalable web applications and exploring AI.',
    looking: 'Co-founder for EdTech startup',
    projects: ['project1', 'project2'],
    endorsements: { 'React': 15, 'Node.js': 12, 'Machine Learning': 8 },
    avatar: '👨‍💻',
    verified: true
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.patel@nitk.ac.in',
    institute: 'NIT Karnataka',
    year: '2nd Year',
    branch: 'Electronics',
    skills: ['IoT', 'Arduino', 'Python', 'C++'],
    interests: ['Hardware', 'Embedded Systems', 'Robotics'],
    bio: 'Hardware enthusiast looking to build innovative IoT solutions.',
    looking: 'Team for Smart India Hackathon',
    projects: ['project3'],
    endorsements: { 'IoT': 20, 'Arduino': 18 },
    avatar: '👩‍🔬',
    verified: true
  },
  {
    id: '3',
    name: 'Arjun Singh',
    email: 'arjun.singh@iitb.ac.in',
    institute: 'IIT Bombay',
    year: '4th Year',
    branch: 'Mechanical',
    skills: ['CAD', 'MATLAB', 'Python', 'Data Analysis'],
    interests: ['Design', 'Simulation', 'Data Science'],
    bio: 'Mechanical engineer with a passion for data-driven design.',
    looking: 'Research collaboration in structural optimization',
    projects: ['project4'],
    endorsements: { 'CAD': 25, 'MATLAB': 22, 'Python': 10 },
    avatar: '👨‍🔧',
    verified: true
  },
  {
    id: '4',
    name: 'Sneha Gupta',
    email: 'sneha.gupta@nitt.ac.in',
    institute: 'NIT Trichy',
    year: '3rd Year',
    branch: 'Computer Science',
    skills: ['Flutter', 'Firebase', 'UI/UX', 'Dart'],
    interests: ['Mobile Development', 'Design', 'Startups'],
    bio: 'Mobile app developer and designer. Love creating beautiful user experiences.',
    looking: 'Designer for FinTech app',
    projects: ['project5'],
    endorsements: { 'Flutter': 18, 'UI/UX': 30 },
    avatar: '👩‍🎨',
    verified: true
  },
  {
    id: '5',
    name: 'Vikram Reddy',
    email: 'vikram.reddy@iitm.ac.in',
    institute: 'IIT Madras',
    year: '4th Year',
    branch: 'Computer Science',
    skills: ['Blockchain', 'Solidity', 'Web3', 'React'],
    interests: ['Cryptocurrency', 'DeFi', 'Smart Contracts'],
    bio: 'Blockchain developer building the decentralized future.',
    looking: 'Co-founder for DeFi platform',
    projects: ['project6'],
    endorsements: { 'Blockchain': 35, 'Solidity': 28, 'Web3': 20 },
    avatar: '👨‍💼',
    verified: true
  }
];

export const projects = [
  {
    id: 'project1',
    title: 'EduConnect - Peer Learning Platform',
    description: 'A platform connecting students for collaborative learning and peer tutoring.',
    authorId: '1',
    skillsNeeded: ['React', 'Node.js', 'MongoDB', 'UI/UX'],
    category: 'EdTech',
    status: 'Looking for team',
    likes: 45,
    competition: null,
    tags: ['Education', 'Social', 'Web']
  },
  {
    id: 'project2',
    title: 'AI Resume Analyzer',
    description: 'ML-powered tool to analyze and improve resumes with instant feedback.',
    authorId: '1',
    skillsNeeded: ['Python', 'NLP', 'Flask', 'React'],
    category: 'AI/ML',
    status: 'In Progress',
    likes: 32,
    competition: null,
    tags: ['AI', 'Career', 'NLP']
  },
  {
    id: 'project3',
    title: 'Smart Agriculture System',
    description: 'IoT-based system for monitoring soil health and automating irrigation.',
    authorId: '2',
    skillsNeeded: ['IoT', 'Arduino', 'Python', 'Data Analysis'],
    category: 'IoT',
    status: 'Looking for team',
    likes: 58,
    competition: 'Smart India Hackathon 2024',
    tags: ['IoT', 'Agriculture', 'Sustainability']
  },
  {
    id: 'project4',
    title: 'Structural Optimization Tool',
    description: 'Research on AI-driven optimization for civil engineering structures.',
    authorId: '3',
    skillsNeeded: ['MATLAB', 'Python', 'Machine Learning', 'CAD'],
    category: 'Research',
    status: 'Collaborators wanted',
    likes: 28,
    competition: null,
    tags: ['Research', 'Engineering', 'AI']
  },
  {
    id: 'project5',
    title: 'BudgetBuddy - Expense Tracker',
    description: 'Beautiful and intuitive mobile app for personal finance management.',
    authorId: '4',
    skillsNeeded: ['Flutter', 'Firebase', 'UI/UX'],
    category: 'FinTech',
    status: 'Looking for team',
    likes: 67,
    competition: null,
    tags: ['Mobile', 'Finance', 'Design']
  },
  {
    id: 'project6',
    title: 'DeFi Lending Protocol',
    description: 'Decentralized lending platform built on Ethereum.',
    authorId: '5',
    skillsNeeded: ['Solidity', 'Web3', 'React', 'Smart Contracts'],
    category: 'Blockchain',
    status: 'Co-founder needed',
    likes: 89,
    competition: null,
    tags: ['Blockchain', 'DeFi', 'Ethereum']
  },
  {
    id: 'project7',
    title: 'Campus Connect',
    description: 'Social platform for college events and club activities.',
    authorId: '2',
    skillsNeeded: ['React Native', 'Node.js', 'MongoDB'],
    category: 'Social',
    status: 'Looking for team',
    likes: 42,
    competition: 'Inter-NIT Tech Meet',
    tags: ['Social', 'Mobile', 'Campus']
  }
];

export const messages = [
  {
    id: 'msg1',
    from: '2',
    to: '1',
    content: 'Hey! I saw your EduConnect project. I have experience with UI/UX and would love to collaborate!',
    timestamp: new Date('2024-03-15T10:30:00'),
    read: true
  },
  {
    id: 'msg2',
    from: '1',
    to: '2',
    content: 'That sounds great! Would you like to hop on a call this weekend to discuss?',
    timestamp: new Date('2024-03-15T11:00:00'),
    read: true
  },
  {
    id: 'msg3',
    from: '3',
    to: '1',
    content: 'Interested in your AI Resume Analyzer. Can I contribute to the ML models?',
    timestamp: new Date('2024-03-16T09:15:00'),
    read: false
  }
];

export const competitions = [
  'Smart India Hackathon 2024',
  'Inter-IIT Tech Meet',
  'Inter-NIT Tech Meet',
  'ACM ICPC',
  'Google Solution Challenge',
  'Microsoft Imagine Cup',
  'HackMIT',
  'E-Summit IIT Bombay'
];

export const institutes = [
  'IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur',
  'IIT Roorkee', 'IIT Guwahati', 'IIT Hyderabad', 'IIT Indore', 'IIT BHU',
  'NIT Trichy', 'NIT Karnataka', 'NIT Warangal', 'NIT Calicut', 'NIT Rourkela',
  'IIIT Hyderabad', 'IIIT Delhi', 'IIIT Bangalore', 'BITS Pilani', 'DTU'
];

export const skillsList = [
  'React', 'Node.js', 'Python', 'Java', 'C++', 'JavaScript', 'TypeScript',
  'Flutter', 'React Native', 'Angular', 'Vue.js', 'Django', 'Flask',
  'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision',
  'Blockchain', 'Solidity', 'Web3', 'Smart Contracts',
  'IoT', 'Arduino', 'Raspberry Pi', 'Embedded Systems',
  'UI/UX', 'Figma', 'Adobe XD', 'Photoshop',
  'AWS', 'Docker', 'Kubernetes', 'DevOps',
  'SQL', 'MongoDB', 'PostgreSQL', 'Firebase',
  'CAD', 'MATLAB', 'Data Analysis', 'Data Science'
];
