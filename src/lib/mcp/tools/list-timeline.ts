import { defineTool } from "@lovable.dev/mcp-js";
import { timeline } from "../../../data";

export default defineTool({
  name: "list_timeline",
  title: "List career timeline",
  description: "Return Pier Luigi Dovesi's career and education timeline (roles, organizations, dates).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(timeline, null, 2) }],
    structuredContent: { timeline },
  }),
});