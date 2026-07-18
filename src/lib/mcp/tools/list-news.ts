import { defineTool } from "@lovable.dev/mcp-js";
import { news } from "../../../data";

export default defineTool({
  name: "list_news",
  title: "List news",
  description: "List news updates, publications, and announcements from Pier Luigi Dovesi's site (sorted newest first).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(news, null, 2) }],
    structuredContent: { news },
  }),
});