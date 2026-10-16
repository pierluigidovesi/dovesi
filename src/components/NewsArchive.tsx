import { useEffect, useRef } from "react";
import { news, type NewsEntry } from "@/data";

const RECENT_COUNT = 10;

export default function NewsArchive() {
  const archiveRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const archive = archiveRef.current;
    if (!archive) return;
    let scrollFrame: number | undefined;
    let openBeforePrint: boolean | undefined;

    const revealLinkedUpdate = () => {
      if (scrollFrame !== undefined) cancelAnimationFrame(scrollFrame);
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target || !archive.contains(target)) return;
      archive.open = true;
      // Opening the archive changes its layout. Scroll once the target is visible.
      scrollFrame = requestAnimationFrame(() => target.scrollIntoView({ behavior: "instant", block: "start" }));
    };
    const beforePrint = () => {
      openBeforePrint ??= archive.open;
      archive.open = true;
    };
    const afterPrint = () => {
      if (openBeforePrint !== undefined) archive.open = openBeforePrint;
      openBeforePrint = undefined;
    };

    revealLinkedUpdate();
    window.addEventListener("hashchange", revealLinkedUpdate);
    window.addEventListener("beforeprint", beforePrint);
    window.addEventListener("afterprint", afterPrint);
    return () => {
      if (scrollFrame !== undefined) cancelAnimationFrame(scrollFrame);
      window.removeEventListener("hashchange", revealLinkedUpdate);
      window.removeEventListener("beforeprint", beforePrint);
      window.removeEventListener("afterprint", afterPrint);
    };
  }, []);

  return (
    <>
      <div>{news.slice(0, RECENT_COUNT).map((item) => <NewsItem key={item.id} {...item} />)}</div>
      {news.length > RECENT_COUNT && (
        <details ref={archiveRef} className="news-archive mt-3 group">
          <summary className="cursor-pointer text-primary text-sm py-2 hover:underline underline-offset-2">
            <span className="group-open:hidden">Earlier updates ({news.length - RECENT_COUNT})</span>
            <span className="hidden group-open:inline">Hide earlier updates</span>
          </summary>
          <div>{news.slice(RECENT_COUNT).map((item) => <NewsItem key={item.id} {...item} />)}</div>
        </details>
      )}
    </>
  );
}

const NewsItem = ({ id, date, text, link, linkText, suffix }: NewsEntry) => (
  <div id={id} className="news-item scroll-mt-12 flex gap-4 py-2.5 border-b border-border/50 last:border-b-0">
    <span className="text-sm text-muted-foreground whitespace-nowrap pt-0.5 w-[72px] shrink-0">{date}</span>
    <p className="leading-snug">
      {text && `${text} `}
      <a href={link} target="_blank" rel="noopener" className="text-primary hover:underline underline-offset-2">{linkText}</a>
      {suffix}
    </p>
  </div>
);
