import { defineTool } from "@lovable.dev/mcp-js";
import { writing } from "../../../data";

export default defineTool({
  name: "list_writing",
  title: "List writing",
  description: "List essays and blog posts by Pier Luigi Dovesi (sorted newest first).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(writing, null, 2) }],
    structuredContent: { writing },
  }),
});