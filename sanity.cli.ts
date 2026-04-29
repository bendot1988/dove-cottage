import { defineCliConfig } from "sanity/cli";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "juhj0d5o";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    appId: "lx0x0b1ocq1u7kuv39qt2f3m",
  },
});
