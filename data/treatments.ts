export type Treatment = {
  slug: string;
  title: string;
  shortTitle: string;
  readTime: string;
  headline: string;
  headlineAccent: string;
  summary: string;
  cardText: string;
  image: string;
  imageAlt: string;
  overview: { title: string; paragraphs: string[] };
  symptoms: { title: string; intro?: string; items: string[]; note?: string };
  whenToConsult: { title: string; items: string[] };
  diagnosis: { title: string; intro?: string; items: string[] };
  checklist: { title: string; subtitle: string; items: string[] };
  approach: { title: string; intro: string; options: { title: string; detail: string }[] };
  journey: { title: string; steps: { label: string; title: string; detail: string }[] };
  timeline: { before: string[]; during: string[]; after: string[] };
  faqs: [string, string][];
};

export const treatments: Treatment[] = [
  {
    slug: "breast-cancer",
    title: "Breast cancer",
    shortTitle: "Breast cancer",
    readTime: "7 min read",
    headline: "Breast cancer care:",
    headlineAccent: "clarity from diagnosis to ongoing support",
    summary:
      "Breast cancer treatment depends on the type of tumour, stage, hormone and HER2 status, and your overall health. Dr. (Brig.) A. K. Dhar helps you understand reports, compare options, and plan systemic care with calm, clear guidance.",
    cardText: "Thoughtful, evidence-based care across diagnosis and systemic treatment — explained at your pace.",
    image: "/images/treatments/breast-cancer.jpg",
    imageAlt: "Doctor discussing breast cancer care options with a patient",
    overview: {
      title: "What is breast cancer?",
      paragraphs: [
        "Breast cancer occurs when cells in the breast grow abnormally and form a tumour. It can affect both women and men, though it is far more common in women. Most cases begin in the milk ducts (ductal carcinoma) or milk-producing glands (lobular carcinoma).",
        "Care is personalised. Hormone receptor status, HER2 status, staging, and your preferences all shape whether surgery, chemotherapy, hormone therapy, targeted therapy, immunotherapy, or a combination is recommended.",
        "The goal is not only tumour control — it is a plan you understand, with support for side effects, follow-up, and questions that arise along the way.",
      ],
    },
    symptoms: {
      title: "Common signs and symptoms",
      intro: "Not every lump is cancer, but any new change deserves review.",
      items: [
        "A lump in the breast or underarm",
        "Change in breast size or shape",
        "Nipple discharge, especially if bloody",
        "Nipple turning inward",
        "Skin changes such as redness or dimpling",
        "Persistent breast pain that does not settle",
      ],
      note: "Screening mammograms can find cancers before symptoms appear. Discuss screening timing with your doctor based on age and risk.",
    },
    whenToConsult: {
      title: "When to seek oncology review",
      items: [
        "A new breast lump, nipple change, or skin change",
        "An abnormal mammogram, ultrasound, or biopsy report",
        "A confirmed diagnosis and you want a clear treatment plan",
        "You need a second opinion before surgery or systemic therapy",
        "Treatment has started and you have questions about response or side effects",
      ],
    },
    diagnosis: {
      title: "How breast cancer is assessed",
      intro: "Diagnosis usually combines clinical exam with imaging and biopsy.",
      items: [
        "Clinical breast examination",
        "Mammography and ultrasound",
        "Biopsy to confirm cancer type",
        "Hormone receptor and HER2 testing on the tumour",
        "MRI in selected cases",
        "Staging scans when needed to understand extent of disease",
      ],
    },
    checklist: {
      title: "Does this apply to you?",
      subtitle: "This checklist helps organise your concerns. It does not replace a consultation.",
      items: [
        "I have a new breast lump or imaging abnormality",
        "I have a biopsy-confirmed breast cancer diagnosis",
        "I want to understand hormone therapy, chemo, or targeted options",
        "I am seeking a second opinion on a recommended plan",
        "I need support with side effects or next-step decisions",
      ],
    },
    approach: {
      title: "Treatment pathways we discuss",
      intro: "Options depend on stage, biology, and your goals. Many people receive more than one modality over time.",
      options: [
        {
          title: "Surgery coordination",
          detail: "Lumpectomy or mastectomy plans are reviewed alongside systemic therapy timing — before or after surgery when needed.",
        },
        {
          title: "Chemotherapy",
          detail: "Used when cancer biology or stage suggests benefit, with clear explanation of schedule, side effects, and supportive care.",
        },
        {
          title: "Hormone therapy",
          detail: "For hormone-receptor-positive disease — oral or injectable options that reduce recurrence risk over years.",
        },
        {
          title: "Targeted therapy & immunotherapy",
          detail: "HER2-directed drugs and selected immunotherapy where evidence supports their use for your tumour type.",
        },
      ],
    },
    journey: {
      title: "How care typically unfolds",
      steps: [
        {
          label: "01",
          title: "Report review",
          detail: "Pathology, imaging, and prior opinions are reviewed so the conversation starts with clear facts.",
        },
        {
          label: "02",
          title: "Diagnosis clarity",
          detail: "Type, stage, and receptor status are explained in plain language — what they mean for options.",
        },
        {
          label: "03",
          title: "Treatment plan",
          detail: "A sequenced plan is outlined: surgery timing, systemic therapy, and what to expect week by week.",
        },
        {
          label: "04",
          title: "Ongoing support",
          detail: "Side effects, response checks, and family questions are addressed as treatment continues.",
        },
      ],
    },
    timeline: {
      before: [
        "Bring mammogram, ultrasound, MRI, and biopsy reports",
        "Share family history and current medicines",
        "Note symptoms, prior surgeries, and fertility concerns if relevant",
        "Write down the questions you most need answered",
      ],
      during: [
        "Understand each drug or therapy and why it was chosen",
        "Report side effects early — many can be managed promptly",
        "Keep follow-up blood tests and imaging as planned",
        "Ask about work, travel, and daily-life adjustments",
      ],
      after: [
        "Know the follow-up schedule for exams and imaging",
        "Discuss long-term hormone therapy if prescribed",
        "Watch for new symptoms and report them without delay",
        "Ask about rehabilitation, bone health, and wellness support",
      ],
    },
    faqs: [
      [
        "Is every breast lump cancer?",
        "No. Many lumps are benign. Imaging and, when needed, biopsy clarify the cause. Any new lump should still be checked promptly.",
      ],
      [
        "Do I always need chemotherapy?",
        "Not always. Decisions depend on stage, tumour biology, lymph node status, and genomic tests in selected cases. Some patients do well with surgery and hormone therapy alone.",
      ],
      [
        "What is HER2-positive breast cancer?",
        "HER2-positive tumours overexpress a protein that can drive growth. Targeted HER2 therapies are often part of treatment and have improved outcomes significantly.",
      ],
      [
        "Can men get breast cancer?",
        "Yes, though it is uncommon. Men with a breast lump, nipple change, or family history should seek the same careful evaluation.",
      ],
      [
        "When should I ask for a second opinion?",
        "Whenever you want more confidence before major decisions — after diagnosis, before surgery, or when comparing systemic options. Bringing full reports helps the review.",
      ],
    ],
  },
  {
    slug: "blood-cancer",
    title: "Blood cancer",
    shortTitle: "Blood cancer",
    readTime: "7 min read",
    headline: "Blood cancer care:",
    headlineAccent: "lymphoma, myeloma, and leukaemia pathways",
    summary:
      "Blood cancers affect the blood, bone marrow, or lymphatic system. Dr. Dhar reviews blood counts, pathology, and staging to guide personalised treatment for lymphoma, leukaemia, and multiple myeloma.",
    cardText: "Personalised planning for lymphoma, myeloma and leukaemia, with clear next steps at every stage.",
    image: "/images/treatments/blood-cancer.jpg",
    imageAlt: "Laboratory research supporting blood cancer care",
    overview: {
      title: "What are blood cancers?",
      paragraphs: [
        "Blood cancers include leukaemias, lymphomas, and multiple myeloma. They begin in blood-forming cells or immune cells and can present with fatigue, infections, swollen nodes, bone pain, or abnormal blood counts.",
        "Treatment may involve chemotherapy, targeted therapy, immunotherapy, steroids, or combinations — chosen based on exact subtype, genetics, and how aggressive the disease is.",
        "Clear communication matters. These diagnoses move quickly, and families need to understand urgency, options, and what the next few weeks will look like.",
      ],
    },
    symptoms: {
      title: "Symptoms that may appear",
      items: [
        "Persistent fatigue or unexplained weakness",
        "Frequent or unusual infections",
        "Easy bruising or bleeding",
        "Swollen lymph nodes in the neck, armpit, or groin",
        "Night sweats, unexplained fever, or weight loss",
        "Bone pain or anaemia-related symptoms",
      ],
      note: "Symptoms overlap with many non-cancer conditions. Abnormal blood reports or persistent symptoms deserve specialist review.",
    },
    whenToConsult: {
      title: "When to consult",
      items: [
        "Abnormal CBC, peripheral smear, or bone marrow report",
        "Suspected or confirmed lymphoma, leukaemia, or myeloma",
        "Rapidly enlarging nodes or constitutional symptoms",
        "Need for a second opinion on an induction or relapse plan",
        "Questions about targeted therapy or immunotherapy options",
      ],
    },
    diagnosis: {
      title: "Diagnosis and work-up",
      items: [
        "Complete blood count and peripheral smear",
        "Lymph node or bone marrow biopsy when indicated",
        "Flow cytometry and immunohistochemistry",
        "Cytogenetics and molecular tests for subtype",
        "PET-CT or CT staging for lymphomas",
        "Protein electrophoresis and light-chain tests for myeloma",
      ],
    },
    checklist: {
      title: "Does this apply to you?",
      subtitle: "Use this to prepare for your visit — not as a self-diagnosis.",
      items: [
        "My blood counts or smear are abnormal",
        "I have a biopsy suggesting lymphoma or leukaemia",
        "I have myeloma or a related plasma-cell disorder",
        "I need clarity on chemotherapy or targeted options",
        "I want a second opinion before starting treatment",
      ],
    },
    approach: {
      title: "Treatment approaches",
      intro: "Plans are subtype-specific. The right protocol depends on pathology, genetics, age, and fitness.",
      options: [
        {
          title: "Lymphoma pathways",
          detail: "Chemo-immunotherapy regimens tailored to Hodgkin and non-Hodgkin subtypes, with PET-guided decisions when appropriate.",
        },
        {
          title: "Leukaemia care",
          detail: "Induction and consolidation strategies guided by lineage, genetics, and measurable residual disease when available.",
        },
        {
          title: "Myeloma treatment",
          detail: "Combinations of proteasome inhibitors, immunomodulatory drugs, antibodies, and steroids based on disease burden.",
        },
        {
          title: "Supportive care",
          detail: "Infection prevention, transfusion support, growth factors, and symptom management alongside active therapy.",
        },
      ],
    },
    journey: {
      title: "Care, step by step",
      steps: [
        { label: "01", title: "Urgent clarity", detail: "Reports are reviewed to confirm subtype and decide how quickly treatment should start." },
        { label: "02", title: "Staging & fitness", detail: "Imaging, labs, and organ function guide regimen choice and supportive needs." },
        { label: "03", title: "Active treatment", detail: "Cycles are planned with clear expectations for side effects and response checks." },
        { label: "04", title: "Follow-through", detail: "Maintenance, surveillance, or next-line options are discussed as the course evolves." },
      ],
    },
    timeline: {
      before: [
        "Bring CBC, smear, biopsy, and imaging CDs or reports",
        "List infections, fevers, and bleeding episodes",
        "Share comorbidities and current medicines",
        "Ask who in the family should join key discussions",
      ],
      during: [
        "Know fever rules — when to seek emergency care",
        "Complete labs before each cycle as advised",
        "Report neuropathy, mucositis, or unusual bruising early",
        "Keep hydration and nutrition plans realistic",
      ],
      after: [
        "Follow the surveillance schedule for blood work and scans",
        "Understand signs of relapse to report promptly",
        "Discuss vaccines and infection precautions when appropriate",
        "Ask about long-term effects and recovery support",
      ],
    },
    faqs: [
      [
        "What is the difference between lymphoma and leukaemia?",
        "Lymphomas usually start in lymph nodes or lymphoid tissue. Leukaemias typically arise in the bone marrow and circulate in the blood. Exact subtype determines treatment.",
      ],
      [
        "How quickly do I need to start treatment?",
        "Some blood cancers need treatment within days; others allow more time for staging. Urgency is based on subtype, blood counts, and symptoms — your oncologist will explain the timeline.",
      ],
      [
        "Will I need a bone marrow transplant?",
        "Not always. Transplant is considered for selected high-risk or relapsed cases. Many patients are treated effectively with chemotherapy, targeted drugs, and immunotherapy alone.",
      ],
      [
        "Can blood cancers be cured?",
        "Many lymphomas and some leukaemias are curable. Myeloma is often highly controllable as a chronic disease. Outcomes depend on subtype, genetics, and response to therapy.",
      ],
    ],
  },
  {
    slug: "lung-cancer",
    title: "Lung cancer",
    shortTitle: "Lung cancer",
    readTime: "8 min read",
    headline: "Lung cancer care:",
    headlineAccent: "from staging to systemic therapy",
    summary:
      "Lung cancer care depends on whether the tumour is non-small cell or small cell, its stage, and molecular markers. Dr. Dhar helps interpret CT and biopsy findings and plan chemotherapy, targeted therapy, or immunotherapy.",
    cardText: "A multidisciplinary approach connecting testing, treatment and ongoing support for lung cancer care.",
    image: "/images/treatments/lung-cancer.jpg",
    imageAlt: "Medical professional reviewing lung health imaging",
    overview: {
      title: "What is lung cancer?",
      paragraphs: [
        "Lung cancer develops in the tissues of the lungs and is often linked to smoking, air pollution, or occupational exposures — though non-smokers can develop it too.",
        "Broadly, cancers are grouped as non-small cell lung cancer (NSCLC) or small cell lung cancer (SCLC). Molecular testing in NSCLC can reveal targets for precision drugs.",
        "Early staging and biomarker testing change options. The right plan may combine local therapy with systemic treatment, or focus on immunotherapy and targeted agents.",
      ],
    },
    symptoms: {
      title: "Symptoms to notice",
      items: [
        "Persistent cough or change in a chronic cough",
        "Shortness of breath or wheezing",
        "Chest pain that does not settle",
        "Coughing up blood",
        "Unexplained weight loss or fatigue",
        "Recurrent chest infections",
      ],
      note: "Some lung cancers are found on CT scans done for other reasons, before symptoms appear.",
    },
    whenToConsult: {
      title: "When to seek review",
      items: [
        "A lung mass or nodule on CT that needs oncology input",
        "Biopsy-confirmed lung cancer of any stage",
        "Interest in molecular testing or immunotherapy options",
        "Second opinion on chemo, targeted therapy, or combined plans",
        "Progressive symptoms during or after treatment",
      ],
    },
    diagnosis: {
      title: "Diagnosis and staging",
      items: [
        "Contrast CT chest and staging imaging",
        "PET-CT when staging decisions require it",
        "Biopsy via bronchoscopy, CT guidance, or surgery",
        "Histopathology to confirm NSCLC vs SCLC",
        "Molecular and PD-L1 testing in appropriate NSCLC cases",
        "Brain imaging when clinically indicated",
      ],
    },
    checklist: {
      title: "Does this apply to you?",
      subtitle: "Helpful prompts before your appointment.",
      items: [
        "I have a CT or PET report showing a lung lesion",
        "I have a confirmed lung cancer diagnosis",
        "I want to know if targeted therapy or immunotherapy fits",
        "I need a second opinion on my current plan",
        "I am managing side effects or treatment response questions",
      ],
    },
    approach: {
      title: "Treatment options",
      intro: "Stage, histology, and biomarkers guide whether care is curative-intent, combined modality, or systemic-focused.",
      options: [
        {
          title: "Systemic chemotherapy",
          detail: "Used alone or with other modalities, especially when disease is advanced or biomarkers do not favour a targeted drug first.",
        },
        {
          title: "Targeted therapy",
          detail: "Oral or IV agents for tumours with EGFR, ALK, ROS1, and other actionable alterations when testing confirms them.",
        },
        {
          title: "Immunotherapy",
          detail: "Checkpoint inhibitors alone or with chemotherapy for selected NSCLC and SCLC settings based on guidelines and PD-L1 status.",
        },
        {
          title: "Multidisciplinary coordination",
          detail: "Surgery and radiation decisions are coordinated with pulmonology, thoracic surgery, and radiation oncology when needed.",
        },
      ],
    },
    journey: {
      title: "A typical care path",
      steps: [
        { label: "01", title: "Imaging & biopsy", detail: "Confirm the diagnosis and gather tissue for molecular tests whenever feasible." },
        { label: "02", title: "Staging & markers", detail: "Understand extent of disease and which drugs are most likely to help." },
        { label: "03", title: "Treatment choice", detail: "Build a plan that balances efficacy, side effects, and your day-to-day life." },
        { label: "04", title: "Monitoring", detail: "Scans and clinics track response; plans adapt if the cancer changes." },
      ],
    },
    timeline: {
      before: [
        "Bring CT, PET, biopsy, and any molecular reports",
        "Share smoking history and occupational exposures",
        "List breathing symptoms and prior lung disease",
        "Ask whether more tissue is needed for biomarker testing",
      ],
      during: [
        "Report breathlessness, fever, or chest pain promptly",
        "Understand scan intervals and what “response” means",
        "Manage appetite, energy, and medication schedules",
        "Discuss clinical trial options when relevant",
      ],
      after: [
        "Keep surveillance imaging as recommended",
        "Know which symptoms need urgent attention",
        "Ask about pulmonary rehab and supportive care",
        "Review next-line options if disease progresses",
      ],
    },
    faqs: [
      [
        "Do only smokers get lung cancer?",
        "No. Smoking is the leading risk factor, but never-smokers can develop lung cancer due to pollution, genetics, radon, or other exposures.",
      ],
      [
        "Why is molecular testing important?",
        "In NSCLC, finding an actionable mutation can open oral targeted therapies that may work better and feel different from standard chemotherapy.",
      ],
      [
        "Is immunotherapy right for everyone?",
        "No. Benefit depends on histology, PD-L1, stage, and prior treatment. Your oncologist will explain whether it fits your case.",
      ],
      [
        "Can lung cancer be treated without surgery?",
        "Yes. Many patients are treated with systemic therapy, radiation, or combinations — especially when surgery is not suitable or disease is advanced.",
      ],
    ],
  },
  {
    slug: "head-neck-cancer",
    title: "Head & neck cancer",
    shortTitle: "Head & neck cancer",
    readTime: "7 min read",
    headline: "Head & neck cancer:",
    headlineAccent: "treatment that respects function and voice",
    summary:
      "Cancers of the mouth, throat, voice box, and neck need careful planning so treatment controls disease while protecting speech, swallowing, and appearance. Dr. Dhar guides systemic therapy within a multidisciplinary plan.",
    cardText: "Care for head and neck cancers with a plan that balances treatment goals and quality of life.",
    image: "/images/treatments/head-neck-cancer.jpg",
    imageAlt: "Specialist reviewing head and neck care options",
    overview: {
      title: "What are head and neck cancers?",
      paragraphs: [
        "These cancers arise in the oral cavity, oropharynx, larynx, hypopharynx, nasal cavity, and related structures. Tobacco, alcohol, and HPV infection are major risk factors for many subtypes.",
        "Treatment often combines surgery, radiation, and systemic therapy. Chemotherapy and immunotherapy may be used before, during, or after local therapy depending on stage.",
        "Quality of life is central — preserving speech, swallowing, and nutrition is part of every serious treatment discussion.",
      ],
    },
    symptoms: {
      title: "Warning signs",
      items: [
        "A mouth ulcer or sore that does not heal",
        "Persistent sore throat or ear pain",
        "Difficulty swallowing or a feeling of something stuck",
        "Hoarseness lasting more than two weeks",
        "A neck lump",
        "Unexplained weight loss or oral bleeding",
      ],
    },
    whenToConsult: {
      title: "When to consult",
      items: [
        "Biopsy-proven cancer of the mouth, throat, or larynx",
        "A neck node with unknown primary under evaluation",
        "Planning chemotherapy with radiation (chemoradiation)",
        "Recurrent or metastatic disease needing systemic options",
        "Second opinion on induction therapy or immunotherapy",
      ],
    },
    diagnosis: {
      title: "Evaluation",
      items: [
        "Clinical examination of the oral cavity and neck",
        "Endoscopy / laryngoscopy as needed",
        "Biopsy of the primary site or node",
        "HPV testing for relevant oropharyngeal cancers",
        "CT, MRI, or PET-CT for staging",
        "Dental and nutrition assessment before intensive therapy",
      ],
    },
    checklist: {
      title: "Does this apply to you?",
      subtitle: "Prepare your questions with this short list.",
      items: [
        "I have a non-healing oral lesion or neck lump",
        "I have a confirmed head and neck cancer diagnosis",
        "Chemoradiation or induction therapy has been suggested",
        "I want help managing nutrition and side effects",
        "I need a second opinion on systemic options",
      ],
    },
    approach: {
      title: "How we approach treatment",
      intro: "Plans are built with ENT/head-neck surgery and radiation oncology so local control and systemic care work together.",
      options: [
        {
          title: "Concurrent chemoradiation",
          detail: "Chemotherapy given with radiation for organ preservation or high-risk disease, with close toxicity support.",
        },
        {
          title: "Induction / neoadjuvant therapy",
          detail: "Systemic therapy before local treatment in selected locally advanced cases to shrink disease.",
        },
        {
          title: "Immunotherapy",
          detail: "Checkpoint inhibitors for recurrent or metastatic disease when guidelines and fitness support their use.",
        },
        {
          title: "Supportive oncology",
          detail: "Feeding plans, pain control, oral care, and rehabilitation to protect function through treatment.",
        },
      ],
    },
    journey: {
      title: "Care sequence",
      steps: [
        { label: "01", title: "Map the disease", detail: "Confirm site, stage, HPV status, and resectability with the surgical team." },
        { label: "02", title: "Choose modality", detail: "Decide surgery-first, radiation-based, or induction approaches with your goals in mind." },
        { label: "03", title: "Deliver therapy", detail: "Systemic therapy is timed with radiation or surgery and side effects are managed actively." },
        { label: "04", title: "Recover & watch", detail: "Swallow therapy, surveillance exams, and long-term neck/oral health continue after treatment." },
      ],
    },
    timeline: {
      before: [
        "Bring biopsy, HPV/p16 reports, and imaging",
        "Share tobacco, alcohol, and prior cancer history",
        "Complete dental clearance if radiation is planned",
        "Discuss nutrition — feeding tubes are planned early when needed",
      ],
      during: [
        "Report mucositis, weight loss, or breathing changes early",
        "Keep hydration and oral care routines consistent",
        "Attend speech/swallow sessions as recommended",
        "Know emergency signs: airway trouble, bleeding, high fever",
      ],
      after: [
        "Follow neck and primary-site surveillance schedules",
        "Continue dental and thyroid monitoring after radiation",
        "Ask about return-to-work and voice rehabilitation",
        "Report new lumps, pain, or swallowing decline promptly",
      ],
    },
    faqs: [
      [
        "Is HPV-related throat cancer different?",
        "HPV-positive oropharyngeal cancers often have a different outlook and may follow distinct treatment pathways. Testing helps personalise care.",
      ],
      [
        "Will I lose my voice or ability to swallow?",
        "Risk depends on tumour location and treatment intensity. The team plans therapy and rehabilitation to protect function whenever possible.",
      ],
      [
        "Why is dental care important before radiation?",
        "Radiation can affect saliva and jaw bone. Treating dental issues first reduces serious complications later.",
      ],
      [
        "When is immunotherapy used?",
        "Most often for recurrent or metastatic disease, and in selected other settings based on current evidence and your fitness.",
      ],
    ],
  },
  {
    slug: "immunotherapy",
    title: "Immunotherapy",
    shortTitle: "Immunotherapy",
    readTime: "6 min read",
    headline: "Immunotherapy:",
    headlineAccent: "helping your immune system recognise cancer",
    summary:
      "Immunotherapy uses medicines that help the immune system find and attack cancer cells. Dr. Dhar explains when checkpoint inhibitors and related approaches may fit your diagnosis — and when they may not.",
    cardText: "Explore immune-based therapies and understand where they may fit into your care plan.",
    image: "/images/treatments/immunotherapy.jpg",
    imageAlt: "Modern medical science supporting immunotherapy care",
    overview: {
      title: "What is immunotherapy?",
      paragraphs: [
        "Unlike chemotherapy, which attacks dividing cells directly, immunotherapy aims to restore or boost immune recognition of cancer. Checkpoint inhibitors are the most widely used class in solid tumours.",
        "Not every cancer responds. Benefit depends on tumour type, biomarkers such as PD-L1 or MSI status, prior treatment, and overall health.",
        "Side effects differ from chemotherapy — they can involve inflammation in organs such as the skin, gut, lungs, or endocrine glands, and need prompt recognition.",
      ],
    },
    symptoms: {
      title: "Who may be considered",
      intro: "Immunotherapy is a treatment category, not a diagnosis. It may be discussed if you have:",
      items: [
        "Advanced or metastatic solid tumours with supportive evidence",
        "Lung, bladder, kidney, melanoma, or selected other cancers",
        "Biomarkers suggesting higher likelihood of response",
        "Disease that progressed after earlier therapy",
        "A plan combining immunotherapy with chemotherapy",
      ],
      note: "Eligibility is individual. Biomarker results and prior history matter as much as the cancer name.",
    },
    whenToConsult: {
      title: "When to ask about immunotherapy",
      items: [
        "Your report mentions PD-L1, MSI-high, or TMB",
        "Standard chemotherapy has stopped working",
        "Guidelines list immunotherapy for your stage and type",
        "You want to understand risks versus chemotherapy alone",
        "You need help managing immune-related side effects",
      ],
    },
    diagnosis: {
      title: "What we review before recommending it",
      items: [
        "Confirmed pathology and staging",
        "PD-L1, MSI/MMR, or other relevant biomarkers",
        "Prior systemic treatments and responses",
        "Autoimmune history and organ function",
        "Infection risk and performance status",
        "Whether combination with chemo or targeted therapy is better",
      ],
    },
    checklist: {
      title: "Does this apply to you?",
      subtitle: "Bring these points to your consultation.",
      items: [
        "My oncologist mentioned immunotherapy as an option",
        "I have biomarker results on my pathology report",
        "I want to compare immunotherapy with chemotherapy",
        "I am on immunotherapy and have new symptoms",
        "I need a second opinion on continuing or switching therapy",
      ],
    },
    approach: {
      title: "How immunotherapy is used",
      intro: "Dosing schedules, combinations, and duration vary by cancer type and regimen.",
      options: [
        {
          title: "Checkpoint inhibitors",
          detail: "PD-1 / PD-L1 (and sometimes CTLA-4) blockers given intravenously on a set schedule.",
        },
        {
          title: "Chemo-immunotherapy",
          detail: "Combining immune drugs with chemotherapy can improve outcomes in selected lung and other cancers.",
        },
        {
          title: "Biomarker-guided use",
          detail: "MSI-high or high PD-L1 tumours may be prioritised for immunotherapy when evidence is strong.",
        },
        {
          title: "Toxicity management",
          detail: "Steroids and specialist input are used early if immune-related inflammation appears.",
        },
      ],
    },
    journey: {
      title: "What to expect",
      steps: [
        { label: "01", title: "Fit assessment", detail: "Confirm the cancer setting and biomarkers support immunotherapy." },
        { label: "02", title: "Education", detail: "Learn infusion schedules and which side effects need same-day attention." },
        { label: "03", title: "Treatment", detail: "Infusions proceed with labs and clinical checks before each dose when required." },
        { label: "04", title: "Response review", detail: "Scans and symptoms guide whether to continue, pause, or change course." },
      ],
    },
    timeline: {
      before: [
        "Bring full pathology with biomarker pages",
        "Share autoimmune disease or transplant history",
        "List steroids or immunosuppressants you take",
        "Ask how response will be measured",
      ],
      during: [
        "Report rash, diarrhoea, cough, or severe fatigue early",
        "Do not start new supplements without asking",
        "Attend scheduled labs even if you feel well",
        "Carry a summary card noting you are on immunotherapy",
      ],
      after: [
        "Immune side effects can appear late — stay alert",
        "Keep follow-up imaging appointments",
        "Discuss duration of therapy if response is durable",
        "Ask about vaccines and infection precautions",
      ],
    },
    faqs: [
      [
        "Is immunotherapy stronger than chemotherapy?",
        "Not universally. For some cancers and biomarkers it can work better or longer; for others chemotherapy remains the better first step. Comparison is case-specific.",
      ],
      [
        "How is it different from chemotherapy side effects?",
        "Chemo often causes hair loss, low counts, and nausea. Immunotherapy more often causes inflammatory side effects that can affect skin, gut, lungs, thyroid, or other organs.",
      ],
      [
        "How long will I stay on immunotherapy?",
        "Duration depends on cancer type, response, and tolerability — sometimes for a defined period, sometimes while benefit continues. Your plan will specify the intended course.",
      ],
      [
        "Can everyone with cancer get immunotherapy?",
        "No. It is approved and effective only in specific settings. Using it without evidence can add risk without benefit.",
      ],
    ],
  },
  {
    slug: "targeted-therapy",
    title: "Targeted therapy",
    shortTitle: "Targeted therapy",
    readTime: "6 min read",
    headline: "Targeted therapy:",
    headlineAccent: "precision treatment guided by tumour biology",
    summary:
      "Targeted therapies act on specific molecular drivers in cancer cells. Dr. Dhar reviews genomic and biomarker reports to explain whether a precision drug is appropriate — and how it fits with other treatments.",
    cardText: "Precision treatments guided by tumour biology — helping you understand when a targeted option may be right.",
    image: "/images/treatments/targeted-therapy.jpg",
    imageAlt: "Precision medicine and targeted therapy research",
    overview: {
      title: "What is targeted therapy?",
      paragraphs: [
        "Targeted drugs block pathways that cancer cells rely on to grow — for example HER2, EGFR, BRAF, or angiogenesis signals. Many are oral tablets; some are infusions.",
        "They are not “one size fits all.” A drug only helps if the tumour has the matching alteration or pathway activity, confirmed by testing.",
        "Side-effect profiles differ from classic chemotherapy. Skin rash, diarrhoea, liver test changes, or blood pressure effects are more typical for certain classes.",
      ],
    },
    symptoms: {
      title: "When targeted therapy enters the conversation",
      items: [
        "Molecular testing shows an actionable mutation",
        "HER2-positive breast cancer or gastric cancer",
        "EGFR/ALK-positive or similar lung cancer alterations",
        "Selected colorectal, thyroid, or other solid tumours",
        "Disease progression where a new targetable pathway is found",
      ],
      note: "Liquid biopsy or tissue NGS may be used when standard tests are incomplete — your oncologist will advise.",
    },
    whenToConsult: {
      title: "When to consult",
      items: [
        "You received a genomic or NGS report and need it explained",
        "A targeted drug has been suggested and you want clarity",
        "Prior targeted therapy stopped working",
        "You need help managing drug-specific side effects",
        "You want a second opinion on sequencing targeted vs chemo options",
      ],
    },
    diagnosis: {
      title: "Testing that guides targeted drugs",
      items: [
        "IHC for proteins such as HER2 or PD-L1 context",
        "PCR or FISH for selected gene changes",
        "Next-generation sequencing (NGS) panels",
        "Liquid biopsy in selected situations",
        "Resistance mutation testing at progression",
        "Correlation of results with approved drug options",
      ],
    },
    checklist: {
      title: "Does this apply to you?",
      subtitle: "Useful if precision oncology has been mentioned.",
      items: [
        "I have an NGS or biomarker report to review",
        "A targeted tablet or infusion was recommended",
        "I am unsure whether my mutation is actionable",
        "Side effects from a targeted drug are affecting daily life",
        "I need advice after progression on targeted therapy",
      ],
    },
    approach: {
      title: "How targeted therapy is planned",
      intro: "Matching drug to driver is the first step. Sequencing with surgery, chemo, or immunotherapy comes next.",
      options: [
        {
          title: "Oral targeted agents",
          detail: "Daily or intermittent tablets for drivers such as EGFR, ALK, or other kinase alterations, with adherence support.",
        },
        {
          title: "Antibody and conjugate therapies",
          detail: "HER2-directed antibodies and antibody-drug conjugates in breast and selected other cancers.",
        },
        {
          title: "Anti-angiogenic therapy",
          detail: "Drugs that interfere with tumour blood-vessel signalling in selected tumour types.",
        },
        {
          title: "Resistance planning",
          detail: "When cancer adapts, repeat testing may reveal a new target or a switch to another modality.",
        },
      ],
    },
    journey: {
      title: "From report to regimen",
      steps: [
        { label: "01", title: "Interpret the report", detail: "Separate actionable findings from variants of uncertain significance." },
        { label: "02", title: "Match the drug", detail: "Choose an approved therapy backed by evidence for your alteration." },
        { label: "03", title: "Start & monitor", detail: "Labs and clinic visits watch for benefit and class-specific toxicities." },
        { label: "04", title: "Adapt", detail: "At progression, reassess options — another targeted drug, chemo, or immunotherapy." },
      ],
    },
    timeline: {
      before: [
        "Bring the full molecular report, not only the summary page",
        "Share all prior systemic therapies and responses",
        "Ask which findings are truly actionable today",
        "Discuss cost, access, and expected duration",
      ],
      during: [
        "Take oral drugs exactly as prescribed",
        "Report rash, diarrhoea, breathlessness, or severe fatigue early",
        "Keep liver, heart, or blood-pressure checks if required",
        "Do not stop abruptly without medical advice",
      ],
      after: [
        "Understand why a drug was stopped or switched",
        "Ask whether repeat biopsy or liquid biopsy helps next",
        "Continue surveillance imaging on schedule",
        "Review supportive care for lingering side effects",
      ],
    },
    faqs: [
      [
        "Is targeted therapy the same as immunotherapy?",
        "No. Targeted therapy blocks specific cancer pathways. Immunotherapy stimulates immune attack. Some plans use both, but they work differently.",
      ],
      [
        "What if my NGS report shows many mutations?",
        "Only some are actionable. Your oncologist will highlight which findings change treatment and which are informational.",
      ],
      [
        "Do targeted drugs have fewer side effects?",
        "They avoid some chemotherapy effects, but they are not side-effect free. Each drug class has its own monitoring needs.",
      ],
      [
        "Can targeted therapy cure cancer?",
        "In some settings it contributes to long remission or cure as part of a broader plan. In advanced disease it often aims for durable control. Expectations should be set case by case.",
      ],
    ],
  },
];

export function getTreatment(slug: string) {
  return treatments.find((item) => item.slug === slug);
}

export function getTreatmentSlugs() {
  return treatments.map((item) => item.slug);
}
