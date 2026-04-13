// ── Shared site data ──
// Single source of truth for all content. Index.tsx renders it;
// the Vite plugin in vite.config.ts generates llms.txt from it at build time.

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
  { title: "AMD AI Research Club", detail: "Peer-to-peer paper spotlight series · Host, 2025–present", href: "https://www.linkedin.com/posts/amdsiloai_join-us-for-the-first-session-of-the-amd-activity-7437130083900956672-PCda/", linkLabel: "info", tag: "recurring", date: "Dec 9999" },
  { title: "ECCV 2026 — CV4GOOD", detail: "Computer Vision for Humanitarian Action · Malmö, Sep 2026", href: "https://eccv.ecva.net/", tag: "host", date: "Sep 2026" },
  { title: "ICLR 2026 — AI4Peace", detail: "Rio de Janeiro, Apr 2026", href: "https://aiforpeaceworkshop.github.io/", tag: "upcoming", date: "Apr 2026" },
  { title: "Warsaw AI Summit 2026", detail: "Warsaw, Mar 2026", href: "https://warsawaisummit.com/", tag: "keynote", date: "Mar 2026" },
  { title: "Compute to Impact", detail: "Advancing Physical AI · Helsinki, Mar 2026", href: "https://discover.amd.com/q1-2025-compute-to-impact-helsinki.html", date: "Mar 2026" },
  { title: "Nordic HPC Summit 2025", detail: "Where curiosity meets responsibility · Stockholm, Oct 2025", href: "https://nordichpcsummit.enccs.se/", tag: "keynote", date: "Oct 2025" },
  { title: "Redeye AI Theme Event", detail: "The Good AI Lab · Stockholm, Mar 2025", href: "https://www.redeye.se/video/event-presentation/1088678/the-good-ai-lab-co-founder-chair-ai-industry-expert-pier-luigi-dovesi-presents-at-redeye-theme-event-artificial-intelligence-2025-march-13", linkLabel: "watch", date: "Mar 2025" },
  { title: "AIAW Podcast E143", detail: "Revolutionizing AI and Autonomous Systems · Jan 2025", href: "https://hyperight.com/aiaw-podcast-e143-revolutionizing-ai-and-autonomous-systems-pier-luigi-dovesi/", linkLabel: "listen", date: "Jan 2025" },
  { title: "Auto.AI Europe 2024", detail: "Data Alchemy — Berlin, Sep 2024", href: "https://www.auto-ai.eu/peoples/pier-luigi-dovesi-2", date: "Sep 2024" },
  { title: "Nordic Industry Days 2024", detail: "Supercomputing for AI · Copenhagen, Sep 2024", href: "https://enccs.se/news/2024/09/nordic-industry-days-2024-in-retrospect/", date: "Sep 2024" },
  { title: "GAIA Conference 2024", detail: "Embodied AI Beyond Datasets · Gothenburg, Apr 2024", href: "https://www.gaia.fish/speakers2/pier-luigi-dovesi-2024", date: "Apr 2024" },
];

export const talks = sortByDate(talksUnsorted);

// ── News ──
export interface NewsEntry {
  date: string;
  text: string;
  link: string;
  linkText: string;
  suffix?: string;
}

const newsUnsorted: NewsEntry[] = [
  { date: "Apr 2026", text: "", link: "https://eccv.ecva.net/", linkText: "CV4GOOD accepted at ECCV 2026", suffix: " — Computer Vision for Humanitarian Action workshop (Malmö, Sep 2026), with MSF" },
  { date: "Apr 2026", text: "Invited speaker at", link: "https://aiforpeaceworkshop.github.io/", linkText: "ICLR 2026 AI4Peace Workshop", suffix: " (Rio de Janeiro) — autonomous systems and international humanitarian law" },
  { date: "Apr 2026", text: "Hosted", link: "https://webinar.amd.com/Active-Stereo-Without-Pattern-Projector/en/registration", linkText: "AMD AI Research Club #2", suffix: ' — "Depth Foundation Models: Are We There Yet?"' },
  { date: "Mar 2026", text: "Speaker at", link: "https://discover.amd.com/q1-2025-compute-to-impact-helsinki.html", linkText: "Compute to Impact", suffix: ' (Helsinki) — "Advancing Physical AI: the AMD Open Ecosystem for Autonomy"' },
  { date: "Mar 2026", text: "Launched", link: "https://webinar.amd.com/Retrieval-Augmentation-in-Multimodal-Large-Language-Models/en/registration", linkText: "AMD AI Research Club", suffix: ' — "Retrieval Augmentation in Multimodal Large Language Models"' },
  { date: "Mar 2026", text: "Keynote at", link: "https://warsawaisummit.com/", linkText: "Warsaw AI Summit 2026" },
  { date: "Jan 2026", text: "Published", link: "https://thegoodailab.org/blog/from-self-driving-cars-to-self-driving-wars", linkText: '"From Self-Driving Cars to Self-Driving Wars"', suffix: " — autonomy, AI weapons, and the illusion of control" },
  { date: "Dec 2025", text: "", link: "https://thegoodailab.org/blog/msf-from-principles-to-practice", linkText: '"From Principles to Practice"', suffix: " — our work with Doctors Without Borders" },
  { date: "Oct 2025", text: "Keynote at", link: "https://nordichpcsummit.enccs.se/", linkText: "Nordic HPC Summit 2025", suffix: ' (Stockholm) — "Building The Good AI Lab: where curiosity meets responsibility"' },
  { date: "Oct 2025", text: "", link: "https://thegoodailab.org/blog/msf-partnership", linkText: "GAL and MSF announce partnership", suffix: " to bring responsible AI to humanitarian work" },
  { date: "Jul 2025", text: "", link: "https://thegoodailab.org/blog/vocalign", linkText: "VocAlign", suffix: " accepted at BMVC 25 — source-free domain adaptation for open-vocabulary segmentation" },
  { date: "Mar 2025", text: "", link: "https://arxiv.org/abs/2307.15063", linkText: "SemLA", suffix: " accepted at CVPR 25 — domain adaptation with LoRA retrieval and fusion" },
  { date: "Mar 2025", text: "Presented GAL at", link: "https://www.redeye.se/video/event-presentation/1088678/the-good-ai-lab-co-founder-chair-ai-industry-expert-pier-luigi-dovesi-presents-at-redeye-theme-event-artificial-intelligence-2025-march-13", linkText: "Redeye AI Theme Event 2025", suffix: " (Stockholm)" },
  { date: "Jan 2025", text: "Featured on", link: "https://hyperight.com/aiaw-podcast-e143-revolutionizing-ai-and-autonomous-systems-pier-luigi-dovesi/", linkText: "AIAW Podcast E143", suffix: " — Revolutionizing AI and Autonomous Systems" },
  { date: "Sep 2024", text: "Speaker at", link: "https://enccs.se/news/2024/09/nordic-industry-days-2024-in-retrospect/", linkText: "Nordic Industry Days 2024", suffix: " (Copenhagen) — Supercomputing for AI, EuroHPC" },
  { date: "Sep 2024", text: "Speaker at", link: "https://www.auto-ai.eu/peoples/pier-luigi-dovesi-2", linkText: "Auto.AI Europe", suffix: ' (Berlin) — "Data Alchemy: Adapting and Creating with Limited Data"' },
  { date: "Apr 2024", text: "Speaker at", link: "https://www.gaia.fish/speakers2/pier-luigi-dovesi-2024", linkText: "GAIA Conference 2024", suffix: ' (Gothenburg) — "Adapting Like Humans: Embodied AI Beyond Datasets and Domains"' },
  { date: "Oct 2023", text: "", link: "https://arxiv.org/abs/2307.15063", linkText: "HAMLET", suffix: " accepted at ICCV 2023 — real-time online domain adaptation" },
  { date: "Oct 2022", text: "", link: "https://arxiv.org/abs/2207.10667", linkText: "OnDA", suffix: " accepted at ECCV 2022 — online domain adaptation" },
  { date: "May 2020", text: "", link: "https://arxiv.org/abs/1910.00541", linkText: "Real-Time Semantic Stereo Matching", suffix: " accepted at ICRA 2020" },
  { date: "Aug 2019", text: "", link: "https://arxiv.org/abs/1908.03127", linkText: "Enhancing Self-Supervised Monocular Depth Estimation with Traditional Visual Odometry", suffix: " accepted at 3DV 2019" },
];

export const news = sortByDate(newsUnsorted);

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
  { years: "2024 – Present", org: "AMD Silo AI", role: "Robotics and Autonomous Systems Lead", subtitle: "part of AMD", description: "Open ecosystem for Physical AI. World models, VLMs, and VLAs. Host of the AMD AI Research Club." },
  { years: "2023 – 2024", org: "Silo AI", role: "Senior AI Scientist", description: "LiDAR perception, LLMs, diffusion models." },
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

// ── Publications ──
export const publications = [
  "VocAlign — source-free domain adaptation for open-vocabulary segmentation (BMVC 2025)",
  "SemLA — domain adaptation with LoRA retrieval and fusion (CVPR 2025)",
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
  publications.forEach((p) => ln(`- ${p}`));
  ln();

  ln("## Links");
  ln();
  ln(`- Website: https://dovesi.dev`);
  links.forEach((l) => ln(`- ${l.label}: ${l.href}`));
  ln(`- Email: ${bio.email}`);
  ln();

  return lines.join("\n");
}

// ── Pre-rendered HTML for SEO ──
// Injected into <div id="root"> at build time so crawlers that don't
// execute JS still see real content. React's createRoot replaces it.
function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function generatePrerenderedHtml(): string {
  const h: string[] = [];
  const ln = (s = "") => h.push(s);

  ln(`<div style="max-width:680px;margin:0 auto;padding:2rem 1.5rem;font-family:'Lora',Georgia,serif;line-height:1.7">`);

  // Nav
  ln(`<nav style="margin-bottom:2rem">`);
  ln(`<a href="#about">About</a> · <a href="#talks">Talks</a> · <a href="#news">News</a> · <a href="#timeline">Timeline</a> · <a href="#writing">Writing</a>`);
  ln(`</nav>`);

  // About
  ln(`<header id="about">`);
  ln(`<h1>${esc(bio.name)}</h1>`);
  ln(`<p>${esc(bio.tagline)} based in ${esc(bio.location)}.</p>`);
  bio.about.forEach((p) => ln(`<p>${esc(p)}</p>`));
  ln(`<p>Find me at `);
  links.forEach((l, i) => {
    ln(`<a href="${esc(l.href)}">${esc(l.label)}</a>${i < links.length - 1 ? ", " : ""}`);
  });
  ln(`, and <a href="mailto:${esc(bio.email)}">email</a>.</p>`);
  ln(`</header>`);

  // Talks
  ln(`<section id="talks"><h2>Talks &amp; Podcasts</h2>`);
  talks.forEach((t) => {
    const tag = t.tag ? ` <em>(${esc(t.tag)})</em>` : "";
    ln(`<p><a href="${esc(t.href)}">${esc(t.title)}</a> — ${esc(t.detail)}${tag}</p>`);
  });
  ln(`</section>`);

  // News
  ln(`<section id="news"><h2>News</h2>`);
  news.forEach((n) => {
    ln(`<p><strong>${esc(n.date)}</strong> ${esc(n.text)} <a href="${esc(n.link)}">${esc(n.linkText)}</a>${n.suffix ? esc(n.suffix) : ""}</p>`);
  });
  ln(`</section>`);

  // Timeline
  ln(`<section id="timeline"><h2>Timeline</h2>`);
  timeline.forEach((t) => {
    const sub = t.subtitle ? ` (${esc(t.subtitle)})` : "";
    const org = t.orgHref ? `<a href="${esc(t.orgHref)}">${esc(t.org)}</a>` : esc(t.org);
    ln(`<p>${esc(t.years)} — ${org}${sub} — ${esc(t.role)}${t.description ? `. ${esc(t.description)}` : ""}</p>`);
  });
  ln(`</section>`);

  // Writing
  ln(`<section id="writing"><h2>Writing</h2>`);
  writing.forEach((w) => {
    const desc = w.description ? ` — ${esc(w.description)}` : "";
    ln(`<p><a href="${esc(w.href)}">${esc(w.title)}</a>${desc} (${esc(w.date)})</p>`);
  });
  ln(`</section>`);

  // Publications
  ln(`<section><h2>Selected Publications</h2>`);
  publications.forEach((p) => ln(`<p>${esc(p)}</p>`));
  ln(`</section>`);

  // Footer
  ln(`<footer><p>${esc(bio.name)} — ${esc(bio.location)}</p></footer>`);
  ln(`</div>`);

  return h.join("\n");
}
