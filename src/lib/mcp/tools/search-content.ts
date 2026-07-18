import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { talks, news, timeline, writing, publications } from "../../../data";

type Hit = { section: string; text: string; href?: string };

export default defineTool({
  name: "search_content",
  title: "Search site content",
  description: "Case-insensitive keyword search across talks, news, timeline, writing, and publications on dovesi.dev.",
  inputSchema: {
    query: z.string().min(1).describe("Keyword or phrase to search for."),
    limit: z.number().int().min(1).max(50).optional().describe("Max results to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, limit }) => {
    const q = query.toLowerCase();
    const cap = limit ?? 20;
    const hits: Hit[] = [];
    const push = (h: Hit) => { if (h.text.toLowerCase().includes(q)) hits.push(h); };

    talks.forEach((t) => push({ section: "talks", text: `${t.title} — ${t.detail}${t.tag ? ` (${t.tag})` : ""}`, href: t.href }));
    news.forEach((n) => push({ section: "news", text: `${n.date} — ${n.text} ${n.linkText}${n.suffix ?? ""}`, href: n.link }));
    timeline.forEach((t) => push({ section: "timeline", text: `${t.years} — ${t.org} — ${t.role}${t.description ? `. ${t.description}` : ""}`, href: t.orgHref }));
    writing.forEach((w) => push({ section: "writing", text: `${w.title} — ${w.description} (${w.date})`, href: w.href }));
    publications.forEach((p) => push({ section: "publications", text: p }));

    const trimmed = hits.slice(0, cap);
    return {
      content: [{ type: "text", text: JSON.stringify({ query, count: trimmed.length, results: trimmed }, null, 2) }],
      structuredContent: { query, count: trimmed.length, results: trimmed },
    };
  },
});