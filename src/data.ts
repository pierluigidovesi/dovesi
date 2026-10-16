// ── Shared site data ──
// Single source of truth for all content. Index.tsx renders it;
// the Vite plugin in vite.config.ts generates llms.txt and rss.xml from it at build time.

// ── Date helpers for auto-sorting ──
const MONTHS: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

function parseDateKey(d: string): number {
  // "Apr 2026" → 202604, "present" → 999999
  const parts = d.split(" ");
  if (parts.length !== 2) return 0;
  return parseInt(parts[1]) * 100 + (MONTHS[parts[0]] ?? 0);
}

function sortByDate<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => parseDateKey(b.date) - parseDateKey(a.date));
}

// ── Bio ──
export const bio = {
  name: "Pier Luigi Dovesi",
  shortName: "Pier",
  location: "Stockholm, Sweden",
  title: "Pier Luigi Dovesi | Physical AI and AI for Social Good",
  tagline: "AI researcher, robotics engineer, and non-profit founder",
  about: [
    `Co-Founder and Chair of The Good AI Lab, an independent AI lab working on foundational AI research and innovation projects for social good, partnering with Doctors Without Borders (MSF), FMSI, and several universities across Europe.`,
    `Leads the Robotics and Autonomous Systems team at AMD Silo AI, working on world action models, multimodal AI, and embodied intelligence.`,
    `Research spans domain adaptation, self-supervised learning, and real-time perception, with recent work extending toward vision-language models. Publications at CVPR, ECCV, ICCV, 3DV, BMVC, and ICRA.`,
  ],
  email: "pierluigidovesi@gmail.com",
};

// ── Links ──
export const links = [
  { label: "GitHub", href: "https://github.com/pierluigidovesi" },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?user=t55rm6EAAAAJ&hl=en" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pierluigidovesi/" },
  { label: "X", href: "https://x.com/dovpie" },
  { label: "Hugging Face", href: "https://huggingface.co/dovpie" },
  { label: "ROCm Blog", href: "https://rocm.blogs.amd.com/authors/pier-luigi-dovesi.html" },
];

// ── Talks & Podcasts ──
export interface Talk {
  title: string;
  detail: string;
  href: string;
  linkLabel?: string;
  tag?: string;
  date: string; // "Mon YYYY" for sorting — not displayed directly
}

const talksUnsorted: Talk[] = [
  { title: "NeurIPS 2026 — AI for Peace", detail: "Paris, Dec 12–13, 2026", href: "https://aiforpeaceworkshop.github.io/", tag: "organizer", date: "Dec 2026" },
  { title: "AMD AI Research Club", detail: "Peer-to-peer paper spotlight series · Host, 2025–present", href: "https://www.linkedin.com/posts/amdsiloai_join-us-for-the-first-session-of-the-amd-activity-7437130083900956672-PCda/", linkLabel: "info", tag: "recurring", date: "Dec 9999" },
  { title: "ECCV 2026 — CV4GOOD", detail: "Computer Vision for Humanitarian Action · Malmö, Sep 8, 2026", href: "https://cv4good.thegoodailab.org/", tag: "host", date: "Jan 10000" },
  { title: "ICLR 2026 — AI for Peace", detail: "Rio de Janeiro, Apr 2026", href: "https://aiforpeaceworkshop.github.io/iclr-2026/", tag: "keynote", date: "Apr 2026" },
  { title: "SYSTEC R&I Day 2026", detail: "Faculty of Engineering, University of Porto · Jun 2026", href: "https://systec.fe.up.pt/systec-ri-day", tag: "keynote", date: "Jun 2026" },
  { title: "Warsaw AI Summit 2026", detail: "Warsaw, Mar 2026", href: "https://www.linkedin.com/posts/pierluigidovesi_happy-to-keynote-the-warsaw-ai-summit-today-activity-7434563685957648384-_xj5", linkLabel: "event post", tag: "keynote", date: "Mar 2026" },
  { title: "Compute to Impact", detail: "Advancing Physical AI · Helsinki, Mar 2026", href: "https://discover.amd.com/q1-2025-compute-to-impact-helsinki.html", date: "Mar 2026" },
  { title: "Nordic HPC Summit 2025", detail: "Where curiosity meets responsibility · Stockholm, Oct 2025", href: "https://nordichpcsummit.enccs.se/wp-content/uploads/2025/10/Nordic-HPC-Summit-Agenda-.pdf", linkLabel: "programme (PDF)", tag: "keynote", date: "Oct 2025" },
  { title: "GAIA Conference 2026", detail: "Where AI Finds Its Purpose — AI for humanitarian action with MSF · Gothenburg, Apr 2026", href: "https://www.gaia.fish/talks/where-ai-finds-its-purpose", linkLabel: "watch", date: "Apr 2026" },
  { title: "Redeye AI Theme Event", detail: "The Good AI Lab · Stockholm, Mar 2025", href: "https://www.redeye.se/video/event-presentation/1088678/the-good-ai-lab-co-founder-chair-ai-industry-expert-pier-luigi-dovesi-presents-at-redeye-theme-event-artificial-intelligence-2025-march-13", linkLabel: "watch", date: "Mar 2025" },
  { title: "AIAW Podcast E143", detail: "Revolutionizing AI and Autonomous Systems · Jan 2025", href: "https://hyperight.com/aiaw-podcast-e143-revolutionizing-ai-and-autonomous-systems-pier-luigi-dovesi/", linkLabel: "listen", date: "Jan 2025" },
  { title: "Auto.AI Europe 2024", detail: "Data Alchemy — Berlin, Sep 2024", href: "https://www.auto-ai.eu/peoples/pier-luigi-dovesi-2", date: "Sep 2024" },
  { title: "Nordic Industry Days 2024", detail: "Supercomputing for AI · Copenhagen, Sep 2024", href: "https://enccs.se/news/2024/09/nordic-industry-days-2024-in-retrospect/", date: "Sep 2024" },
  { title: "GAIA Conference 2024", detail: "Embodied AI Beyond Datasets · Gothenburg, Apr 2024", href: "https://www.gaia.fish/speakers2/pier-luigi-dovesi-2024", date: "Apr 2024" },
];

export const talks = sortByDate(talksUnsorted);

// ── News ──
export interface NewsEntry {
  id: string;
  date: string;
  text: string;
  link: string;
  linkText: string;
  suffix?: string;
}

const newsUnsorted: NewsEntry[] = [
  { id: "news-001", date: "Aug 2026", text: "Hosting", link: "https://amd.zoom.us/webinar/register/WN_PmsbS-OSTrq9enpSrsIXTA", linkText: "AMD AI Research Club #5", suffix: ' — "Attack, Benchmark, Defend, Repeat: The Adversarial AI Cycle" with Antonio Cinà (University of Trieste)' },
  { id: "news-002", date: "Jul 2026", text: "Convened the", link: "https://www.amd.com/en/blogs/2026/amd-silo-ai-and-unimore-to-advance-physical-ai.html", linkText: "World Model Foundry", suffix: " at the University of Trento, together with GBionics, the Universities of Bologna and Modena e Reggio Emilia" },
  { id: "news-003", date: "Jul 2026", text: "Workshop accepted at", link: "https://aiforpeaceworkshop.github.io/", linkText: "NeurIPS 2026 — AI for Peace", suffix: " (Paris, Dec 12–13, 2026)" },
  { id: "news-004", date: "Jul 2026", text: "Published", link: "https://rocm.blogs.amd.com/artificial-intelligence/auto-speed/README.html", linkText: '"Efficient Hyperparameter Optimization for Autonomous Driving Models with AMD Instinct GPU Partitioning"', suffix: " on ROCm Blog" },
  { id: "news-005", date: "May 2026", text: "Outstanding Reviewer at", link: "https://cvpr.thecvf.com/Conferences/2026", linkText: "CVPR 2026", suffix: " (top 5%)" },
  { id: "news-006", date: "Jun 2026", text: "Hosting", link: "https://www.linkedin.com/events/7468403201202122752/", linkText: "AMD AI Research Club #4", suffix: ' — "Rethinking Benchmarks for Robotic Manipulation" with Yi Ru (Helen) Wang (University of Washington)' },
  { id: "news-007", date: "Jun 2026", text: "Keynote at", link: "https://systec.fe.up.pt/systec-ri-day", linkText: "SYSTEC Research & Innovation Day", suffix: " (Faculty of Engineering, University of Porto, Jun 18)" },
  { id: "news-008", date: "Jun 2026", text: "Presented", link: "https://thegoodailab.org", linkText: "The Good AI Lab", suffix: " research at Sapienza University of Rome" },
  { id: "news-009", date: "Sep 2026", text: "", link: "https://arxiv.org/abs/2606.23885", linkText: "Mind the Heads", suffix: " accepted at NeurIPS 26 — head-wise representation alignment (HeRA) for multimodal LLMs" },
  { id: "news-010", date: "May 2026", text: "Hosted", link: "https://amd.zoom.us/webinar/register/WN_XtuA5kyQRVqyJ4YiUmKlWQ", linkText: "AMD AI Research Club #3", suffix: ' — "Invisible Shortcuts: Why Vision Encoders Know Your Camera" with Giorgos Tolias (CTU in Prague)' },
  { id: "news-011", date: "May 2026", text: "Published", link: "https://rocm.blogs.amd.com/artificial-intelligence/semantic-fencing/README.html", linkText: '"Semantic Fencing of Video Streams Using Embedding Splits from Vision Foundation Models"', suffix: " on ROCm Blog" },
  { id: "news-012", date: "May 2026", text: "Published", link: "https://rocm.blogs.amd.com/artificial-intelligence/street-gaussians/README.html", linkText: '"AMD-Powered 3D Gaussian Splatting for Autonomous Driving Scenes"', suffix: " on ROCm Blog" },
  { id: "news-013", date: "Apr 2026", text: "Published", link: "https://rocm.blogs.amd.com/ecosystems-and-partners/eruku-genai/README.html", linkText: '"Styled Text Image Generation with Eruku on AMD"', suffix: " on ROCm Blog" },
  { id: "news-014", date: "Apr 2026", text: "", link: "https://cv4good.thegoodailab.org/", linkText: "CV4GOOD accepted at ECCV 2026", suffix: " — Computer Vision for Humanitarian Action workshop (Malmö, Sep 8, 2026), with MSF, featuring Yann Rebois, Jamon Van Den Hoek, Corey Scher, Joseph Redmon, and Sara Beery" },
  { id: "news-015", date: "Apr 2026", text: "Speaker at", link: "https://www.gaia.fish/talks/where-ai-finds-its-purpose", linkText: "GAIA Conference 2026", suffix: ' (Gothenburg, Apr 20) — "Where AI Finds Its Purpose" — AI for humanitarian action with MSF' },
  { id: "news-016", date: "Apr 2026", text: "Keynote at", link: "https://aiforpeaceworkshop.github.io/iclr-2026/", linkText: "ICLR 2026 — AI for Peace Workshop", suffix: " (Rio de Janeiro) — LAWS and international humanitarian law, alongside Timnit Gebru, Alex Hanna, David Gray Widder, Gisela Luján Andrade, and Joseph Redmon" },
  { id: "news-017", date: "Apr 2026", text: "Hosted", link: "https://webinar.amd.com/Active-Stereo-Without-Pattern-Projector/en/registration", linkText: "AMD AI Research Club #2", suffix: ' — "Depth Foundation Models: Are We There Yet?" with Luca Bartolomei (University of Bologna)' },
  { id: "news-018", date: "Mar 2026", text: "Speaker at", link: "https://discover.amd.com/q1-2025-compute-to-impact-helsinki.html", linkText: "Compute to Impact", suffix: ' (Helsinki) — "Advancing Physical AI: the AMD Open Ecosystem for Autonomy"' },
  { id: "news-019", date: "Mar 2026", text: "Launched", link: "https://webinar.amd.com/Retrieval-Augmentation-in-Multimodal-Large-Language-Models/en/registration", linkText: "AMD AI Research Club", suffix: ' — "Retrieval Augmentation in Multimodal Large Language Models" with Sara Sarto (UniMoRE)' },
  { id: "news-020", date: "Mar 2026", text: "Keynote at", link: "https://www.linkedin.com/posts/pierluigidovesi_happy-to-keynote-the-warsaw-ai-summit-today-activity-7434563685957648384-_xj5", linkText: "Warsaw AI Summit 2026" },
  { id: "news-021", date: "Jan 2026", text: "Published", link: "https://thegoodailab.org/blog/from-self-driving-cars-to-self-driving-wars", linkText: '"From Self-Driving Cars to Self-Driving Wars"', suffix: " — autonomy, AI weapons, and the illusion of control" },
  { id: "news-022", date: "Dec 2025", text: "", link: "https://arxiv.org/abs/2512.15885", linkText: '"Seeing Beyond Words"', suffix: " — preprint on arXiv — JARVIS, a JEPA-inspired self-supervised visual learning framework for MLLMs" },
  { id: "news-023", date: "Dec 2025", text: "", link: "https://thegoodailab.org/blog/msf-from-principles-to-practice", linkText: '"From Principles to Practice"', suffix: " — our work with Doctors Without Borders" },
  { id: "news-024", date: "Dec 2025", text: "Published", link: "https://rocm.blogs.amd.com/software-tools-optimization/point-2-gaussian/README.html", linkText: '"3D Scene Reconstruction from the Inside: Explore the Mathematics Behind gsplat"', suffix: " on ROCm Blog" },
  { id: "news-025", date: "Oct 2025", text: "Keynote at", link: "https://nordichpcsummit.enccs.se/wp-content/uploads/2025/10/Nordic-HPC-Summit-Agenda-.pdf", linkText: "Nordic HPC Summit 2025", suffix: ' (Stockholm) — "Building The Good AI Lab: where curiosity meets responsibility"' },
  { id: "news-026", date: "Oct 2025", text: "Published", link: "https://rocm.blogs.amd.com/software-tools-optimization/gsplat/README.html", linkText: '"Elevating 3D Scene Rendering with GSplat"', suffix: " on ROCm Blog" },
  { id: "news-027", date: "Oct 2025", text: "", link: "https://thegoodailab.org/blog/msf-partnership", linkText: "GAL and MSF announce partnership", suffix: " to bring responsible AI to humanitarian work" },
  { id: "news-028", date: "Jul 2025", text: "", link: "https://thegoodailab.org/blog/vocalign", linkText: "VocAlign", suffix: " accepted at BMVC 25 — source-free domain adaptation for open-vocabulary segmentation" },
  { id: "news-029", date: "Mar 2025", text: "", link: "https://arxiv.org/abs/2503.21780", linkText: "SemLA", suffix: " accepted at CVPR 25 — domain adaptation with LoRA retrieval and fusion" },
  { id: "news-030", date: "Mar 2025", text: "Presented GAL at", link: "https://www.redeye.se/video/event-presentation/1088678/the-good-ai-lab-co-founder-chair-ai-industry-expert-pier-luigi-dovesi-presents-at-redeye-theme-event-artificial-intelligence-2025-march-13", linkText: "Redeye AI Theme Event 2025", suffix: " (Stockholm)" },
  { id: "news-031", date: "Jan 2025", text: "Featured on", link: "https://hyperight.com/aiaw-podcast-e143-revolutionizing-ai-and-autonomous-systems-pier-luigi-dovesi/", linkText: "AIAW Podcast E143", suffix: " — Revolutionizing AI and Autonomous Systems" },
  { id: "news-032", date: "Sep 2024", text: "Speaker at", link: "https://enccs.se/news/2024/09/nordic-industry-days-2024-in-retrospect/", linkText: "Nordic Industry Days 2024", suffix: " (Copenhagen) — Supercomputing for AI, EuroHPC" },
  { id: "news-033", date: "Sep 2024", text: "Speaker at", link: "https://www.auto-ai.eu/peoples/pier-luigi-dovesi-2", linkText: "Auto.AI Europe", suffix: ' (Berlin) — "Data Alchemy: Adapting and Creating with Limited Data"' },
  { id: "news-034", date: "Apr 2024", text: "Speaker at", link: "https://www.gaia.fish/speakers2/pier-luigi-dovesi-2024", linkText: "GAIA Conference 2024", suffix: ' (Gothenburg) — "Adapting Like Humans: Embodied AI Beyond Datasets and Domains"' },
  { id: "news-035", date: "Oct 2023", text: "", link: "https://arxiv.org/abs/2307.15063", linkText: "HAMLET", suffix: " accepted at ICCV 2023 — real-time online domain adaptation" },
  { id: "news-036", date: "Oct 2022", text: "", link: "https://arxiv.org/abs/2207.10667", linkText: "OnDA", suffix: " accepted at ECCV 2022 — online domain adaptation" },
  { id: "news-037", date: "May 2020", text: "", link: "https://arxiv.org/abs/1910.00541", linkText: "Real-Time Semantic Stereo Matching", suffix: " accepted at ICRA 2020" },
  { id: "news-038", date: "Aug 2019", text: "", link: "https://arxiv.org/abs/1908.03127", linkText: "Enhancing Self-Supervised Monocular Depth Estimation with Traditional Visual Odometry", suffix: " accepted at 3DV 2019" },
];

export const news = sortByDate(newsUnsorted);

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function generateRssXml(): string {
  const ids = new Set<string>();
  const items = news.map((item) => {
    if (ids.has(item.id)) throw new Error(`Duplicate news ID: ${item.id}`);
    ids.add(item.id);
    const url = `https://dovesi.dev/#${item.id}`;
    const description = `${item.date} — ${[item.text, item.linkText + (item.suffix ?? "")].filter(Boolean).join(" ")}`;
    return [
      "    <item>",
      `      <title>${escapeXml(item.linkText)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <description>${escapeXml(description)}</description>`,
      "    </item>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    "    <title>Pier Luigi Dovesi — News</title>",
    "    <link>https://dovesi.dev/#news</link>",
    "    <description>News, research, talks, and writing by Pier Luigi Dovesi.</description>",
    "    <language>en</language>",
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

// ── Timeline ──
export interface TimelineEntry {
  years: string;
  org: string;
  orgHref?: string;
  role: string;
  subtitle?: string;
  featured?: boolean;
  description?: string;
}

export const timeline: TimelineEntry[] = [
  { years: "2025 – Present", org: "The Good AI Lab", orgHref: "https://thegoodailab.org", role: "Co-Founder & Chair", featured: true, description: "Independent AI lab working on foundational AI research and innovation projects for social good." },
  { years: "2024 – Present", org: "AMD Silo AI", role: "Robotics Lead", subtitle: "part of AMD", description: "Robotics team manager. Open ecosystem for Physical AI. World models, VLMs, and VLAs for humanoids and autonomous systems. Host of the AMD AI Research Club." },
  { years: "2023 – 2024", org: "Silo AI", role: "Senior AI Scientist & Expert Lead", description: "LiDAR perception, LLMs, diffusion models." },
  { years: "2019 – 2023", org: "Univrses", role: "Deep Learning Engineer", subtitle: "consulting at Zenseact", description: "Real-time perception and safety for autonomous driving. Lots of HPOs. Domain Adaptation research." },
  { years: "2017 – 2019", org: "KTH Royal Institute of Technology", role: "MSc Systems, Control & Robotics" },
  { years: "2013 – 2017", org: "University of Bologna & Tongji University", role: "BSc Automation Engineering" },
];

// ── Writing ──
export interface WritingEntry {
  title: string;
  href: string;
  description: string;
  date: string;
}

const writingUnsorted: WritingEntry[] = [
  { title: "From Self-Driving Cars to Self-Driving Wars", href: "https://thegoodailab.org/blog/from-self-driving-cars-to-self-driving-wars", description: "autonomy, AI weapons, and the illusion of control", date: "Jan 2026" },
  { title: "From Principles to Practice", href: "https://thegoodailab.org/blog/msf-from-principles-to-practice", description: "our work with Doctors Without Borders", date: "Dec 2025" },
  { title: "GAL and MSF partner to bring responsible AI to humanitarian work", href: "https://thegoodailab.org/blog/msf-partnership", description: "", date: "Oct 2025" },
];

export const writing = sortByDate(writingUnsorted);

// ── Selected research ──
export const research = [
  {
    title: "Mind the Heads (HeRA)",
    venue: "NeurIPS 2026",
    description: "Aligns individual attention heads with a vision model to improve visual reasoning and reduce hallucinations in multimodal LLMs.",
    paper: "https://arxiv.org/abs/2606.23885",
    resource: { label: "Project", href: "https://aimagelab.github.io/HeRA/" },
  },
  {
    title: "Seeing Beyond Words (JARVIS)",
    venue: "Preprint · 2025",
    description: "Teaches multimodal LLMs to learn visual structure directly from images, beyond what text descriptions can convey.",
    paper: "https://arxiv.org/abs/2512.15885",
    resource: { label: "Project", href: "https://github.com/aimagelab/JARVIS" },
  },
  {
    title: "VocAlign",
    venue: "BMVC 2025",
    description: "Adapts image segmentation to new environments by aligning category vocabularies, without access to the original training data.",
    paper: "https://arxiv.org/abs/2509.15225",
    resource: { label: "Code", href: "https://github.com/Sisso16/VocAlign" },
  },
  {
    title: "Semantic Library Adaptation (SemLA)",
    venue: "CVPR 2025",
    description: "Retrieves and combines lightweight model adapters to tailor segmentation to each image, without additional training at test time.",
    paper: "https://arxiv.org/abs/2503.21780",
    resource: { label: "Code", href: "https://github.com/rezaqorbani/SemLA" },
  },
];

const earlierPublications = [
  "HAMLET — real-time online domain adaptation (ICCV 2023)",
  "OnDA — online domain adaptation (ECCV 2022)",
  "Real-Time Semantic Stereo Matching (ICRA 2020)",
];

// ── Quotes (soul.md) ──
export const quotes = [
  { text: "I think it's important now to tie care to Quality by pointing out that care and Quality are internal and external aspects of the same thing. A person who sees Quality and feels it as he works is a person who cares. A person who cares about what he sees and does is a person who's bound to have some characteristics of Quality.", author: "Robert M. Pirsig" },
  { text: "Pessimismo della realtà, ottimismo della speranza.", author: "Antonio Gramsci" },
  { text: "L'inferno dei viventi non è qualcosa che sarà; se ce n'è uno, è quello che è già qui, l'inferno che abitiamo tutti i giorni … Due modi ci sono per non soffrirne. Il primo riesce facile a molti: accettare l'inferno e diventarne parte fino al punto di non vederlo più. Il secondo è rischioso ed esige attenzione e apprendimento continui: cercare e saper riconoscere chi e cosa, in mezzo all'inferno, non è inferno, e farlo durare, e dargli spazio.", author: "Italo Calvino" },
  { text: "Innovation without a guiding purpose is hollow. Real progress means more than building better tools; it means building them for everyone, especially those too often overlooked or forgotten. [...] We see AI as a force that reveals new paths, includes more voices, and helps reshape society for the better. If we are to contribute with a verse to this powerful play, let it be driven by curiosity and guided by responsibility.", author: "The Good AI Lab Manifesto", authorHref: "https://thegoodailab.org/manifesto" },
];

// ── llms.txt generator ──
export function generateLlmsTxt(): string {
  const lines: string[] = [];
  const ln = (s = "") => lines.push(s);

  ln(`# ${bio.name}`);
  ln();
  ln(`> Personal website of ${bio.name} — ${bio.tagline} based in ${bio.location}.`);
  ln();
  ln("## Pages");
  ln();
  ln("- [About](/#about): who I am and what I work on.");
  ln("- [Selected Research](/#research): papers, contributions, and project or code links.");
  ln("- [Talks & Podcasts](/#talks): keynotes, conference talks, and podcast appearances.");
  ln("- [News](/#news): recent updates, publications, and announcements.");
  ln("- [Timeline](/#timeline): roles, education, and career history.");
  ln("- [Writing](/#writing): essays and blog posts.");
  ln();
  ln("## About");
  ln();
  bio.about.forEach((p) => { ln(p); ln(); });

  ln("## Current Roles");
  ln();
  timeline.filter((t) => t.years.includes("Present")).forEach((t) => {
    const url = t.orgHref ? ` — ${t.orgHref}` : "";
    ln(`- ${t.role}, ${t.org} (${t.years.replace(" – Present", "–present")})${url}`);
  });
  ln();

  ln("## Previous Roles");
  ln();
  timeline.filter((t) => !t.years.includes("Present")).forEach((t) => {
    const sub = t.subtitle ? ` / ${t.subtitle}` : "";
    ln(`- ${t.role}, ${t.org}${sub} (${t.years})`);
  });
  ln();

  ln("## Recent News");
  ln();
  news.forEach((n) => {
    const lead = n.text ? `${n.text} ` : "";
    ln(`- ${n.date}: ${lead}${n.linkText}${n.suffix ?? ""} — ${n.link}`);
  });
  ln();

  ln("## Selected Talks");
  ln();
  talks.forEach((t) => {
    const tag = t.tag ? ` (${t.tag})` : "";
    ln(`- ${t.title} — ${t.detail}${tag}`);
  });
  ln();

  ln("## Writing");
  ln();
  writing.forEach((w) => {
    const desc = w.description ? ` — ${w.description}` : "";
    ln(`- "${w.title}"${desc} (${w.date}) — ${w.href}`);
  });
  ln();

  ln("## Selected Publications");
  ln();
  research.forEach((p) => {
    ln(`- ${p.title} (${p.venue}): ${p.description}`);
    ln(`  Paper: ${p.paper} | ${p.resource.label}: ${p.resource.href}`);
  });
  earlierPublications.forEach((p) => ln(`- ${p}`));
  ln();

  ln("## Links");
  ln();
  ln(`- Website: https://dovesi.dev`);
  links.forEach((l) => ln(`- ${l.label}: ${l.href}`));
  ln(`- Email: ${bio.email}`);
  ln();

  return lines.join("\n");
}
