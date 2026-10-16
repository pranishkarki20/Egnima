// ========================================
// ENIGMA Notes Library — Data Model
// ========================================

export type Year = 1 | 2 | 3 | 4;
export type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface Subject {
  id: string;
  name: string;
  code: string;
  year: Year;
  semester: Semester;
  branch: string;
  pdfUrl: string;
  description?: string;
}

// ── Filter Options ──────────────────────

export const years: Year[] = [1, 2, 3, 4];

export const semesters: Semester[] = [1, 2, 3, 4, 5, 6, 7, 8];

export const branches = [
  "CSE",
  "ECE",
  "ME",
  "CE",
  "EEE",
  "IT",
] as const;

export type Branch = (typeof branches)[number];

// ── Subject Database ────────────────────

export const subjects: Subject[] = [
  // ═══════════════════════════════════════
  //  CSE — Year 1 (Semesters 1 & 2)
  // ═══════════════════════════════════════
  {
    id: "cse-101",
    name: "Computer Concepts and Programming",
    code: "CE143",
    year: 1,
    semester: 1,
    branch: "CSE",
    pdfUrl: "/notes/cse/programming-in-c.pdf",
    description: "Fundamentals of C programming, data types, control structures, arrays, pointers and functions.",
  },
  {
    id: "cse-102",
    name: "Engineering Mathematics I",
    code: "MA143",
    year: 1,
    semester: 1,
    branch: "CSE",
    pdfUrl: "/notes/cse/engineering-mathematics-1.pdf",
    description: "Calculus, differential equations, and linear algebra fundamentals.",
  },
  {
    id: "cse-103",
    name: "Basics of Electronics and Electrical Engineering",
    code: "EE145",
    year: 1,
    semester: 1,
    branch: "CSE",
    pdfUrl: "/notes/cse/basic-electronics.pdf",
    description: "Semiconductor devices, diodes, transistors and basic amplifier circuits.",
  },
  {
    id: "cse-104",
    name: "Engineering Physics I",
    code: "PY142",
    year: 1,
    semester: 1,
    branch: "CSE",
    pdfUrl: "/notes/cse/engineering-physics-1.pdf",
    description: "Mechanics, waves, optics and modern physics fundamentals.",
  },
  {
    id: "cse-105",
    name: "ICT Workshop",
    code: "IT144",
    year: 1,
    semester: 1,
    branch: "CSE",
    pdfUrl: "/notes/cse/ict-workshop.pdf",
    description: "Information and communication technology tools, computer generations and practical skills.",
  },
  {
    id: "cse-106",
    name: "Object Oriented Programming with C++",
    code: "CE144",
    year: 1,
    semester: 2,
    branch: "CSE",
    pdfUrl: "/notes/cse/oop.pdf",
    description: "Classes, inheritance, polymorphism, abstraction and encapsulation in C++.",
  },
  {
    id: "cse-107",
    name: "Engineering Mathematics II",
    code: "MA144",
    year: 1,
    semester: 2,
    branch: "CSE",
    pdfUrl: "/notes/cse/engineering-mathematics-2.pdf",
    description: "Differential equations, matrix algebra, multiple integrals, probability and statistics.",
  },
  {
    id: "cse-108",
    name: "Elements of Engineering",
    code: "ME145",
    year: 1,
    semester: 2,
    branch: "CSE",
    pdfUrl: "/notes/cse/engineering-drawing.pdf",
    description: "Engineering drawing, orthographic projections, mechanical and civil engineering basics.",
  },
  {
    id: "cse-109",
    name: "Environmental Sciences",
    code: "CL144A",
    year: 1,
    semester: 2,
    branch: "CSE",
    pdfUrl: "/notes/cse/environmental-sciences.pdf",
    description: "Ecology, pollution, waste management and environmental laws.",
  },
  {
    id: "cse-110",
    name: "Engineering Physics II",
    code: "PY143",
    year: 1,
    semester: 2,
    branch: "CSE",
    pdfUrl: "/notes/cse/engineering-physics-2.pdf",
    description: "Electromagnetism, quantum mechanics, semiconductor physics and laser fundamentals.",
  },

  // ═══════════════════════════════════════
  //  CSE — Year 2 (Semesters 3 & 4)
  // ═══════════════════════════════════════
  {
    id: "cse-201",
    name: "Java Programming",
    code: "CE251",
    year: 2,
    semester: 3,
    branch: "CSE",
    pdfUrl: "/notes/cse/java-programming.pdf",
    description: "Core Java, OOP concepts, exception handling, multithreading and GUI programming.",
  },
  {
    id: "cse-202",
    name: "Digital Electronics",
    code: "CE252",
    year: 2,
    semester: 3,
    branch: "CSE",
    pdfUrl: "/notes/cse/digital-logic-design.pdf",
    description: "Boolean algebra, combinational and sequential circuits, flip-flops and counters.",
  },
  {
    id: "cse-203",
    name: "Data Communication and Networking",
    code: "CE257",
    year: 2,
    semester: 3,
    branch: "CSE",
    pdfUrl: "/notes/cse/dcn.pdf",
    description: "Data communication fundamentals, networking protocols, LAN/WAN and network topologies.",
  },
  {
    id: "cse-204",
    name: "Discrete Mathematics",
    code: "MA253",
    year: 2,
    semester: 3,
    branch: "CSE",
    pdfUrl: "/notes/cse/discrete-mathematics.pdf",
    description: "Predicate calculus, relations, lattices, graph theory, recurrence relations and abstract algebra.",
  },
  {
    id: "cse-205",
    name: "Data Structures and Algorithms",
    code: "CE245",
    year: 2,
    semester: 4,
    branch: "CSE",
    pdfUrl: "/notes/cse/data-structures.pdf",
    description: "Arrays, linked lists, stacks, queues, trees, graphs, sorting and searching algorithms.",
  },
  {
    id: "cse-206",
    name: "Database Management Systems",
    code: "CE246",
    year: 2,
    semester: 4,
    branch: "CSE",
    pdfUrl: "/notes/cse/dbms.pdf",
    description: "Relational model, SQL, normalization, transactions and concurrency control.",
  },
  {
    id: "cse-207",
    name: "Microprocessor and Computer Organization",
    code: "CE258",
    year: 2,
    semester: 4,
    branch: "CSE",
    pdfUrl: "/notes/cse/microprocessor-co.pdf",
    description: "Microprocessor architecture, instruction set, memory organization and I/O interfacing.",
  },
  {
    id: "cse-208",
    name: "Programming in Python",
    code: "CE259",
    year: 2,
    semester: 4,
    branch: "CSE",
    pdfUrl: "/notes/cse/python.pdf",
    description: "Python basics, data structures, file handling, OOP and libraries.",
  },

  // ═══════════════════════════════════════
  //  CSE — Year 3 (Semesters 5 & 6)
  // ═══════════════════════════════════════
  {
    id: "cse-301",
    name: "Artificial Intelligence",
    code: "CS341",
    year: 3,
    semester: 5,
    branch: "CSE",
    pdfUrl: "/notes/cse/artificial-intelligence.pdf",
    description: "Search algorithms, knowledge representation, machine learning basics and neural networks.",
  },
  {
    id: "cse-302",
    name: "Operating Systems",
    code: "CS350",
    year: 3,
    semester: 5,
    branch: "CSE",
    pdfUrl: "/notes/cse/operating-systems.pdf",
    description: "Process management, memory management, file systems and synchronization.",
  },
  {
    id: "cse-303",
    name: "Design and Analysis of Algorithms",
    code: "CS358",
    year: 3,
    semester: 5,
    branch: "CSE",
    pdfUrl: "/notes/cse/daa.pdf",
    description: "Algorithm design paradigms, complexity analysis, graph algorithms, greedy and dynamic programming.",
  },
  {
    id: "cse-304",
    name: "Software Engineering",
    code: "CS359",
    year: 3,
    semester: 5,
    branch: "CSE",
    pdfUrl: "/notes/cse/software-engineering.pdf",
    description: "SDLC models, requirements engineering, design patterns and testing.",
  },
  {
    id: "cse-305",
    name: "Mobile Application Development",
    code: "CS380",
    year: 3,
    semester: 5,
    branch: "CSE",
    pdfUrl: "/notes/cse/mobile-app-dev.pdf",
    description: "Android development, UI design, activities, intents and mobile app architecture.",
  },
  {
    id: "cse-306",
    name: "Full Stack Development",
    code: "CS381",
    year: 3,
    semester: 5,
    branch: "CSE",
    pdfUrl: "/notes/cse/full-stack-dev.pdf",
    description: "Frontend and backend development, REST APIs, databases and deployment.",
  },
  {
    id: "cse-307",
    name: "Theory of Computation",
    code: "CS353",
    year: 3,
    semester: 6,
    branch: "CSE",
    pdfUrl: "/notes/cse/toc.pdf",
    description: "Finite automata, regular expressions, context-free grammars, Turing machines and decidability.",
  },
  {
    id: "cse-308",
    name: "Machine Learning",
    code: "CS360",
    year: 3,
    semester: 6,
    branch: "CSE",
    pdfUrl: "/notes/cse/machine-learning.pdf",
    description: "Supervised/unsupervised learning, regression, classification, clustering and deep learning.",
  },
  {
    id: "cse-309",
    name: "Cryptography and Network Security",
    code: "CS361",
    year: 3,
    semester: 6,
    branch: "CSE",
    pdfUrl: "/notes/cse/crns.pdf",
    description: "Symmetric/asymmetric encryption, digital signatures, network security protocols and firewalls.",
  },
  {
    id: "cse-310",
    name: "Computer Networks",
    code: "CS362",
    year: 3,
    semester: 6,
    branch: "CSE",
    pdfUrl: "/notes/cse/computer-networks.pdf",
    description: "OSI model, TCP/IP, routing, switching and network security.",
  },
  {
    id: "cse-311",
    name: "Cyber Security and Cyber Laws",
    code: "CS383",
    year: 3,
    semester: 6,
    branch: "CSE",
    pdfUrl: "/notes/cse/cyber-security.pdf",
    description: "Cyber threats, digital forensics, IT Act, privacy laws and ethical hacking.",
  },

  // ═══════════════════════════════════════
  //  CSE — Year 4 (Semester 7)
  // ═══════════════════════════════════════
  {
    id: "cse-401",
    name: "Data Science and Analytics",
    code: "CS442",
    year: 4,
    semester: 7,
    branch: "CSE",
    pdfUrl: "/notes/cse/data-science.pdf",
    description: "Statistical analysis, data visualization, probability, regression and predictive modelling.",
  },
  {
    id: "cse-402",
    name: "Internet of Things",
    code: "CS449",
    year: 4,
    semester: 7,
    branch: "CSE",
    pdfUrl: "/notes/cse/iot.pdf",
    description: "IoT architecture, sensors, protocols, gateways, cloud platforms and smart applications.",
  },
  {
    id: "cse-403",
    name: "Design of Language Processor",
    code: "CS450",
    year: 4,
    semester: 7,
    branch: "CSE",
    pdfUrl: "/notes/cse/compiler-design.pdf",
    description: "Lexical analysis, parsing, syntax-directed translation, intermediate code and code generation.",
  },
  {
    id: "cse-404",
    name: "Advance Computing",
    code: "CS451",
    year: 4,
    semester: 7,
    branch: "CSE",
    pdfUrl: "/notes/cse/cloud-computing.pdf",
    description: "Cloud architecture, virtualization, distributed systems and parallel computing.",
  },
  {
    id: "cse-405",
    name: "Image Processing and Computer Vision",
    code: "CS474",
    year: 4,
    semester: 7,
    branch: "CSE",
    pdfUrl: "/notes/cse/image-processing.pdf",
    description: "Image enhancement, segmentation, feature extraction and object detection.",
  },

  // ═══════════════════════════════════════
  //  ECE — Year 1
  // ═══════════════════════════════════════
  {
    id: "ece-101",
    name: "Basic Electronics",
    code: "EC101",
    year: 1,
    semester: 1,
    branch: "ECE",
    pdfUrl: "/notes/ece/basic-electronics.pdf",
    description: "Semiconductor devices, diodes, transistors and basic amplifier circuits.",
  },
  {
    id: "ece-102",
    name: "Circuit Theory",
    code: "EC102",
    year: 1,
    semester: 2,
    branch: "ECE",
    pdfUrl: "/notes/ece/circuit-theory.pdf",
    description: "Network theorems, AC/DC circuits, resonance and transient analysis.",
  },

  // ─── ECE — Year 2 ───
  {
    id: "ece-201",
    name: "Signals and Systems",
    code: "EC201",
    year: 2,
    semester: 3,
    branch: "ECE",
    pdfUrl: "/notes/ece/signals-and-systems.pdf",
    description: "Continuous and discrete signals, Fourier and Laplace transforms, LTI systems.",
  },
  {
    id: "ece-202",
    name: "Analog Electronics",
    code: "EC202",
    year: 2,
    semester: 4,
    branch: "ECE",
    pdfUrl: "/notes/ece/analog-electronics.pdf",
    description: "Operational amplifiers, feedback circuits, oscillators and analog filters.",
  },

  // ═══════════════════════════════════════
  //  ME — Year 1
  // ═══════════════════════════════════════
  {
    id: "me-101",
    name: "Engineering Mechanics",
    code: "ME101",
    year: 1,
    semester: 1,
    branch: "ME",
    pdfUrl: "/notes/me/engineering-mechanics.pdf",
    description: "Statics, dynamics, force systems, friction and virtual work.",
  },
  {
    id: "me-102",
    name: "Engineering Drawing",
    code: "ME102",
    year: 1,
    semester: 2,
    branch: "ME",
    pdfUrl: "/notes/me/engineering-drawing.pdf",
    description: "Orthographic projections, sections, isometric views and CAD basics.",
  },

  // ─── ME — Year 2 ───
  {
    id: "me-201",
    name: "Thermodynamics",
    code: "ME201",
    year: 2,
    semester: 3,
    branch: "ME",
    pdfUrl: "/notes/me/thermodynamics.pdf",
    description: "Laws of thermodynamics, entropy, Carnot cycle and gas power cycles.",
  },
  {
    id: "me-202",
    name: "Fluid Mechanics",
    code: "ME202",
    year: 2,
    semester: 4,
    branch: "ME",
    pdfUrl: "/notes/me/fluid-mechanics.pdf",
    description: "Fluid properties, Bernoulli's equation, viscous flow and pipe flow.",
  },

  // ═══════════════════════════════════════
  //  CE — Year 2
  // ═══════════════════════════════════════
  {
    id: "ce-201",
    name: "Strength of Materials",
    code: "CE201",
    year: 2,
    semester: 3,
    branch: "CE",
    pdfUrl: "/notes/ce/strength-of-materials.pdf",
    description: "Stress, strain, bending, shear and torsion in structural members.",
  },
  {
    id: "ce-202",
    name: "Surveying",
    code: "CE202",
    year: 2,
    semester: 4,
    branch: "CE",
    pdfUrl: "/notes/ce/surveying.pdf",
    description: "Chain surveying, leveling, theodolite and total station fundamentals.",
  },

  // ═══════════════════════════════════════
  //  EEE — Year 2
  // ═══════════════════════════════════════
  {
    id: "eee-201",
    name: "Electrical Machines",
    code: "EE201",
    year: 2,
    semester: 3,
    branch: "EEE",
    pdfUrl: "/notes/eee/electrical-machines.pdf",
    description: "DC machines, transformers, induction motors and synchronous machines.",
  },
  {
    id: "eee-202",
    name: "Power Systems",
    code: "EE202",
    year: 2,
    semester: 4,
    branch: "EEE",
    pdfUrl: "/notes/eee/power-systems.pdf",
    description: "Power generation, transmission, distribution and load flow analysis.",
  },

  // ═══════════════════════════════════════
  //  IT — Year 2
  // ═══════════════════════════════════════
  {
    id: "it-201",
    name: "Web Technologies",
    code: "IT201",
    year: 2,
    semester: 3,
    branch: "IT",
    pdfUrl: "/notes/it/web-technologies.pdf",
    description: "HTML, CSS, JavaScript, PHP, web servers and client-server architecture.",
  },
  {
    id: "it-202",
    name: "Information Security",
    code: "IT202",
    year: 2,
    semester: 4,
    branch: "IT",
    pdfUrl: "/notes/it/information-security.pdf",
    description: "Cryptography, network security, firewalls and ethical hacking basics.",
  },
];
