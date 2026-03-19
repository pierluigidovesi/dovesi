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
      {/* Simple top nav - not sticky, just sits there */}
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
        {/* Hero */}
        <header className="mb-16">
          <h1 className="text-4xl font-semibold text-foreground mb-1">About</h1>

          <div className="mt-6 relative">
            <img
              src="/photo.jpg"
              alt="Pier Luigi Dovesi"
              className="float-right ml-6 mb-4 w-32 sm:w-40 rounded-sm object-cover"
            />
            <p className="text-foreground">
              I go by Pier.
            </p>
          </div>

          <div className="mt-4 space-y-4" id="about">
            <p>
              I'm Co-Founder and Chair of{" "}
              <A href="https://thegoodailab.org">The Good AI Lab (GAL)</A>, an independent AI lab working on foundational AI research and innovation projects for social good. We are a non-profit AI research collective — scientists, professors, engineers, researchers, and developers — coming together from top universities, labs, and companies. Hand-in-hand with charitable non-profit organisations, we promote and develop AI applications that drive tangible improvements. Our current partnerships include Doctors Without Borders (MSF).
            </p>
            <p>
              By day, I lead the Robotics and Autonomous Systems team at AMD Silo AI, where I work on multimodal AI, generative models, and embodied intelligence for autonomous vehicles and robots.
            </p>
            <p>
              My research spans unsupervised domain adaptation, real-time perception, and generative AI, with publications at CVPR, ECCV, ICCV, and ICRA.
            </p>
          </div>

          {/* Social - inline text links like hoanh.space */}
          <p className="mt-6 text-[16px]">
            You can find me at{" "}
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

        {/* Featured Talks & Podcasts - moved up */}
        <Section id="talks" title="Talks & Podcasts">
          <ul className="space-y-3">
            <TalkItem title="ICLR 2026 — AI4Peace Workshop" detail="Autonomous Systems and IHL · Rio de Janeiro, Apr 2026" href="https://aiforpeaceworkshop.github.io/" tag="upcoming" />
            <TalkItem title="Warsaw AI Summit 2026" detail="Mar 2026" href="https://warsawaisummit.com/" tag="keynote" />
            <TalkItem title="Nordic HPC Summit 2025" detail="Keynote — Building The Good AI Lab: where curiosity meets responsibility · Stockholm, Oct 2025" href="https://nordichpcsummit.enccs.se/" tag="keynote" />
            <TalkItem title="Redeye AI Theme Event 2025" detail="The Good AI Lab · Mar 2025" href="https://www.redeye.se/video/event-presentation/1088678/the-good-ai-lab-co-founder-chair-ai-industry-expert-pier-luigi-dovesi-presents-at-redeye-theme-event-artificial-intelligence-2025-march-13" linkLabel="watch" />
            <TalkItem title="AIAW Podcast E143" detail="Revolutionizing AI and Autonomous Systems · Jan 2025" href="https://hyperight.com/aiaw-podcast-e143-revolutionizing-ai-and-autonomous-systems-pier-luigi-dovesi/" linkLabel="listen" />
            <TalkItem title="Auto.AI Europe 2024" detail="Data Alchemy — Adapting and Creating with Limited Data · Sep 2024" href="https://www.auto-ai.eu/peoples/pier-luigi-dovesi-2" />
            <TalkItem title="Nordic Industry Days 2024" detail="Supercomputing for AI, EuroHPC · Copenhagen, Sep 2024" href="https://enccs.se/news/2024/09/nordic-industry-days-2024-in-retrospect/" />
            <TalkItem title="GAIA Conference 2024" detail="Adapting Like Humans: Embodied AI Beyond Datasets and Domains · Apr 2024" href="https://www.gaia.fish/speakers2/pier-luigi-dovesi-2024" />
          </ul>
        </Section>

        {/* News */}
        <Section id="news" title="News">
          <ul className="space-y-2">
            <NewsItem date="Apr 2026" text="Invited speaker at" link="https://aiforpeaceworkshop.github.io/" linkText="ICLR 2026 AI4Peace Workshop" suffix=" (Rio de Janeiro) — autonomous systems and international humanitarian law" />
            <NewsItem date="Mar 2026" text="Keynote at" link="https://warsawaisummit.com/" linkText="Warsaw AI Summit 2026" />
            <NewsItem date="2026" text="Organizing the" link="https://thegoodailab.org" linkText="CV4GOOD Workshop at ECCV 2026" suffix=" — Computer Vision for Humanitarian Action, with MSF" />
            <NewsItem date="Jan 2026" text="Published" link="https://thegoodailab.org/blog/from-self-driving-cars-to-self-driving-wars" linkText='"From Self-Driving Cars to Self-Driving Wars"' suffix=" — autonomy, AI weapons, and the illusion of control" />
            <NewsItem date="Dec 2025" text="" link="https://thegoodailab.org/blog/msf-from-principles-to-practice" linkText='"From Principles to Practice"' suffix=" — our work with Doctors Without Borders" />
            <NewsItem date="Oct 2025" text="" link="https://thegoodailab.org/blog/msf-partnership" linkText="GAL and MSF announce partnership" suffix=" to bring responsible AI to humanitarian work" />
            <NewsItem date="Sep 2025" text="" link="https://thegoodailab.org/blog/vocalign" linkText="VocAlign" suffix=" published — source-free domain adaptation for open-vocabulary segmentation" />
            <NewsItem date="Oct 2025" text="Keynote at" link="https://nordichpcsummit.enccs.se/" linkText="Nordic HPC Summit 2025" suffix=' (Stockholm) — "Building The Good AI Lab: where curiosity meets responsibility"' />
            <NewsItem date="Mar 2025" text="Presented GAL at" link="https://www.redeye.se/video/event-presentation/1088678/the-good-ai-lab-co-founder-chair-ai-industry-expert-pier-luigi-dovesi-presents-at-redeye-theme-event-artificial-intelligence-2025-march-13" linkText="Redeye AI Theme Event 2025" />
            <NewsItem date="Jan 2025" text="Featured on" link="https://hyperight.com/aiaw-podcast-e143-revolutionizing-ai-and-autonomous-systems-pier-luigi-dovesi/" linkText="AIAW Podcast E143" suffix=" — Revolutionizing AI and Autonomous Systems" />
            <NewsItem date="Sep 2024" text="Speaker at" link="https://enccs.se/news/2024/09/nordic-industry-days-2024-in-retrospect/" linkText="Nordic Industry Days 2024" suffix=" (Copenhagen) — Supercomputing for AI, EuroHPC" />
            <NewsItem date="Sep 2024" text="Speaker at" link="https://www.auto-ai.eu/peoples/pier-luigi-dovesi-2" linkText="Auto.AI Europe" suffix=' — "Data Alchemy: Adapting and Creating with Limited Data"' />
            <NewsItem date="Apr 2024" text="Speaker at" link="https://www.gaia.fish/speakers2/pier-luigi-dovesi-2024" linkText="GAIA Conference 2024" suffix=' — "Adapting Like Humans: Embodied AI Beyond Datasets and Domains"' />
            <NewsItem date="Oct 2023" text="" link="https://arxiv.org/abs/2307.15063" linkText="HAMLET" suffix=" accepted at ICCV 2023" />
            <NewsItem date="Oct 2022" text="" link="https://arxiv.org/abs/2207.10667" linkText="OnDA" suffix=" accepted at ECCV 2022" />
            <NewsItem date="May 2020" text="" link="https://arxiv.org/abs/1910.00541" linkText="Real-Time Semantic Stereo Matching" suffix=" accepted at ICRA 2020" />
            <NewsItem date="2019" text="" link="https://arxiv.org/abs/1908.03127" linkText="Enhancing Self-Supervised Monocular Depth Estimation with Traditional Visual Odometry" suffix=" accepted at 3DV 2019" />
          </ul>
        </Section>

        {/* Timeline */}
        <Section id="timeline" title="Timeline">
          <div className="space-y-6">
            <TimelineItem years="2025 – Present" org="The Good AI Lab" role="Co-Founder & Chair" featured>
              An independent AI lab working on foundational AI research and innovation projects for social good. Partnerships with Doctors Without Borders (MSF). Organizing CV4GOOD at ECCV 2026.
              {" → "}<A href="https://thegoodailab.org">thegoodailab.org</A>
            </TimelineItem>
            <TimelineItem years="2024 – Present" org="AMD Silo AI" role="SMTS & Robotics and Autonomous Systems Lead">
              Multimodal AI, generative models, and embodied intelligence for autonomous vehicles and robots.
            </TimelineItem>
            <TimelineItem years="2023 – 2024" org="Silo AI" role="Senior AI Scientist">
              Deployed LLMs for coding, autonomous systems, diffusion models. Before AMD's acquisition of Silo AI.
            </TimelineItem>
            <TimelineItem years="2019 – 2023" org="Univrses" role="Deep Learning Engineer" subtitle="consulting at Zenseact">
              Domain adaptation, real-time perception, semantic segmentation for autonomous driving.
            </TimelineItem>
            <TimelineItem years="2017 – 2019" org="KTH Royal Institute of Technology" role="MSc Systems, Control & Robotics" />
            <TimelineItem years="2013 – 2017" org="University of Bologna & Tongji University" role="BSc Automation Engineering" />
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" title="Projects">
          <div className="space-y-4">
            <p>
              <strong>MSF AI Training Program</strong> — A two-level AI training program designed for Doctors Without Borders (MSF Italy), covering responsible AI adoption for humanitarian staff.
            </p>
            <p>
              <strong>"From Self-Driving Cars to Self-Driving Wars"</strong> — A long-form essay on the pipeline from autonomous driving to autonomous weapons and the illusion of human control.{" "}
              <A href="https://thegoodailab.org/blog/from-self-driving-cars-to-self-driving-wars">Read →</A>
            </p>
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
          <p className="mt-4 text-[15px] text-muted-foreground">
            More at <A href="https://thegoodailab.org/blog">thegoodailab.org/blog</A> · Full publication list on{" "}
            <A href="https://scholar.google.com/citations?user=t55rm6EAAAAJ&hl=en">Google Scholar</A>
          </p>
        </Section>

        {/* Community */}
        <Section id="community" title="Community">
          <ul className="space-y-1">
            <li>Mentor at Women in AI</li>
            <li>Workshop organizer: CV4GOOD @ ECCV 2026</li>
            <li>Reviewer: CVPR, ECCV, ICCV, ICRA</li>
            <li>Speaker: ICLR, Nordic HPC Summit, Warsaw AI Summit, GAIA, AIAW, Redeye, Auto.AI, Nordic Industry Days</li>
          </ul>
        </Section>

        {/* soul.md */}
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
      </main>

      {/* Footer */}
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
  <li>
    <strong>[{date}]</strong>{" "}
    {text && `${text} `}
    <A href={link}>{linkText}</A>
    {suffix}
  </li>
);

const TalkItem = ({ title, detail, href, linkLabel = "info", tag }: { title: string; detail: string; href: string; linkLabel?: string; tag?: string }) => (
  <li className="pb-1">
    <span className="font-medium text-foreground">{title}</span>
    {tag && <span className="text-primary text-sm ml-2 italic">({tag})</span>}
    <br />
    <span className="text-muted-foreground text-[16px]">{detail}</span>
    {" — "}
    <A href={href}>{linkLabel}</A>
  </li>
);

const TimelineItem = ({
  years, org, role, subtitle, featured, children,
}: {
  years: string; org: string; role: string; subtitle?: string; featured?: boolean; children?: React.ReactNode;
}) => (
  <div>
    <p className="text-sm text-muted-foreground">{years}</p>
    <p className={featured ? "text-primary font-semibold" : "font-semibold text-foreground"}>
      {org}
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
