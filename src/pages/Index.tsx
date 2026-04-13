import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import HoughBackground from "@/components/HoughBackground";
import { bio, links, talks, news, timeline, writing, quotes } from "@/data";

const Index = () => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative">
      <HoughBackground />

      {/* Smooth vignette: fades background color over Hough lines behind content */}
      <div
        className="fixed inset-0 pointer-events-none bg-background transition-colors duration-300"
        style={{
          zIndex: 1,
          maskImage:
            "radial-gradient(ellipse 55% 70% at 50% 45%, black 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 55% 70% at 50% 45%, black 0%, black 30%, transparent 100%)",
        }}
      />

      <nav className="max-w-[680px] mx-auto px-6 pt-8 pb-2 relative" style={{ zIndex: 2 }}>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm tracking-widest uppercase">
          {["About", "Talks", "News", "Timeline", "Writing", ...(dark ? ["soul.md"] : [])].map((item) => (
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

      <main className="max-w-[680px] mx-auto px-6 pt-10 pb-20 relative" style={{ zIndex: 2 }}>
        {/* About */}
        <header id="about" className="mb-16 scroll-mt-12">
          <h1 className="text-2xl font-semibold text-foreground mb-5">About</h1>

          <div className="mt-6 relative">
            <img
              src="/photo.jpg"
              alt="Pier Luigi Dovesi speaking at a conference"
              width={1578}
              height={1579}
              fetchPriority="high"
              className="float-right ml-6 mb-4 w-32 sm:w-40 rounded-sm object-cover"
            />
            <p className="text-foreground">
              Hi, I'm {bio.name}. I go by {bio.shortName}.
            </p>
          </div>

          <div className="mt-4 space-y-4">
            <p>
              I'm Co-Founder and Chair of{" "}
              <A href="https://thegoodailab.org">The Good AI Lab</A>, an independent AI lab working on foundational AI research and innovation projects for social good. Today we work with Doctors Without Borders (MSF), FMSI, and several universities around Europe.
            </p>
            <p>
              By day, I lead the Robotics and Autonomous Systems team at AMD Silo AI, working on world action models, multimodal AI, and embodied intelligence.
            </p>
            <p>
              My research spans domain adaptation, self-supervised learning, and real-time perception, with recent work extending toward vision-language models. Publications at CVPR, ECCV, ICCV, 3DV, and ICRA.
            </p>
          </div>

          <p className="mt-6 text-[16px]">
            Find me at{" "}
            {links.map((l, i) => (
              <span key={l.label}>
                <A href={l.href}>{l.label}</A>
                {i < links.length - 1 ? ", " : ", "}
              </span>
            ))}
            and <a href={`mailto:${bio.email}`} className="text-primary hover:underline underline-offset-2">email</a>.
          </p>
        </header>

        <hr className="border-border mb-14" />

        {/* Talks & Podcasts — tiles */}
        <Section id="talks" title="Talks & Podcasts">
          <div className="grid gap-3 sm:grid-cols-2">
            {talks.map((t) => (
              <TalkTile key={t.title} title={t.title} detail={t.detail} href={t.href} linkLabel={t.linkLabel} tag={t.tag} />
            ))}
          </div>
        </Section>

        {/* News */}
        <Section id="news" title="News">
          <div className="space-y-0">
            {news.map((n, i) => (
              <NewsItem key={i} date={n.date} text={n.text} link={n.link} linkText={n.linkText} suffix={n.suffix} />
            ))}
          </div>
        </Section>

        {/* Timeline — dotted line with dots */}
        <Section id="timeline" title="Timeline">
          <div className="relative ml-3">
            {/* Vertical line */}
            <div className="absolute left-0 top-2 bottom-2 w-px border-l-2 border-dashed border-border" />
            <div className="space-y-8">
              {timeline.map((t) => (
                <TimelineItem key={t.org} years={t.years} org={t.org} orgHref={t.orgHref} role={t.role} subtitle={t.subtitle} featured={t.featured}>
                  {t.description}
                </TimelineItem>
              ))}
            </div>
          </div>
        </Section>

        {/* Writing */}
        <Section id="writing" title="Writing">
          <ul className="space-y-2">
            {writing.map((w) => (
              <li key={w.href}>
                <A href={w.href}>{w.title}</A>
                {w.description ? ` — ${w.description} (${w.date})` : ` (${w.date})`}
              </li>
            ))}
          </ul>
        </Section>

        {/* soul.md — dark mode only */}
        {dark && (
          <section id="soulmd" className="mt-20 pt-10 border-t border-border">
            <h2 className="text-sm font-mono text-muted-foreground mb-10" style={{ fontFamily: "'JetBrains Mono', monospace" }}>soul.md</h2>
            <div className="space-y-10">
              {quotes.map((q, i) => (
                <Quote key={i} text={q.text} author={q.author} authorHref={q.authorHref} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="max-w-[680px] mx-auto px-6 py-10 border-t border-border flex items-center justify-between relative" style={{ zIndex: 2 }}>
        <p className="text-sm text-muted-foreground">
          {bio.name} — {bio.location}
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
