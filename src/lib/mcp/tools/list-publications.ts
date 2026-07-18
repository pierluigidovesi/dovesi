import { defineTool } from "@lovable.dev/mcp-js";
import { publications } from "../../../data";

export default defineTool({
  name: "list_publications",
  title: "List publications",
  description: "Return selected academic publications by Pier Luigi Dovesi (venue and short description).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(publications, null, 2) }],
    structuredContent: { publications },
  }),
});