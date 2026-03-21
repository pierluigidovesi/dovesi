import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const Index = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 22 || hour < 6) setDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <nav className="max-w-[680px] mx-auto px-6 pt-8 pb-2">
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm tracking-widest uppercase">
          {["About", "Talks", "News", "Timeline", "Writing", "soul.md"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(".", "")}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      <main className="max-w-[680px] mx-auto px-6 pt-10 pb-20">
        {/* About */}
        <header className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-5">About</h2>

          <div className="mt-6 relative">
            <img
              src="/photo.jpg"
              alt="Pier Luigi Dovesi"
              className="float-right ml-6 mb-4 w-32 sm:w-40 rounded-sm object-cover"
            />
            <p className="text-foreground">
              Hi, I'm Pier Luigi Dovesi. I go by Pier.
            </p>
          </div>

          <div className="mt-4 space-y-4" id="about">
            <p>
              I'm Co-Founder and Chair of{" "}
              <A href="https://thegoodailab.org">The Good AI Lab</A>, an independent AI lab working on foundational AI research and innovation projects for social good. Today we work with Doctors Without Borders (MSF), FMSI, and several universities around Europe.
            </p>
            <p>
              By day, I lead the Robotics and Autonomous Systems team at AMD Silo AI, working on world action models, multimodal AI, and embodied intelligence.
            </p>
            <p>
              My research spans domain adaptation, self-supervised learning, and real-time perception, with recent work extending toward vision-language models. Publications at CVPR, ECCV, ICCV, and ICRA.
            </p>
          </div>

          <p className="mt-6 text-[16px]">
            Find me at{" "}
            <A href="https://thegoodailab.org">The Good AI Lab</A>,{" "}
            <A href="https://github.com/pierluigidovesi">GitHub</A>,{" "}
            <A href="https://scholar.google.com/citations?user=t55rm6EAAAAJ&hl=en">Google Scholar</A>,{" "}
            <A href="https://www.linkedin.com/in/pierluigidovesi/">LinkedIn</A>,{" "}
            <A href="https://x.com/dovpie">X</A>,{" "}
            <A href="https://huggingface.co/dovpie">Hugging Face</A>,{" "}
            and <a href="mailto:pierluigidovesi@gmail.com" className="text-primary hover:underline underline-offset-2">email</a>.
          </p>
        </header>

        <hr className="border-border mb-14" />

        {/* Talks & Podcasts — tiles */}
        <Section id="talks" title="Talks & Podcasts">
          <div className="grid gap-3 sm:grid-cols-2">
            <TalkTile title="ICLR 2026 — AI4Peace" detail="Rio de Janeiro, Apr 2026" href="https://aiforpeaceworkshop.github.io/" tag="upcoming" />
            <TalkTile title="Warsaw AI Summit 2026" detail="Mar 2026" href="https://warsawaisummit.com/" tag="keynote" />
            <TalkTile title="Nordic HPC Summit 2025" detail="Where curiosity meets responsibility · Stockholm, Oct 2025" href="https://nordichpcsummit.enccs.se/" tag="keynote" />
            <TalkTile title="Redeye AI Theme Event" detail="The Good AI Lab · Stockholm, Mar 2025" href="https://www.redeye.se/video/event-presentation/1088678/the-good-ai-lab-co-founder-chair-ai-industry-expert-pier-luigi-dovesi-presents-at-redeye-theme-event-artificial-intelligence-2025-march-13" linkLabel="watch" />
            <TalkTile title="AIAW Podcast E143" detail="Revolutionizing AI and Autonomous Systems · Jan 2025" href="https://hyperight.com/aiaw-podcast-e143-revolutionizing-ai-and-autonomous-systems-pier-luigi-dovesi/" linkLabel="listen" />
            <TalkTile title="Auto.AI Europe 2024" detail="Data Alchemy — Berlin, Sep 2024" href="https://www.auto-ai.eu/peoples/pier-luigi-dovesi-2" />
            <TalkTile title="Nordic Industry Days 2024" detail="Supercomputing for AI · Copenhagen, Sep 2024" href="https://enccs.se/news/2024/09/nordic-industry-days-2024-in-retrospect/" />
            <TalkTile title="GAIA Conference 2024" detail="Embodied AI Beyond Datasets · Gothenburg, Apr 2024" href="https://www.gaia.fish/speakers2/pier-luigi-dovesi-2024" />
          </div>
        </Section>

        {/* News */}
        <Section id="news" title="News">
          <div className="space-y-0">
            <NewsItem date="Apr 2026" text="Invited speaker at" link="https://aiforpeaceworkshop.github.io/" linkText="ICLR 2026 AI4Peace Workshop" suffix=" (Rio de Janeiro) — autonomous systems and international humanitarian law" />
            <NewsItem date="Mar 2026" text="Keynote at" link="https://warsawaisummit.com/" linkText="Warsaw AI Summit 2026" />
            <NewsItem date="Feb 2026" text="Submitted" link="https://eccv.ecva.net/" linkText="CV4GOOD Workshop at ECCV 2026" suffix=" — Computer Vision for Humanitarian Action, with MSF" />
            <NewsItem date="Jan 2026" text="Published" link="https://thegoodailab.org/blog/from-self-driving-cars-to-self-driving-wars" linkText='"From Self-Driving Cars to Self-Driving Wars"' suffix=" — autonomy, AI weapons, and the illusion of control" />
            <NewsItem date="Dec 2025" text="" link="https://thegoodailab.org/blog/msf-from-principles-to-practice" linkText='"From Principles to Practice"' suffix=" — our work with Doctors Without Borders" />
            <NewsItem date="Oct 2025" text="Keynote at" link="https://nordichpcsummit.enccs.se/" linkText="Nordic HPC Summit 2025" suffix={' (Stockholm) — "Building The Good AI Lab: where curiosity meets responsibility"'} />
            <NewsItem date="Oct 2025" text="" link="https://thegoodailab.org/blog/msf-partnership" linkText="GAL and MSF announce partnership" suffix=" to bring responsible AI to humanitarian work" />
            <NewsItem date="Jul 2025" text="" link="https://thegoodailab.org/blog/vocalign" linkText="VocAlign" suffix=" accepted at BMVC 25 — source-free domain adaptation for open-vocabulary segmentation" />
            <NewsItem date="Mar 2025" text="" link="https://arxiv.org/abs/2307.15063" linkText="SemLA" suffix=" accepted at CVPR 25 — domain adaptation with LoRA retrieval and fusion" />
            <NewsItem date="Mar 2025" text="Presented GAL at" link="https://www.redeye.se/video/event-presentation/1088678/the-good-ai-lab-co-founder-chair-ai-industry-expert-pier-luigi-dovesi-presents-at-redeye-theme-event-artificial-intelligence-2025-march-13" linkText="Redeye AI Theme Event 2025" suffix=" (Stockholm)" />
            <NewsItem date="Jan 2025" text="Featured on" link="https://hyperight.com/aiaw-podcast-e143-revolutionizing-ai-and-autonomous-systems-pier-luigi-dovesi/" linkText="AIAW Podcast E143" suffix=" — Revolutionizing AI and Autonomous Systems" />
            <NewsItem date="Sep 2024" text="Speaker at" link="https://enccs.se/news/2024/09/nordic-industry-days-2024-in-retrospect/" linkText="Nordic Industry Days 2024" suffix=" (Copenhagen) — Supercomputing for AI, EuroHPC" />
            <NewsItem date="Sep 2024" text="Speaker at" link="https://www.auto-ai.eu/peoples/pier-luigi-dovesi-2" linkText="Auto.AI Europe" suffix={' (Berlin) — "Data Alchemy: Adapting and Creating with Limited Data"'} />
            <NewsItem date="Apr 2024" text="Speaker at" link="https://www.gaia.fish/speakers2/pier-luigi-dovesi-2024" linkText="GAIA Conference 2024" suffix={' (Gothenburg) — "Adapting Like Humans: Embodied AI Beyond Datasets and Domains"'} />
            <NewsItem date="Oct 2023" text="" link="https://arxiv.org/abs/2307.15063" linkText="HAMLET" suffix=" accepted at ICCV 2023 — real-time online domain adaptation" />
            <NewsItem date="Oct 2022" text="" link="https://arxiv.org/abs/2207.10667" linkText="OnDA" suffix=" accepted at ECCV 2022 — online domain adaptation" />
            <NewsItem date="May 2020" text="" link="https://arxiv.org/abs/1910.00541" linkText="Real-Time Semantic Stereo Matching" suffix=" accepted at ICRA 2020" />
            <NewsItem date="Aug 2019" text="" link="https://arxiv.org/abs/1908.03127" linkText="Enhancing Self-Supervised Monocular Depth Estimation with Traditional Visual Odometry" suffix=" accepted at 3DV 2019" />
          </div>
        </Section>

        {/* Timeline — dotted line with dots */}
        <Section id="timeline" title="Timeline">
          <div className="relative ml-3">
            {/* Vertical line */}
            <div className="absolute left-0 top-2 bottom-2 w-px border-l-2 border-dashed border-border" />
            <div className="space-y-8">
              <TimelineItem years="2025 – Present" org="The Good AI Lab" orgHref="https://thegoodailab.org" role="Co-Founder & Chair" featured>
                Non-profit AI research for social good. Partnering with MSF. Organizing CV4GOOD at ECCV 2026.
              </TimelineItem>
              <TimelineItem years="2024 – Present" org="AMD Silo AI" role="SMTS & Robotics and Autonomous Systems Lead" subtitle="part of AMD">
                Large GPU ecosystem for Physical AI. World models, VLMs, and VLAs.
              </TimelineItem>
              <TimelineItem years="2023 – 2024" org="Silo AI" role="Senior AI Scientist" subtitle="pre-AMD acquisition">
                LiDAR perception, LLMs, diffusion models.
              </TimelineItem>
              <TimelineItem years="2019 – 2023" org="Univrses" role="Deep Learning Engineer" subtitle="consulting at Zenseact">
                Real-time perception and safety for autonomous driving. Lots of HPOs. Domain Adaptation research.
              </TimelineItem>
              <TimelineItem years="2017 – 2019" org="KTH Royal Institute of Technology" role="MSc Systems, Control & Robotics" />
              <TimelineItem years="2013 – 2017" org="University of Bologna & Tongji University" role="BSc Automation Engineering" />
            </div>
          </div>
        </Section>

        {/* Writing */}
        <Section id="writing" title="Writing">
          <ul className="space-y-2">
            <li>
              <A href="https://thegoodailab.org/blog/from-self-driving-cars-to-self-driving-wars">From Self-Driving Cars to Self-Driving Wars</A>
              {" — autonomy, AI weapons, and the illusion of control (Jan 2026)"}
            </li>
            <li>
              <A href="https://thegoodailab.org/blog/msf-from-principles-to-practice">From Principles to Practice</A>
              {" — our work with Doctors Without Borders (Dec 2025)"}
            </li>
            <li>
              <A href="https://thegoodailab.org/blog/msf-partnership">GAL and MSF partner to bring responsible AI to humanitarian work</A>
              {" (Oct 2025)"}
            </li>
          </ul>
        </Section>

        {/* soul.md — dark mode only */}
        {dark && (
          <section id="soulmd" className="mt-20 pt-10 border-t border-border">
            <h2 className="text-sm font-mono text-muted-foreground mb-10" style={{ fontFamily: "'JetBrains Mono', monospace" }}>soul.md</h2>
            <div className="space-y-10">
              <Quote
                text="I think it's important now to tie care to Quality by pointing out that care and Quality are internal and external aspects of the same thing. A person who sees Quality and feels it as he works is a person who cares. A person who cares about what he sees and does is a person who's bound to have some characteristics of Quality."
                author="Robert M. Pirsig"
              />
              <Quote text="Pessimismo della realtà, ottimismo della speranza." author="Antonio Gramsci" />
              <Quote
                text="L'inferno dei viventi non è qualcosa che sarà; se ce n'è uno, è quello che è già qui, l'inferno che abitiamo tutti i giorni … Due modi ci sono per non soffrirne. Il primo riesce facile a molti: accettare l'inferno e diventarne parte fino al punto di non vederlo più. Il secondo è rischioso ed esige attenzione e apprendimento continui: cercare e saper riconoscere chi e cosa, in mezzo all'inferno, non è inferno, e farlo durare, e dargli spazio."
                author="Italo Calvino"
              />
              <Quote
                text="Innovation without a guiding purpose is hollow. Real progress means more than building better tools; it means building them for everyone, especially those too often overlooked or forgotten. [...] We see AI as a force that reveals new paths, includes more voices, and helps reshape society for the better. If we are to contribute with a verse to this powerful play, let it be driven by curiosity and guided by responsibility."
                author="The Good AI Lab Manifesto"
                authorHref="https://thegoodailab.org/manifesto"
              />
            </div>
          </section>
        )}
      </main>

      <footer className="max-w-[680px] mx-auto px-6 py-10 border-t border-border flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Pier Luigi Dovesi — Stockholm, Sweden
        </p>
        <button
          onClick={() => setDark((d) => !d)}
          className="text-muted-foreground hover:text-foreground transition-colors p-1"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </footer>
    </div>
  );
};

/* ---- Helpers ---- */

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener" className="text-primary hover:underline underline-offset-2">
    {children}
  </a>
);

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="mb-14 scroll-mt-12">
    <h2 className="text-2xl font-semibold text-foreground mb-5">{title}</h2>
    {children}
  </section>
);

const NewsItem = ({ date, text, link, linkText, suffix }: { date: string; text: string; link: string; linkText: string; suffix?: string }) => (
  <div className="flex gap-4 py-2.5 border-b border-border/50 last:border-b-0">
    <span className="text-sm text-muted-foreground whitespace-nowrap pt-0.5 w-[72px] shrink-0">{date}</span>
    <p className="leading-snug">
      {text && `${text} `}
      <A href={link}>{linkText}</A>
      {suffix}
    </p>
  </div>
);

const TalkTile = ({ title, detail, href, linkLabel = "info", tag }: { title: string; detail: string; href: string; linkLabel?: string; tag?: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener"
    className="block rounded-md border border-border bg-card p-4 hover:border-primary/40 hover:shadow-sm transition-all group"
  >
    <div className="flex items-start justify-between gap-2">
      <h3 className="font-semibold text-foreground text-[16px] leading-snug group-hover:text-primary transition-colors">{title}</h3>
      {tag && <span className="text-primary text-xs italic whitespace-nowrap mt-0.5">({tag})</span>}
    </div>
    <p className="text-muted-foreground text-sm mt-1.5 leading-snug">{detail}</p>
    <span className="text-primary text-sm mt-2 inline-block opacity-70 group-hover:opacity-100 transition-opacity">{linkLabel} →</span>
  </a>
);

const TimelineItem = ({
  years, org, orgHref, role, subtitle, featured, children,
}: {
  years: string; org: string; orgHref?: string; role: string; subtitle?: string; featured?: boolean; children?: React.ReactNode;
}) => (
  <div className="relative pl-7">
    {/* Dot */}
    <div className="absolute left-0 top-[10px] -translate-x-[5px] w-[10px] h-[10px] rounded-full border-2 border-primary bg-background" />
    <p className="text-sm text-muted-foreground">{years}</p>
    <p className={featured ? "text-primary font-semibold" : "font-semibold text-foreground"}>
      {orgHref ? <a href={orgHref} target="_blank" rel="noopener" className={featured ? "text-primary hover:underline underline-offset-2" : "text-foreground hover:underline underline-offset-2"}>{org}</a> : org}
      <span className="font-normal text-muted-foreground"> — {role}</span>
    </p>
    {subtitle && <p className="text-sm text-muted-foreground italic">{subtitle}</p>}
    {children && <p className="text-muted-foreground mt-1">{children}</p>}
  </div>
);

const Quote = ({ text, author, authorHref }: { text: string; author: string; authorHref?: string }) => (
  <blockquote className="border-l-2 border-primary/40 pl-5">
    <p className="italic text-foreground/80 leading-relaxed">{text}</p>
    <p className="text-sm text-muted-foreground mt-2">
      — {authorHref ? <A href={authorHref}>{author}</A> : author}
    </p>
  </blockquote>
);

export default Index;
