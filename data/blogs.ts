export type BlogSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  dateLabel: string;
  readTime: string;
  image: string;
  imageAlt: string;
  intro: string;
  sections: BlogSection[];
  takeaway: string;
  faqs: [string, string][];
};

export const blogs: BlogPost[] = [
  {
    slug: "chemotherapy-vs-immunotherapy",
    title: "Chemotherapy vs immunotherapy: which cancer treatment is right for you?",
    excerpt:
      "A cancer diagnosis often brings a difficult question for patients and families: which treatment is right? Here is how chemotherapy and immunotherapy differ — and how doctors choose between them.",
    category: "Treatment guidance",
    date: "2026-09-03",
    dateLabel: "3 Sep 2026",
    readTime: "6 min read",
    image: "/images/treatments/immunotherapy.jpg",
    imageAlt: "Modern cancer treatment planning and medical science",
    intro:
      "A cancer diagnosis often brings a difficult question for patients and families: which treatment is right for you? Chemotherapy and immunotherapy are two of the most discussed options — and they work in very different ways.",
    sections: [
      {
        id: "chemotherapy",
        heading: "How chemotherapy works",
        paragraphs: [
          "Chemotherapy uses medicines that target rapidly dividing cells. It has been a foundation of cancer care for decades and remains essential for many solid tumours and blood cancers.",
          "Because it affects dividing cells more broadly, side effects can include fatigue, hair loss, nausea, and low blood counts. Supportive care helps manage these effects, and many people continue daily life with adjustments during treatment cycles.",
        ],
      },
      {
        id: "immunotherapy",
        heading: "How immunotherapy works",
        paragraphs: [
          "Immunotherapy helps the immune system recognise and attack cancer cells. Checkpoint inhibitors are the most widely used class in solid tumours.",
          "Not every cancer responds. Benefit depends on tumour type, biomarkers such as PD-L1 or MSI status, prior treatment, and overall health. Side effects are often different from chemotherapy and may involve inflammation in the skin, gut, lungs, or endocrine glands.",
        ],
      },
      {
        id: "how-doctors-choose",
        heading: "How doctors choose",
        paragraphs: [
          "The choice is rarely chemotherapy or immunotherapy in isolation. Guidelines, pathology, stage, biomarkers, and your fitness all shape the plan. Sometimes both are combined. Sometimes one is clearly better as a first step.",
        ],
        bullets: [
          "Confirm the exact cancer type and stage",
          "Review biomarker and molecular reports when available",
          "Weigh expected benefit against side-effect profiles",
          "Consider prior treatments and other health conditions",
          "Discuss goals — cure, control, or symptom relief — openly",
        ],
      },
      {
        id: "questions-to-ask",
        heading: "Questions worth asking",
        paragraphs: [
          "Bring your reports to the consultation and ask what each option is trying to achieve. Understanding why a plan was chosen often reduces anxiety more than memorising drug names.",
        ],
        bullets: [
          "Is immunotherapy approved for my cancer and stage?",
          "Do my reports show biomarkers that change the recommendation?",
          "What side effects should I report immediately?",
          "How will we know if the treatment is working?",
        ],
      },
    ],
    takeaway:
      "There is no universal “better” treatment — only the better fit for your diagnosis. A clear review of reports with an experienced medical oncologist is the surest way to choose with confidence.",
    faqs: [
      [
        "Is immunotherapy stronger than chemotherapy?",
        "Not always. For some cancers and biomarkers it can work better or longer; for others chemotherapy remains the better first step. The comparison is case-specific.",
      ],
      [
        "Can both treatments be used together?",
        "Yes. In several cancers, chemo-immunotherapy combinations are standard. Your oncologist will explain whether a combination fits your stage and pathology.",
      ],
      [
        "How are side effects different?",
        "Chemotherapy more often causes hair loss, low counts, and nausea. Immunotherapy more often causes inflammatory side effects affecting skin, gut, lungs, thyroid, or other organs.",
      ],
      [
        "Do I need biomarker tests before deciding?",
        "Often yes for immunotherapy and targeted options. PD-L1, MSI status, and molecular panels can change which pathway is recommended first.",
      ],
    ],
  },
  {
    slug: "finding-the-right-cancer-specialist",
    title: "Finding the right cancer specialist: what patients should look for",
    excerpt:
      "A cancer diagnosis can bring uncertainty. One of the first questions families ask is how to choose the right oncologist — and what experience, clarity, and support should look like.",
    category: "Patient guidance",
    date: "2026-08-29",
    dateLabel: "29 Aug 2026",
    readTime: "5 min read",
    image: "/images/treatments/breast-cancer.jpg",
    imageAlt: "Doctor discussing care options with a patient",
    intro:
      "A cancer diagnosis can change a person’s life within days. Patients and families often wonder where to begin — and how to choose a specialist they can trust with complex decisions.",
    sections: [
      {
        id: "experience",
        heading: "Experience that matches your diagnosis",
        paragraphs: [
          "Medical oncology covers many cancer types. Look for a doctor with deep experience in your condition — whether breast, lung, blood cancers, or another pathway — and comfort explaining both standard and newer options.",
          "Years in practice matter, but so does ongoing engagement with current evidence: targeted therapy, immunotherapy, and evolving staging guidelines.",
        ],
      },
      {
        id: "clarity",
        heading: "Clarity over jargon",
        paragraphs: [
          "The best consultations leave you understanding the diagnosis, the choices, and the next step. You should feel able to ask about side effects, timing, second opinions, and what happens if the first plan needs to change.",
        ],
        bullets: [
          "Reports explained in plain language",
          "A sequenced plan — not only a list of drugs",
          "Room for family questions",
          "Honest discussion of uncertainty when it exists",
        ],
      },
      {
        id: "support",
        heading: "Support beyond the prescription",
        paragraphs: [
          "Cancer care is also about access: appointment coordination, managing side effects, and knowing when to call. A clinic team that responds clearly can make intensive treatment feel more manageable.",
          "At Marengo Asia Hospitals, Gurugram, Dr. (Brig.) A. K. Dhar focuses on evidence-led medical oncology with calm, structured guidance for patients and families across Delhi NCR.",
        ],
      },
    ],
    takeaway:
      "Choose an oncologist who combines clinical depth with clear communication. Confidence in the relationship is part of good cancer care — not a luxury.",
    faqs: [
      [
        "Should I choose a specialist based on hospital brand alone?",
        "Hospital infrastructure matters, but so does the oncologist’s experience with your cancer type and their ability to explain options clearly. Look at both.",
      ],
      [
        "Is it okay to change doctors after starting treatment?",
        "Yes, if you need clearer guidance or a different approach. Bring full treatment records so the new team can review safely.",
      ],
      [
        "What should I prepare for the first visit?",
        "Pathology, imaging, prior prescriptions, a medicine list, and your top questions. A family member can help take notes.",
      ],
      [
        "When should I ask about a second opinion?",
        "Before major decisions — surgery, starting systemic therapy, or when two plans conflict. Most oncologists support informed review.",
      ],
    ],
  },
  {
    slug: "when-to-seek-a-second-opinion",
    title: "When to seek a second opinion in cancer care",
    excerpt:
      "A second opinion is not about distrust — it is about clarity. Here is when another review of your reports and plan can help you move forward with more confidence.",
    category: "Second opinions",
    date: "2026-09-07",
    dateLabel: "7 Sep 2026",
    readTime: "5 min read",
    image: "/images/treatments/targeted-therapy.jpg",
    imageAlt: "Precision oncology and careful review of cancer reports",
    intro:
      "Many families hesitate to ask for a second opinion, worrying it might offend their doctor. In oncology, another careful review of reports is common — and often helpful — especially before major treatment decisions.",
    sections: [
      {
        id: "when-it-helps",
        heading: "Situations where a second look helps",
        paragraphs: [
          "You do not need a crisis to seek another view. Second opinions are most useful when the stakes are high or the path forward feels unclear.",
        ],
        bullets: [
          "A new diagnosis and you want the plan confirmed",
          "Surgery, chemotherapy, or immunotherapy has been recommended and you want alternatives explained",
          "Two doctors have suggested different approaches",
          "The cancer is rare, advanced, or molecularly complex",
          "Treatment is not working as expected and options feel limited",
        ],
      },
      {
        id: "what-to-bring",
        heading: "What to bring",
        paragraphs: [
          "A useful second opinion depends on complete information. Incomplete files lead to incomplete advice.",
        ],
        bullets: [
          "Biopsy and pathology reports",
          "Imaging CDs or written radiology reports",
          "Molecular / biomarker results if done",
          "A list of current medicines and prior treatments",
          "Your main questions written down",
        ],
      },
      {
        id: "what-you-gain",
        heading: "What a good review provides",
        paragraphs: [
          "The goal is not always a different plan. Sometimes it confirms the original recommendation — which can be deeply reassuring. Other times it opens a targeted therapy, trial discussion, or sequencing change you had not considered.",
          "Either outcome is valuable if you leave with clearer reasoning and a next step you understand.",
        ],
      },
    ],
    takeaway:
      "Seeking a second opinion is a form of informed care. Bring full reports, ask direct questions, and use the conversation to choose the path that fits your diagnosis and values.",
    faqs: [
      [
        "Will asking for a second opinion upset my current doctor?",
        "Most oncologists expect and support second opinions for major decisions. Framed as wanting clarity, it is a normal part of careful care.",
      ],
      [
        "Does a second opinion always change the plan?",
        "No. Confirmation of the original plan is common and useful. Change happens when new options, sequencing, or biomarkers were not fully considered.",
      ],
      [
        "How quickly should I get one?",
        "Before irreversible steps when possible — especially major surgery or starting a long systemic course. Urgent situations may need treatment first.",
      ],
      [
        "Can I get a second opinion with incomplete reports?",
        "You can start the conversation, but decisions are safer with full pathology, imaging, and prior treatment details. Bring everything you have.",
      ],
    ],
  },
];

export function getBlog(slug: string) {
  return blogs.find((item) => item.slug === slug);
}

export function getBlogSlugs() {
  return blogs.map((item) => item.slug);
}
