import { defineTool } from "@lovable.dev/mcp-js";
import { talks } from "../../../data";

export default defineTool({
  name: "list_talks",
  title: "List talks and podcasts",
  description: "List Pier Luigi Dovesi's talks, keynotes, workshops, and podcast appearances (sorted newest first).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(talks, null, 2) }],
    structuredContent: { talks },
  }),
});