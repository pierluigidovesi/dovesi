import { defineTool } from "@lovable.dev/mcp-js";
import { bio, links } from "../../../data";

export default defineTool({
  name: "get_bio",
  title: "Get bio",
  description: "Return Pier Luigi Dovesi's short bio, tagline, location, email, and public profile links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ ...bio, links }, null, 2) }],
    structuredContent: { bio, links },
  }),
});