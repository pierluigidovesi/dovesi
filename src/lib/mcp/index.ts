import { defineMcp } from "@lovable.dev/mcp-js";
import getBio from "./tools/get-bio";
import listTalks from "./tools/list-talks";
import listNews from "./tools/list-news";
import listTimeline from "./tools/list-timeline";
import listWriting from "./tools/list-writing";
import listPublications from "./tools/list-publications";
import searchContent from "./tools/search-content";

export default defineMcp({
  name: "dovesi-dev-mcp",
  title: "dovesi.dev",
  version: "0.1.0",
  instructions:
    "Read-only tools for Pier Luigi Dovesi's personal site (dovesi.dev): bio, talks and podcasts, news, career timeline, writing, and publications. Use search_content for keyword lookups across all sections.",
  tools: [getBio, listTalks, listNews, listTimeline, listWriting, listPublications, searchContent],
});