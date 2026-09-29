export interface Treatment {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  iconName: string;
  shortDesc: string;
  overview: string;
  keyApproaches: string[];
  stagesCovered: string[];
  heroImage: string;
  contentImage: string;
  faqs: { question: string; answer: string }[];
  quizQuestions: { question: string; options: string[] }[];
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  featuredImage: string;
  contentImage: string;
  introduction: string[];
  sections: BlogSection[];
  takeaways: string[];
  faqs: { question: string; answer: string }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  patientName: string;
  condition: string;
  category: string;
  tag: string;
  location: string;
  rating: number;
  date?: string;
  outcomeBadge?: string;
  treatmentDuration?: string;
  fullStoryTimeline?: { title: string; desc: string }[];
  careHighlights?: string[];
}

export interface StatItem {
  number: string;
  label: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const DOCTOR_INFO = {
  name: "Dr. (Brig.) A. K. Dhar",
  degrees: "MBBS, MD (Internal Medicine), Fellowship in Oncology",
  specialty: "Medical Oncologist & Cancer Specialist",
  experienceYears: "35+",
  title: "Clinical Director & Head — Medical Oncology",
  hospital: "Marengo Asia Hospitals, Gurugram",
  location: "Sector 56, Gurugram, Haryana & Delhi NCR",
  phone: "+91 98108 18266",
  email: "info@canceronco.in",
  consultationHours: "Mon - Sat: 9:00 AM - 5:00 PM",
  tagline: "Clarity in every conversation. Confidence in every next step.",
  quote: "Personalised care. A person-first approach.",
  heroImage: "/images/dr-ak-dhar-original.jpg",
  consultationImage: "/images/dr-ak-dhar-consultation.png"
};

export const STATS: StatItem[] = [
  {
    number: "35+",
    label: "Years of Experience",
    description: "Decades of dedicated clinical excellence in medical oncology."
  },
  {
    number: "10,000+",
    label: "Patients Guided",
    description: "Empowering individuals and families with clear cancer care."
  },
  {
    number: "6",
    label: "Specialised Pathways",
    description: "Targeted treatment plans across solid tumours and blood cancers."
  },
  {
    number: "100%",
    label: "Person-First Care",
    description: "Tailored medical oncology protocols focused on patient dignity."
  }
];

export const TREATMENTS: Treatment[] = [
  {
    slug: "breast-cancer",
    title: "Breast Cancer Care",
    subtitle: "Comprehensive, evidence-based systemic therapy and personalized cancer protocols.",
    category: "Solid Tumours",
    iconName: "Ribbon",
    shortDesc: "Thoughtful, evidence-based care across diagnosis, surgery and systemic treatment.",
    overview: "Breast cancer care requires a deeply tailored approach combining early diagnosis, genetic profiling, targeted systemic therapies, chemotherapy, and hormonal treatments. Dr. (Brig.) A. K. Dhar designs personalized treatment plans focused on optimal oncological outcomes while preserving quality of life.",
    keyApproaches: [
      "Hormone receptor-targeted systemic therapies",
      "HER2-directed targeted biological agents",
      "Neoadjuvant & adjuvant chemotherapy protocols",
      "Genetic risk assessment & molecular profiling"
    ],
    stagesCovered: ["Early Stage (Stage I & II)", "Locally Advanced (Stage III)", "Metastatic Breast Cancer (Stage IV)"],
    heroImage: "/images/breast-cancer-care.png",
    contentImage: "/images/dr-ak-dhar-consultation.png",
    faqs: [
      {
        question: "What is the role of targeted therapy in breast cancer?",
        answer: "Targeted therapies attack specific proteins on cancer cells (such as HER2 or estrogen receptors) while sparing normal tissues, improving treatment efficacy."
      },
      {
        question: "Is chemotherapy always required for breast cancer?",
        answer: "Not all patients require chemotherapy. The decision depends on tumour stage, grade, hormone receptor status, and genomic risk testing scores."
      },
      {
        question: "How are side effects managed during treatment?",
        answer: "We provide comprehensive supportive care, medication for nausea, close symptom monitoring, and lifestyle guidance throughout every cycle."
      }
    ],
    quizQuestions: [
      {
        question: "Have you recently undergone a biopsy or scan for a breast lump?",
        options: ["Yes, biopsy completed", "Scans done, biopsy pending", "Symptom observed, no tests yet"]
      },
      {
        question: "What is your main priority for the consultation?",
        options: ["First diagnosis evaluation", "Second opinion on treatment plan", "Managing ongoing treatment"]
      }
    ]
  },
  {
    slug: "blood-cancer",
    title: "Blood Cancer & Haematological Oncology",
    subtitle: "Advanced therapy protocols for Lymphoma, Myeloma, and Leukaemia.",
    category: "Haematology",
    iconName: "Droplet",
    shortDesc: "Personalised treatment planning for lymphoma, myeloma and leukaemia.",
    overview: "Haematological malignancies involve complex conditions of the blood, bone marrow, and lymphatic system. Dr. A. K. Dhar brings specialized expertise in managing Hodgkin and Non-Hodgkin Lymphoma, Multiple Myeloma, and Acute or Chronic Leukaemias using cutting-edge chemo-immunotherapy protocols.",
    keyApproaches: [
      "Monoclonal antibody chemo-immunotherapy",
      "Targeted oral kinase inhibitors",
      "Bone marrow examination & flow cytometry interpretation",
      "Maintenance & remission monitoring strategies"
    ],
    stagesCovered: ["Indolent Lymphomas", "Aggressive Lymphomas", "Multiple Myeloma & Plasma Cell Disorders"],
    heroImage: "/images/immunotherapy-research.png",
    contentImage: "/images/dr-ak-dhar-original.jpg",
    faqs: [
      {
        question: "What are the common symptoms of haematological cancers?",
        answer: "Unexplained fever, night sweats, persistent fatigue, painless swelling in lymph nodes (neck, armpits, groin), or frequent infections."
      },
      {
        question: "How is lymphoma treated?",
        answer: "Treatment typically combines targeted monoclonal antibodies (such as Rituximab) with multi-agent chemotherapy regimens tailored to the lymphoma subtype."
      }
    ],
    quizQuestions: [
      {
        question: "Which condition has been identified or suspected?",
        options: ["Lymphoma (Hodgkin/Non-Hodgkin)", "Multiple Myeloma", "Leukaemia", "Under evaluation"]
      }
    ]
  },
  {
    slug: "lungs-cancer",
    title: "Lung Cancer Treatment",
    subtitle: "Precision oncology including EGFR/ALK target inhibitors and immunotherapy.",
    category: "Solid Tumours",
    iconName: "Wind",
    shortDesc: "A multidisciplinary approach that connects testing, treatment and ongoing support.",
    overview: "Modern lung cancer care has been transformed by molecular testing and targeted treatments. Dr. A. K. Dhar evaluates patients for actionable genetic mutations (EGFR, ALK, ROS1, PD-L1) to deliver high-precision oral therapies and immune checkpoint blockade.",
    keyApproaches: [
      "NGS & biomarker molecular testing",
      "EGFR / ALK / ROS1 oral tyrosine kinase inhibitors",
      "PD-1 / PD-L1 immune checkpoint inhibitors",
      "Combination chemo-immunotherapy"
    ],
    stagesCovered: ["Non-Small Cell Lung Cancer (NSCLC)", "Small Cell Lung Cancer (SCLC)", "Metastatic Disease"],
    heroImage: "/images/lung-cancer-care.png",
    contentImage: "/images/targeted-therapy.png",
    faqs: [
      {
        question: "Why is molecular testing crucial for lung cancer?",
        answer: "Molecular testing identifies specific genetic mutations that allow patients to take targeted oral pills instead of or alongside traditional chemotherapy."
      },
      {
        question: "Can non-smokers get lung cancer?",
        answer: "Yes, a significant percentage of lung cancers occur in non-smokers, often associated with specific genetic alterations like EGFR mutations."
      }
    ],
    quizQuestions: [
      {
        question: "Has biomarker / mutation testing been performed on the biopsy sample?",
        options: ["Yes, EGFR/ALK/PD-L1 reports available", "Biopsy done, molecular tests pending", "Not performed yet"]
      }
    ]
  },
  {
    slug: "head-neck-cancer",
    title: "Head & Neck Cancer",
    subtitle: "Specialized systemic care for oral cavity, throat, and laryngeal cancers.",
    category: "Solid Tumours",
    iconName: "Activity",
    shortDesc: "Multidisciplinary management focusing on tumor control and functional preservation.",
    overview: "Head and neck cancers require precise coordination between surgical oncology, radiation oncology, and medical oncology. Dr. A. K. Dhar focuses on induction chemotherapy, concurrent chemoradiotherapy, and organ-preservation protocols to maintain speech, swallowing, and appearance.",
    keyApproaches: [
      "Organ preservation chemotherapy regimens",
      "Concurrent chemo-radiation therapy",
      "Targeted therapy (Anti-EGFR agents)",
      "Supportive care & nutritional preservation"
    ],
    stagesCovered: ["Oral Cavity Cancers", "Oropharynx & Laryngeal Cancers", "Recurrent / Metastatic Care"],
    heroImage: "/images/blog-diagnosis.png",
    contentImage: "/images/dr-ak-dhar-consultation.png",
    faqs: [
      {
        question: "What is organ preservation in head & neck cancer?",
        answer: "Organ preservation uses chemotherapy and radiation to clear cancer cells without requiring extensive surgical removal of speech or swallowing structures whenever medically appropriate."
      }
    ],
    quizQuestions: [
      {
        question: "What stage of treatment planning are you currently in?",
        options: ["Pre-treatment decision stage", "Post-surgery planning", "Evaluating recurrence / second opinion"]
      }
    ]
  },
  {
    slug: "immunotherapy",
    title: "Cancer Immunotherapy",
    subtitle: "Harnessing the body's natural immune system to identify and destroy cancer cells.",
    category: "Advanced Therapeutics",
    iconName: "Shield",
    shortDesc: "Explore newer therapies and understand where they may fit into your care.",
    overview: "Immunotherapy represents one of the most remarkable breakthroughs in medical oncology. By releasing the immune system's brakes (checkpoint inhibitors), immunotherapy enables T-cells to recognize and eliminate cancer cells. Dr. A. K. Dhar carefully selects candidates for immunotherapy based on PD-L1 Expression, MSI status, and tumor burden.",
    keyApproaches: [
      "PD-1 and PD-L1 immune checkpoint inhibitors",
      "CTLA-4 inhibitor protocols",
      "Microsatellite Instability (MSI-H) testing",
      "Immune-related adverse event (irAE) monitoring"
    ],
    stagesCovered: ["Melanoma & Lung Cancer", "Renal Cell & Bladder Cancers", "MSI-High Solid Tumours"],
    heroImage: "/images/immunotherapy-research.png",
    contentImage: "/images/dr-ak-dhar-consultation.png",
    faqs: [
      {
        question: "How does immunotherapy differ from chemotherapy?",
        answer: "Chemotherapy directly attacks rapidly dividing cells, whereas immunotherapy empowers your immune system to detect and fight cancer cells directly."
      },
      {
        question: "Are there side effects with immunotherapy?",
        answer: "While generally better tolerated than standard chemotherapy, immunotherapy can cause immune-mediated inflammation in organs, which Dr. Dhar closely monitors and manages."
      }
    ],
    quizQuestions: [
      {
        question: "Have you discussed PD-L1 or biomarker testing with your oncologist?",
        options: ["Yes, testing is completed", "No, want to learn if eligible", "Currently on chemotherapy"]
      }
    ]
  },
  {
    slug: "targeted-therapy",
    title: "Targeted Cancer Therapy",
    subtitle: "Precision medicine designed to strike specific genetic vulnerabilities in cancer cells.",
    category: "Advanced Therapeutics",
    iconName: "Target",
    shortDesc: "Precision systemic care targeting cellular genetic markers for minimal toxicity.",
    overview: "Targeted therapy focuses on specific molecular alterations present in cancer cells that drive their growth and spread. Unlike conventional chemotherapy, targeted drugs interfere with specific proteins involved in tumor progression, offering effective disease control with fewer systemic side effects.",
    keyApproaches: [
      "Oral small molecule kinase inhibitors",
      "Monoclonal antibody receptor blockers",
      "Comprehensive Genomic Profiling (CGP) integration",
      "Serial response monitoring & resistance management"
    ],
    stagesCovered: ["EGFR/ALK Positive Lung Cancer", "HER2 Positive Cancers", "BRAF/BRCA Mutated Tumours"],
    heroImage: "/images/targeted-therapy.png",
    contentImage: "/images/dr-ak-dhar-original.jpg",
    faqs: [
      {
        question: "How do I know if targeted therapy is right for my diagnosis?",
        answer: "Targeted therapy relies on genomic tissue or liquid biopsy testing to detect specific gene mutations or alterations."
      },
      {
        question: "Is targeted therapy taken as pills or IV infusions?",
        answer: "It can be both. Many targeted drugs are convenient oral daily pills, while monoclonal antibody targeted drugs are given as periodic IV infusions."
      }
    ],
    quizQuestions: [
      {
        question: "Do you have Genomic / NGS test results available?",
        options: ["Yes, report available", "Biopsy sent for testing", "Need guidance on ordering genomic tests"]
      }
    ]
  }
];

export const BLOGS: BlogPost[] = [
  {
    slug: "understanding-immunotherapy-in-modern-cancer-care",
    title: "Understanding Immunotherapy: A Guide for Patients & Families",
    excerpt: "Discover how immune checkpoint inhibitors work, who is eligible, and what to expect during immunotherapy treatment.",
    category: "Immunotherapy",
    date: "September 15, 2026",
    readTime: "6 min read",
    author: "Dr. (Brig.) A. K. Dhar",
    featuredImage: "/images/immunotherapy-research.png",
    contentImage: "/images/blog-molecular-lab.png",
    introduction: [
      "Immunotherapy has reshaped the landscape of cancer treatment over the past decade. Unlike traditional chemotherapy that directly attacks rapidly dividing cells throughout the body, immunotherapy works by training, empowering, and activating the patient's own immune system to recognize cancer cells as foreign invaders.",
      "At Marengo Asia Hospitals, Gurugram, Dr. (Brig.) A. K. Dhar integrates comprehensive immune checkpoint inhibitor protocols tailored to tumor genetic biomarkers, ensuring patients receive maximum therapeutic benefit with close clinical supervision."
    ],
    sections: [
      {
        heading: "How Immune Checkpoint Inhibitors Work",
        paragraphs: [
          "Cancer cells often evade detection by producing specific surface proteins—such as PD-L1—that bind to PD-1 receptors on cytotoxic T-cells. This interaction acts as a biological 'brake' or 'shield', blinding the immune system and preventing immune-mediated destruction.",
          "Monoclonal antibody drugs known as Immune Checkpoint Inhibitors (such as Pembrolizumab, Nivolumab, or Atezolizumab) block these checkpoint pathways. By removing the immune system's brakes, T-cells are liberated to identify, target, and eliminate malignant cells."
        ]
      },
      {
        heading: "Biomarker Testing & Candidate Selection",
        paragraphs: [
          "Not all cancer types or individuals respond equally to immunotherapy. Selecting suitable candidates requires rigorous diagnostic biomarker testing performed on tissue biopsies or liquid samples.",
          "Key diagnostic indicators evaluated by Dr. Dhar include PD-L1 Tumor Proportion Score (TPS), Microsatellite Instability (MSI-High) status, and Tumor Mutational Burden (TMB). Patients testing positive for these biomarkers often experience durable, long-term responses."
        ]
      },
      {
        heading: "Administration & Supportive Care Management",
        paragraphs: [
          "Immunotherapy infusions are typically administered as outpatient daycare procedures every 2 to 6 weeks. The infusion duration ranges between 30 to 90 minutes.",
          "While immunotherapy is generally better tolerated than standard cytotoxic chemotherapy, immune system activation can occasionally lead to immune-related adverse events (irAEs) affecting organs such as the lungs, liver, or colon. Early identification, patient education, and prompt management with temporary immunosuppressants ensure patient safety."
        ]
      }
    ],
    takeaways: [
      "Immunotherapy empowers your immune system to detect and destroy cancer cells.",
      "Biomarker testing (PD-L1, MSI, TMB) is essential to confirm treatment eligibility.",
      "Routine supportive monitoring ensures early management of immune-related side effects."
    ],
    faqs: [
      {
        question: "How long does an immunotherapy session take?",
        answer: "Most intravenous immunotherapy infusions take between 30 to 90 minutes in an outpatient daycare setting."
      },
      {
        question: "Can immunotherapy be combined with chemotherapy?",
        answer: "Yes, chemo-immunotherapy combinations are frequently used to provide both immediate disease control and long-term immune protection."
      }
    ]
  },
  {
    slug: "navigating-a-new-cancer-diagnosis-first-steps",
    title: "Navigating a New Cancer Diagnosis: Key First Steps",
    excerpt: "Feeling overwhelmed after a diagnosis is natural. Here is a step-by-step checklist to prepare for your oncology consultation.",
    category: "Patient Guide",
    date: "August 28, 2026",
    readTime: "7 min read",
    author: "Dr. (Brig.) A. K. Dhar",
    featuredImage: "/images/blog-diagnosis.png",
    contentImage: "/images/blog-oncology-consultation.png",
    introduction: [
      "Receiving a cancer diagnosis can be an emotional and overwhelming moment for patients and their families. Taking structured, deliberate steps during the first few days helps replace uncertainty with diagnostic clarity and clinical confidence.",
      "Dr. (Brig.) A. K. Dhar recommends establishing an organized approach before your first medical oncology consultation to ensure every question is answered thoroughly."
    ],
    sections: [
      {
        heading: "1. Organize Your Medical & Diagnostic Records",
        paragraphs: [
          "Before your consultation, gather all pathology reports, tissue biopsy blocks/slides, imaging scans (PET-CT, MRI, CT), blood work, and prior surgical summaries in chronological order.",
          "Having complete diagnostic files enables Dr. Dhar to review tumour staging, histological subtypes, and organ function without unnecessary testing delays."
        ]
      },
      {
        heading: "2. Prepare a Written List of Questions",
        paragraphs: [
          "Keep a dedicated notebook or digital file. Note down specific questions regarding stage, treatment goals, chemotherapy or targeted pill options, expected duration, work capability, and side effect management.",
          "Clear questions foster a productive, transparent dialogue between you, your family, and your oncologist."
        ]
      },
      {
        heading: "3. Understand the Role of a Second Opinion",
        paragraphs: [
          "Seeking an expert second opinion is a standard, respected practice in modern oncology. Bringing your slides and PET-CT discs for an independent 35+ year clinical review confirms diagnostic accuracy and offers peace of mind before treatment begins."
        ]
      }
    ],
    takeaways: [
      "Organize pathology reports and PET-CT imaging chronologically.",
      "Write down specific questions about staging, treatment options, and timelines.",
      "Seeking an expert second opinion provides total diagnostic confidence."
    ],
    faqs: [
      {
        question: "Should I start treatment immediately after diagnosis?",
        answer: "In most cases, taking a few days to gather reports, confirm pathology, and complete staging scans is safe and essential for choosing the correct treatment protocol."
      }
    ]
  },
  {
    slug: "advances-in-targeted-therapy-for-lung-cancer",
    title: "Advances in Targeted Therapy for Lung Cancer",
    excerpt: "How molecular mutation testing is enabling non-smokers and lung cancer patients to take personalized targeted therapies.",
    category: "Lung Cancer",
    date: "August 10, 2026",
    readTime: "5 min read",
    author: "Dr. (Brig.) A. K. Dhar",
    featuredImage: "/images/targeted-therapy.png",
    contentImage: "/images/lung-cancer-care.png",
    introduction: [
      "Lung cancer treatment has been revolutionized by Next-Generation Sequencing (NGS) molecular profiling. Today, lung cancer is recognized not as a single disease, but as a spectrum of genetically distinct conditions.",
      "At Marengo Asia Hospitals, Dr. (Brig.) A. K. Dhar utilizes molecular profiling to match actionable genetic mutations with targeted oral treatments that selectively destroy cancer cells while sparing normal lung tissue."
    ],
    sections: [
      {
        heading: "Identifying Actionable Drivers & Genetic Mutations",
        paragraphs: [
          "Through NGS tissue testing or liquid biopsy blood assays, we analyze tumors for driver mutations such as EGFR (Exon 19 del, L858R), ALK rearrangements, ROS1, RET, and MET Exon 14 skipping.",
          "Patients whose tumors harbor these specific alterations can often take daily targeted oral tablets instead of undergoing immediate intravenous chemotherapy."
        ]
      },
      {
        heading: "Efficacy & Quality of Life Benefits",
        paragraphs: [
          "Targeted oral pills (such as EGFR TKIs or ALK inhibitors) deliver high response rates and durable disease control with significantly fewer systemic toxicities than traditional chemotherapy.",
          "Patients taking targeted therapies can frequently maintain their work routines, travel, and daily family activities while managing their disease effectively."
        ]
      }
    ],
    takeaways: [
      "NGS genetic profiling identifies actionable driver mutations in lung cancer.",
      "Targeted oral pills provide effective disease control with reduced systemic toxicity.",
      "Regular response monitoring tracks treatment efficacy over time."
    ],
    faqs: [
      {
        question: "How long do targeted therapy pills remain effective?",
        answer: "Targeted therapies can control disease for many months or years. If resistance develops, secondary genetic testing can guide next-line targeted options."
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Dr. Dhar gave us immense clarity when my mother was diagnosed with breast cancer. He explained every chemotherapy cycle patiently, putting all our anxieties to rest.",
    patientName: "Sunita Sharma",
    condition: "Breast Cancer Caregiver",
    category: "Breast Cancer",
    tag: "Hormone Receptor Protocol",
    location: "Gurugram",
    rating: 5,
    date: "Verified Patient Family",
    outcomeBadge: "Complete Remission",
    treatmentDuration: "6 Months Active Protocol",
    careHighlights: [
      "Hormone receptor tissue profiling done",
      "Customized neoadjuvant chemotherapy regimen",
      "24/7 symptom management support",
      "Preserved patient quality of life"
    ],
    fullStoryTimeline: [
      {
        title: "Initial Diagnosis & Anxiety",
        desc: "Diagnosed with Stage II invasive breast cancer. Family was distressed by confusing recommendations."
      },
      {
        title: "Dr. Dhar Consultation",
        desc: "Dr. Dhar reviewed biopsy reports, conducted biomarker testing, and outlined a step-by-step 6-cycle chemo-hormonal plan."
      },
      {
        title: "Treatment & Monitoring",
        desc: "Each cycle was administered at Marengo Asia Hospital with minimal nausea and proactive supportive medication."
      },
      {
        title: "Remission Status",
        desc: "PET-CT scan confirmed full remission. Currently on long-term preventative hormone maintenance therapy."
      }
    ]
  },
  {
    id: "t2",
    quote: "His 35+ years of experience is visible in every decision. When we came for a second opinion on lymphoma care, his guidance gave us total confidence to proceed with chemo-immunotherapy.",
    patientName: "Rajesh Malhotra",
    condition: "Non-Hodgkin Lymphoma Patient",
    category: "Blood Cancer",
    tag: "Monoclonal Chemo-Immunotherapy",
    location: "New Delhi",
    rating: 5,
    date: "Verified Clinical Review",
    outcomeBadge: "Full Clinical Recovery",
    treatmentDuration: "4 Months Immunotherapy",
    careHighlights: [
      "Comprehensive second opinion review",
      "Monoclonal antibody target therapy",
      "Bone marrow examination cleared",
      "Zero treatment delays"
    ],
    fullStoryTimeline: [
      {
        title: "Confusing Initial Advice",
        desc: "Evaluated at multiple clinics with conflicting staging data for lymph node enlargement."
      },
      {
        title: "Second Opinion with Dr. Dhar",
        desc: "Dr. Dhar re-reviewed flow cytometry and PET-CT, recommending a targeted Rituximab-based chemo-immunotherapy regime."
      },
      {
        title: "Therapy Completion",
        desc: "Tolerated all 6 targeted cycles with close monitoring of blood counts and immunity."
      },
      {
        title: "Outcome",
        desc: "Complete metabolic response achieved on post-treatment PET-CT scan."
      }
    ]
  },
  {
    id: "t3",
    quote: "A truly person-first oncologist. Dr. Dhar listens without rushing. Under his care at Marengo Asia Hospital, immunotherapy transformed my father's lung cancer response remarkably.",
    patientName: "Ananya Gupta",
    condition: "Lung Cancer Patient Family",
    category: "Lung Cancer",
    tag: "PD-1 Checkpoint Inhibitor",
    location: "Gurugram",
    rating: 5,
    date: "Verified Caregiver",
    outcomeBadge: "3+ Yrs Durable Response",
    treatmentDuration: "12 Months Immunotherapy",
    careHighlights: [
      "High PD-L1 biomarker identified",
      "Outpatient 30-min infusion protocol",
      "No traditional chemo hair loss",
      "Maintained active lifestyle"
    ],
    fullStoryTimeline: [
      {
        title: "Stage IV NSCLC Diagnosis",
        desc: "Father presented with persistent cough and shortness of breath; biopsy revealed advanced lung adenocarcinoma."
      },
      {
        title: "Biomarker Breakthrough",
        desc: "Dr. Dhar ordered PD-L1 immunohistochemistry which showed 80% positivity, qualifying him for single-agent Pembrolizumab."
      },
      {
        title: "Immunotherapy Response",
        desc: "Tumor shrunk by 70% within 3 months of outpatient infusions, with excellent energy levels."
      },
      {
        title: "Current Status",
        desc: "Father has completed 2 years of maintenance immunotherapy and enjoys regular morning walks in Gurugram."
      }
    ]
  },
  {
    id: "t4",
    quote: "When we were confused about oral targeted pills versus standard chemotherapy, Dr. Dhar performed NGS genomic profiling and prescribed an EGFR inhibitor. My recovery has been smooth and hopeful.",
    patientName: "Vikramaditya Rao",
    condition: "EGFR Positive NSCLC Patient",
    category: "Lung Cancer",
    tag: "Targeted Oral TKI Therapy",
    location: "Noida",
    rating: 5,
    date: "Verified Clinical Patient",
    outcomeBadge: "Targeted TKI Success",
    treatmentDuration: "Daily Oral Precision Pill",
    careHighlights: [
      "NGS EGFR Exon 19 del targeted",
      "Convenient daily home tablet",
      "No hospital admission needed",
      "Frequent response monitoring"
    ],
    fullStoryTimeline: [
      {
        title: "Unexpected Symptoms",
        desc: "Non-smoker diagnosed with lung lesion after routine chest X-ray."
      },
      {
        title: "Precision NGS Testing",
        desc: "Dr. Dhar advised NGS testing which revealed EGFR Exon 19 deletion before starting any toxic IV therapy."
      },
      {
        title: "Targeted Therapy",
        desc: "Started on third-generation daily oral TKI with zero hair loss or nausea."
      },
      {
        title: "Sustained Control",
        desc: "Complete resolution of primary lung nodule on follow-up imaging."
      }
    ]
  },
  {
    id: "t5",
    quote: "Managing Multiple Myeloma requires deep expertise. Dr. Dhar's clinical precision, supportive medication regimen, and calm reassurance guided our family through every remission check.",
    patientName: "Harpreet Kaur",
    condition: "Multiple Myeloma Patient Family",
    category: "Blood Cancer",
    tag: "Remission Management",
    location: "Delhi NCR",
    rating: 5,
    date: "Verified Family Review",
    outcomeBadge: "Stable Remission",
    treatmentDuration: "Targeted Maintenance",
    careHighlights: [
      "Monoclonal protein monitoring",
      "Bone protection therapy integration",
      "Comprehensive supportive care",
      "Compassionate family counseling"
    ],
    fullStoryTimeline: [
      {
        title: "Bone Pain & Fatigue",
        desc: "Diagnosed with plasma cell disorder after severe back pain and elevated serum protein."
      },
      {
        title: "Tailored Myeloma Protocol",
        desc: "Dr. Dhar initiated a targeted triple-agent induction protocol alongside bone-strengthening therapy."
      },
      {
        title: "Monoclonal Remission",
        desc: "Serum free light chains normalized within 4 cycles with complete resolution of bone discomfort."
      },
      {
        title: "Ongoing Maintenance",
        desc: "Enjoys excellent functional status on low-dose maintenance care."
      }
    ]
  }
];

export const GENERAL_FAQS: FAQItem[] = [
  {
    question: "What should I bring for my first consultation?",
    answer: "Please bring all your recent medical records including biopsy reports, blood test results, CT/MRI/PET scans, previous treatment summaries, and current medication lists."
  },
  {
    question: "Do I need a prior referral to see Dr. Dhar?",
    answer: "No, you can schedule a direct consultation. However, if you have a referral letter or preliminary scan reports, sharing them beforehand helps us prepare thoroughly."
  },
  {
    question: "How do I request a second opinion on a cancer treatment plan?",
    answer: "You can book a second opinion appointment online or via phone (+91 98108 18266). Bring all original pathology slides, block reports, and imaging discs for a comprehensive review."
  },
  {
    question: "Where does Dr. Dhar conduct clinical consultations?",
    answer: "Dr. (Brig.) A. K. Dhar consults as Clinical Director & Head of Medical Oncology at Marengo Asia Hospitals, Sector 56, Gurugram."
  },
  {
    question: "What treatments are administered under Dr. Dhar's supervision?",
    answer: "Services include targeted cancer therapy, immunotherapy, systemic chemotherapy, hormonal therapy, chemo-immunotherapy, and long-term cancer survivorship monitoring."
  }
];
