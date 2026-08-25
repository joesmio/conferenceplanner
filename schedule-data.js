/** TechWorks Semiconductors to Systems Summit 2026 (S2S26) official agenda. */
export const CONFERENCE = {
  id: "s2s26",
  name: "TechWorks Semiconductors to Systems Summit",
  shortName: "S2S26",
  tagline: "One day. Four conferences. Choose your path through the value chain.",
  date: "2026-08-26",
  dateLabel: "Wednesday 26 August 2026",
  timezone: "Europe/London",
  website: "https://techworks.org.uk/tws2s26/",
  agendaUrl: "https://techworks.org.uk/s2s26-agenda/",
  venue: {
    name: "Novotel London West",
    address: "1 Shortlands, Hammersmith, London W6 8DR",
    mapsUrl: "https://maps.google.com/?q=Novotel+London+West+1+Shortlands",
    travel: [
      "Hammersmith Station is a 3–5 minute walk (District and Hammersmith & City lines; Piccadilly line is closed).",
      "On-site car park available.",
      "Bring your Eventbrite QR code for badge print at registration.",
    ],
  },
  rooms: {
    champagne: "Champagne Suite",
    avize: "Avize room, Champagne Suite",
    morangis: "Morangis room, Champagne Suite",
    bourgogne: "Bourgogne Suite",
    cognac: "Cognac Suite",
    exhibition: "Exhibition area, Champagne Suite",
  },
  notes: [
    "Registration is 08:00–08:45 in the Champagne Suite. Wear your badge throughout the day.",
    "The 08:45 plenary is in the Build room (Avize) and is live-streamed to the other tracks.",
    "Four tracks run in parallel after the plenary. Pick one session per time block — you can switch tracks between blocks.",
    "Cloakroom facilities are available. The drinks reception starts at 18:00 in the exhibition area.",
  ],
  tracks: [
    {
      id: "build",
      name: "Build",
      host: "NMI",
      sponsor: "VAT and ZEISS",
      title: "Materials, Manufacturing & Devices",
      blurb: "From novel materials to advanced packaging, metrology and smart manufacturing.",
      room: "Avize room, Champagne Suite",
    },
    {
      id: "create",
      name: "Create",
      host: "AESIN & DESN",
      sponsor: "NXP",
      title: "Systems, Integration & Verification",
      blurb: "Software-defined products, SoC, PNT, autonomy, electrification and functional safety.",
      room: "Cognac Suite",
    },
    {
      id: "secure",
      name: "Secure",
      host: "IoTSF",
      sponsor: "Green Hills Software",
      title: "Cyber Resilience, Trust & Quantum Safety",
      blurb: "12th annual IoT Security Conference: risk, regulation, trusted silicon and post-quantum.",
      room: "Bourgogne Suite",
    },
    {
      id: "scale",
      name: "Scale",
      host: "UK Semiconductor Centre",
      sponsor: "UK Semiconductor Centre",
      title: "Investing in the Future of UK Semiconductors",
      blurb: "Founders, capital, international partners and the UK’s place in the global value chain.",
      room: "Morangis room, Champagne Suite",
    },
  ],
  slots: [
    {
      id: "reg",
      start: "08:00",
      end: "08:45",
      kind: "shared",
      title: "Registration",
      room: "Champagne Suite",
      detail: "Collect your badge in the Champagne Suite. Have your Eventbrite QR code ready.",
    },
    {
      id: "plenary",
      start: "08:45",
      end: "09:15",
      kind: "shared",
      title: "Opening plenary",
      room: "Avize room, Champagne Suite (live-streamed to other tracks)",
      detail:
        "With Hannah Boardman, Director – Frontier Technologies, Department for Business, Innovation, Science and Trade; Paul Williamson, SVP Corporate Ventures, Arm; Charles Sturman, CEO, TechWorks; and Jillian Hughes, Founder, Women in TechWorks and Director of Operations, Silicon Catalyst EU.",
    },
    {
      id: "am1",
      start: "09:15",
      end: "10:50",
      kind: "choice",
      title: "Morning sessions",
    },
    {
      id: "break1",
      start: "10:50",
      end: "11:30",
      kind: "shared",
      title: "Networking break",
      room: "Exhibition, Champagne Suite",
      detail: "Coffee and exhibition in the Champagne Suite.",
    },
    {
      id: "am2",
      start: "11:30",
      end: "13:00",
      kind: "choice",
      title: "Late-morning sessions",
    },
    {
      id: "lunch",
      start: "13:00",
      end: "14:10",
      kind: "shared",
      title: "Networking lunch",
      room: "Exhibition, Champagne Suite",
      detail: "Lunch and exhibition networking.",
    },
    {
      id: "pm1",
      start: "14:10",
      end: "15:40",
      kind: "choice",
      title: "Afternoon sessions",
    },
    {
      id: "break2",
      start: "15:40",
      end: "16:20",
      kind: "shared",
      title: "Networking break",
      room: "Exhibition, Champagne Suite",
      detail: "Afternoon coffee and exhibition.",
    },
    {
      id: "pm2",
      start: "16:20",
      end: "18:00",
      kind: "choice",
      title: "Late-afternoon sessions",
    },
    {
      id: "reception",
      start: "18:00",
      end: "20:00",
      kind: "shared",
      title: "Evening reception",
      room: "Exhibition area, Champagne Suite",
      detail: "Sponsored by IC Resources and introduced by Neil Dickins, Founder, Director, IC Resources.",
    },
  ],
  sessions: [
    {
      id: "am1-build",
      slotId: "am1",
      trackId: "build",
      title: "Materials innovation",
      host: "John Lincoln, CEO, Photonics Leadership Group",
      room: "Avize room, Champagne Suite",
      summary:
        "Gold sponsor remarks from VAT and ZEISS, a CSA Catapult keynote, then world-leading materials from wide bandgap to photonics.",
      talks: [
        {
          title: "Gold track sponsor address",
          speakers: "Venothan Naidoo, Carl Zeiss Limited; John O’Donnell, VAT Group; introduction by Charles Sturman, TechWorks",
        },
        { title: "Keynote", speakers: "Caroline O’Brien, CEO, CSA Catapult" },
        {
          title: "REWIRE – The next generation of power semiconductors: from concept to commercialisation",
          speakers: "Katie Hore, Innovation Director, REWIRE; Peter Gammon, Professor of Power Electronic Devices, University of Warwick",
        },
        {
          title: "Photonics materials",
          speakers: "Jon Heffernan, Professor of Semiconductor Materials and Devices, University of Sheffield",
          highlight: "Sheffield",
        },
        {
          title: "ICeGaN® — a scalable platform for the next generation of power systems",
          speakers: "Daniel Murphy, Senior Director Product Management, Cambridge GaN Devices",
        },
        {
          title: "Compound semiconductor materials: from innovation to manufacturing",
          speakers: "Iwan Davies, Group Technology Director, IQE plc",
        },
        { title: "Panel discussion", speakers: "Session speakers" },
      ],
    },
    {
      id: "am1-create",
      slotId: "am1",
      trackId: "create",
      title: "Software-defined product & system security",
      host: "Angad Jessel, APC UK; Prof. Siraj Shaikh, Swansea University",
      room: "Cognac Suite",
      summary:
        "NXP sponsor address and an APC/Zenzic keynote, then two sequential themes: software-defined products and system security & resilience.",
      talks: [
        {
          title: "Gold track sponsor address",
          speakers: "John Boggie, Senior Director Security Business Development, NXP Semiconductors",
        },
        {
          title: "Keynote: Software defined vehicles — the future of mobility",
          speakers: "Ian Constance, CEO, Advanced Propulsion Centre UK & Zenzic",
        },
        {
          title: "Bringing physical AI into the real world",
          speakers: "Robert Moran, SVP & GM Automotive Processors, NXP Semiconductors",
        },
        {
          title: "Digital twins and AI along a digital thread: accelerating SDV and SDP development",
          speakers: "Brendan Morris, Senior Technical Marketing Engineer, Siemens Digital Industries Software",
        },
        {
          title: "From SDV to AIDV: what will automotive engineering look like tomorrow?",
          speakers: "Steve Waldron, Head of Software Platform, Vector GB",
        },
        {
          title: "Real-time hardware integrity validation for mission-critical cyber-physical systems",
          speakers: "Prof. Hafiz Malik, University of Michigan; Founder & CTO, Ipso Security Inc.",
        },
        {
          title: "Context-aware intrusion detection on the vehicle high-performance computer",
          speakers: "Saket Mohan, Founder & CEO, Secure Elements",
        },
        {
          title: "From components to machines: why SBOM integration matters for machinery OEMs",
          speakers: "Sergio Scabar, Engineer Manager – Electrical & Controls, JCB",
        },
      ],
    },
    {
      id: "am1-secure",
      slotId: "am1",
      trackId: "secure",
      title: "Cyber risk, trust and resilience",
      host: "Chris Bennison, Operations Manager, IoT Security Foundation",
      room: "Bourgogne Suite",
      summary:
        "Strategies for managing cyber risk and building trust across connected IoT ecosystems, opened by Green Hills Software.",
      talks: [
        {
          title: "Gold track sponsor address and IoTSF introduction",
          speakers: "Jeremy Flann, Vice President, EMEA, Green Hills Software; Chris Bennison, IoTSF",
        },
        {
          title: "Keynote",
          speakers: "Hugo Vincent, Principal Security Architect (Researcher), Arm",
        },
        {
          title: "Vibe coding for IoT and the pitfalls of AI",
          speakers: "Ken Munro, Managing Partner; Aaron Thacker, Hardware Security Consultant, Pen Test Partners",
        },
        {
          title: "Why aren’t our enterprises secure from cyber-attacks?",
          speakers: "Jeremy Flann, Vice President, EMEA, Green Hills Software",
        },
        { title: "Trust at AI speed", speakers: "Florian Lukavsky, Chief Innovation Officer, SignPath" },
        {
          title: "From visibility to verifiable trust: continuous IoT & OT compliance in the age of AI and quantum risk",
          speakers: "James Penney, Chief Technology Officer, Device Authority",
        },
      ],
    },
    {
      id: "am1-scale",
      slotId: "am1",
      trackId: "scale",
      title: "Building a winning semiconductor company",
      host: "Andy McLean, CEO, UK Semiconductor Centre",
      room: "Morangis room, Champagne Suite",
      summary:
        "Founders and operators on investment, growth, international expansion and positioning for long-term success.",
      talks: [
        {
          title: "Welcome and sector overview",
          speakers: "Andy McLean, CEO, UK Semiconductor Centre",
        },
        { title: "Keynote", speakers: "Stan Boland, technology entrepreneur and investor" },
        { title: "Keynote", speakers: "Phil Burr, Head of Product, Lumai" },
        { title: "Keynote", speakers: "James Lee, Co-founder & CEO, Wave Photonics" },
        {
          title: "Panel",
          speakers: "Stan Boland; James Lee; Phil Burr; Sean Redmond, President, Silicon Catalyst — chaired by Andy McLean",
        },
      ],
    },
    {
      id: "am2-build",
      slotId: "am2",
      trackId: "build",
      title: "Materials to manufacturing",
      host: "Nitin Dahad, Executive Editor, EE Times",
      room: "Avize room, Champagne Suite",
      summary: "Translating materials into manufacturable processes — scale, yield and a viable UK ecosystem.",
      talks: [
        {
          title: "Building the future semiconductor ecosystem with atomically thin materials",
          speakers: "Dr Simon Thomas, CEO, Paragraf",
        },
        {
          title: "Advancing semiconductor sustainability with low-carbon integrated circuits",
          speakers: "Dr Feras Alkhalil, Vice President of Research and Development, Pragmatic Semiconductor",
        },
        { title: "Operations insight", speakers: "Ian Croston, VP Operations, Lumentum" },
        { title: "Process and equipment", speakers: "John Tingay, CTO, Oxford Instruments Plasma Technology" },
        { title: "Panel discussion", speakers: "Session speakers" },
      ],
    },
    {
      id: "am2-create",
      slotId: "am2",
      trackId: "create",
      title: "Advances in SoC & resilient PNT",
      host: "Amar Abid-Ali, CEO, Novomorphic; Prof. Douglas Paul, University of Glasgow",
      room: "Cognac Suite",
      summary:
        "AI in chip design and verification, then resilient positioning, navigation and timing across defence, robotics and quantum-era PNT.",
      talks: [
        { title: "SoC design at Raspberry Pi", speakers: "Tim Mamtora, COO, Raspberry Pi" },
        {
          title: "From assistants to autonomous agents: the evolution of AI in chip design",
          speakers: "Asi Sapir, Applications Engineering, Senior Architect, Synopsys",
        },
        {
          title: "Evolution of silicon design",
          speakers: "Mrudula Gore, Senior Director, GPU Hardware Design, Imagination Technologies",
        },
        {
          title: "Can we trust the chips in our cars? Verification as the foundation of safe automotive silicon",
          speakers: "Abinaya Senthil, Design Verification, NXP Semiconductors",
        },
        {
          title: "From prompt to product: generative design for embedded systems that scale",
          speakers: "Mark Lippett, CEO & President, XMOS",
        },
        {
          title: "Applications for resilient positioning, navigation and timing",
          speakers: "Prof. Douglas Paul, Semiconductor Devices, University of Glasgow",
        },
        {
          title: "Disruptive capabilities and technologies",
          speakers: "Chester Butterworth, Head of Strategy, Disruptive Capabilities and Technologies Office, Royal Navy",
        },
        {
          title: "Robotics and PNT",
          speakers: "John Brotherhood, Senior Principal Robotics Specialist, Amentum",
        },
        { title: "Fireside chat", speakers: "PNT session speakers" },
      ],
    },
    {
      id: "am2-secure",
      slotId: "am2",
      trackId: "secure",
      title: "Governance, regulation and emerging threats",
      host: "Chris Bennison, IoT Security Foundation",
      room: "Bourgogne Suite",
      summary: "Regulatory reality, threat modelling, agentic AI risk, and a Cyber Resilience Act panel.",
      talks: [
        {
          title: "The threat model as your security centrepiece",
          speakers: "Jonny Tyers, Managing Director, Threatplane",
        },
        {
          title: "Secure agentic AI: the details most orgs overlook",
          speakers: "Bill Bauman, Co-founder, NuDay AI",
        },
        {
          title: "The good, the bad, and the non-compliant: real-world data from SafeShark’s testing frontlines",
          speakers: "Jonathan Marshall, Director, SafeShark",
        },
        {
          title: "Preparing for the quantum era and the age of AI",
          speakers: "Adam McElroy, Chief Technology Officer, Eclypses",
        },
        {
          title: "CRA panel: turning the Cyber Resilience Act into reality",
          speakers:
            "Moderator Richard Marshall, XITEX. Panellists: David Pashley, Direct Insight; Joe Lomako, TÜV SÜD; John Boggie, NXP; Mustanir Ali, Element; Florian Lukavsky, SignPath; Ian Pearson, Microchip",
        },
      ],
    },
    {
      id: "am2-scale",
      slotId: "am2",
      trackId: "scale",
      title: "Funding the future",
      host: "Martin O’Sullivan, Director of Investment, UKSC",
      room: "Morangis room, Champagne Suite",
      summary: "Public and private capital: how investors are backing semiconductor scale-up.",
      talks: [
        {
          title: "Overview of the semiconductor investment landscape",
          speakers: "Martin O’Sullivan, Director of Investment, UKSC",
        },
        {
          title: "Keynote",
          speakers: "George Mills, Senior Director Direct Equity – Technology, British Business Bank",
        },
        { title: "Keynote", speakers: "Maxime Mallet, General Partner, Jolt Capital" },
        {
          title: "Keynote: silicon is cheap, conviction is scarce",
          speakers: "Lee Thornton, Partner, IP Group",
        },
        { title: "Keynote", speakers: "Ekaterina Almasque, Founding Partner, BlankPage Capital" },
        {
          title: "Panel",
          speakers:
            "Lee Thornton; George Mills; Maxime Mallet; Ekaterina Almasque; Russell Haggar, Managing Partner, Silicon Catalyst LLC — chaired by Martin O’Sullivan",
        },
      ],
    },
    {
      id: "pm1-build",
      slotId: "pm1",
      trackId: "build",
      title: "Intelligent and reliable semiconductor manufacturing",
      host: "Steve Reynolds, Strategic Business Development Manager, NPL",
      room: "Avize room, Champagne Suite",
      summary: "How manufacturers keep operations efficient with metrology, AI, CIM and dynamic capacity planning.",
      talks: [
        {
          title: "Automated metrology for semiconductors",
          speakers: "Andrew Elliott, Business Development Lead, Carl Zeiss Ltd",
        },
        {
          title: "AI can find defects. Can it explain them?",
          speakers: "Suzanne Costello, Founder & CEO, Forensic Eyes Ltd",
        },
        {
          title: "Computer integrated manufacturing",
          speakers: "John Moylan, Operations Senior Manager, Vishay Newport Limited",
        },
        {
          title: "Harnessing AI at Bourns: from pragmatic blueprint to adaptive execution",
          speakers: "Daniel Picado, President – Protection Division, Bourns",
        },
        {
          title: "From static capacity model to dynamic capacity planning: Diodes case study",
          speakers: "Sudesh Lutchman, Lead Engineer, Flexciton",
        },
        { title: "Panel discussion", speakers: "Session speakers" },
      ],
    },
    {
      id: "pm1-create",
      slotId: "pm1",
      trackId: "create",
      title: "AI, automation & robotics",
      host: "Prof. Valentina Donzella, Queen Mary University of London",
      room: "Cognac Suite",
      summary: "Cross-sector automation, AI and the challenge of moving to intelligent autonomous systems.",
      talks: [
        {
          title: "Proteus: autonomous, modular, collaborative, cost effective",
          speakers: "Edwin Herrera Alarcón, Autonomy and Connected Systems Specialist, Leonardo Helicopters",
        },
        {
          title: "Robotics and intelligent systems",
          speakers: "Dr Ketao Zhang, Reader, Queen Mary University of London",
        },
        { title: "AI and automation", speakers: "Elena Voinea, Senior Software Engineer, IPG Automotive UK" },
        {
          title: "Digital twins to AI-enabled autonomy: keeping humans at the centre",
          speakers: "Deepaa Ganesh, Fellow, QinetiQ",
        },
        { title: "Session Q&A", speakers: "Session speakers" },
      ],
    },
    {
      id: "pm1-secure",
      slotId: "pm1",
      trackId: "secure",
      title: "Secure foundations and trusted infrastructure",
      host: "Chris Bennison, IoT Security Foundation",
      room: "Bourgogne Suite",
      summary: "CHERI, memory-safe AI hardware, secure edge AI, silicon assurance and a supply-chain panel.",
      talks: [
        {
          title: "From research to deployment: CHERI, the CHERI Alliance and the next wave of secure computing",
          speakers: "Mike Eftimakis, Founding Director, CHERI Alliance",
        },
        {
          title: "Trusted foundations for memory-safe AI: hardware-enforced cyber resilience",
          speakers: "Haydn Povey, CEO and Co-founder, SCI Semiconductor",
        },
        { title: "Secure edge AI with FPGAs", speakers: "Amar Abid-Ali, CEO, Novomorphic" },
        {
          title: "Silicon assurance and tamper-evident supply chains",
          speakers: "Franck Courbon, Founder and CEO, Ethicronics Ltd",
        },
        {
          title: "Supply chain panel",
          speakers:
            "Moderator Ras Attale, Women in TechWorks / Siemens. Panellists: Lee Harrison, Siemens EDA; Prof. Siraj Shaikh, Swansea University; Nicole Finney, Secarma; representative from NCSC",
        },
      ],
    },
    {
      id: "pm1-scale",
      slotId: "pm1",
      trackId: "scale",
      title: "Why the UK? Multinationals and international partners",
      host: "Brian Robertson, Director of International Partnerships, UKSC",
      room: "Morangis room, Champagne Suite",
      summary: "How global firms invest and innovate in the UK, plus a panel of international semiconductor agencies.",
      talks: [
        { title: "Introduction", speakers: "Brian Robertson, UK Semiconductor Centre" },
        {
          title: "Keynote",
          speakers: "Elizabeth Patterson, Senior Program and Policy Manager, Seagate Technology",
        },
        { title: "Fireside chat", speakers: "Chaired by Brian Robertson" },
        {
          title: "Building effective international partnerships",
          speakers: "Introduction by Charles Sturman, CEO, TechWorks",
        },
        {
          title: "International panel",
          speakers:
            "Paul Slaby, Canada’s Semiconductor Council; Ryohei Gamada, JETRO London; Ivan Stojanovic, OostNL / ChipNL; Andreas Lippert, Saxony Trade & Invest — chaired by Charles Sturman",
        },
      ],
    },
    {
      id: "pm2-build",
      slotId: "pm2",
      trackId: "build",
      title: "Advanced packaging & system optimisation",
      host: "Steve Riches, Secretariat, IMAPS-UK",
      room: "Avize room, Champagne Suite",
      summary: "Heterogeneous integration, UK packaging capacity, chiplets and automotive compute.",
      talks: [
        {
          title: "Introduction to IMAPS-UK",
          speakers: "Steve Riches, Secretariat, IMAPS-UK",
        },
        {
          title: "Medium volume production and advanced packaging in the UK",
          speakers: "John Boston, Managing Director, Custom Interconnect Limited",
        },
        { title: "Advanced packaging capability", speakers: "Prof. Derrick Holliday, Director, NASPIC" },
        {
          title: "Semiconductor systems, integration and CHIMES",
          speakers: "Ibrahim Sari, University of Southampton; John Darlington, CHIMES IKC lead, University of Southampton",
          highlight: "CHIMES",
        },
        {
          title: "From virtual prototypes to chiplet platforms: engineering the future of automotive compute",
          speakers: "Katayoon Basharkhah, Researcher, imec",
        },
        {
          title: "Accelerating chiplet SoC development with standards-based frameworks",
          speakers: "Derek McAulay, Design Engineering Architect, Cadence",
        },
        { title: "Panel discussion", speakers: "Session speakers" },
        { title: "Closing remarks", speakers: "Charles Sturman, CEO, TechWorks" },
      ],
    },
    {
      id: "pm2-create",
      slotId: "pm2",
      trackId: "create",
      title: "AV2G moving power & functional safety",
      host: "Matthew Knight, Cenex; Dr David Ward, HORIBA MIRA",
      room: "Cognac Suite",
      summary:
        "Electrification from wafer to application, then functional safety from semiconductor IP through to system assurance.",
      talks: [
        { title: "Vehicle-to-grid and energy systems", speakers: "Daniel Turner, CPO, TOGL Energy" },
        {
          title: "Electrification product and strategy",
          speakers: "Paolo Bargiacchi, Director, Product and Strategy, Motion Applied",
        },
        { title: "Electrification programmes", speakers: "Richard Gordon, Project Director, Electrification, Ricardo" },
        {
          title: "Vishay silicon carbide solutions",
          speakers: "Praneet Bhatnagar, Senior Applications Engineer, Vishay Intertechnology",
        },
        { title: "AV2G panel", speakers: "Session speakers" },
        {
          title: "Functional safety — from semiconductor to systems",
          speakers: "Hosted by Dr David Ward, Global Head of Functional Safety, HORIBA MIRA",
        },
        { title: "Software standards and evidence", speakers: "Andrew Banks, Technical Specialist, LDRA" },
        {
          title: "Processor and system assurance",
          speakers: "Antonio Priore, Senior Director of Systems Engineering, Imagination Technologies",
        },
        { title: "Closing remarks", speakers: "Gunny Dhadyalla, Network Director, AESIN" },
      ],
    },
    {
      id: "pm2-secure",
      slotId: "pm2",
      trackId: "secure",
      title: "Quantum security and future readiness",
      host: "Chris Bennison, IoT Security Foundation",
      room: "Bourgogne Suite",
      summary: "Post-quantum cryptography, crypto-agility and practical quantum-ready IoT.",
      talks: [
        {
          title: "Adopting post-quantum security and memory safety through open source",
          speakers: "Javier Orensanz Martinez, CEO, lowRISC",
        },
        { title: "Post-quantum tales from the trenches", speakers: "Chris Swan, Engineer, Atsign" },
        {
          title: "End-to-end digital assurance for quantum systems",
          speakers: "Stephen Powley, Senior Research Associate in Systems Security, Loughborough University",
        },
        { title: "Quantum-ready enterprise perspective", speakers: "Zygmunt A. Lozinski, IBM" },
        {
          title: "The road to quantum-ready IoT",
          speakers: "Mohit Arora, Senior Director, Architecture & Product Security, Synaptics",
        },
        {
          title: "Keynote",
          speakers: "Dex Hunter-Torricke, Founder & President, The Center for Tomorrow",
        },
        { title: "Closing remarks", speakers: "Chris Bennison, IoT Security Foundation" },
      ],
    },
    {
      id: "pm2-scale",
      slotId: "pm2",
      trackId: "scale",
      title: "The UK’s future in the global semiconductor value chain",
      host: "Raj Gawera, COO, UK Semiconductor Centre",
      room: "Morangis room, Champagne Suite",
      summary: "Where the UK adds most value, and why international partners should choose it.",
      talks: [
        { title: "Introduction", speakers: "Raj Gawera, COO, UKSC" },
        { title: "Keynote", speakers: "Graham Curren, Founder & former CEO, Sondrel" },
        { title: "Keynote", speakers: "Rebecca Dobson, technology executive and board advisor" },
        {
          title: "Keynote",
          speakers: "Themis Prodromakis, Regius Chair of Engineering, University of Edinburgh",
        },
        {
          title: "Keynote",
          speakers: "Richard Duffy, Head of Sector Growth, Semiconductor Unit, DBIST",
        },
        {
          title: "Panel",
          speakers: "Graham Curren; Rebecca Dobson; Themis Prodromakis; Richard Duffy — chaired by Raj Gawera",
        },
        { title: "Closing remarks", speakers: "Andy McLean, CEO, UKSC" },
      ],
    },
  ],
};

export const TRACK_IDS = CONFERENCE.tracks.map((track) => track.id);
