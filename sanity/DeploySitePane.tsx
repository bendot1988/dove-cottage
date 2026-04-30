import { useState } from "react";
import { Box, Button, Card, Stack, Text, useToast } from "@sanity/ui";

const buildHookUrl = process.env.SANITY_STUDIO_NETLIFY_BUILD_HOOK_URL;

export default function DeploySitePane() {
  const toast = useToast();
  const [isDeploying, setIsDeploying] = useState(false);

  const triggerDeploy = async () => {
    if (!buildHookUrl) {
      toast.push({
        status: "error",
        title: "Missing build hook URL",
        description: "Set SANITY_STUDIO_NETLIFY_BUILD_HOOK_URL and redeploy Studio.",
      });
      return;
    }

    try {
      setIsDeploying(true);
      await fetch(buildHookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source: "sanity-studio-manual-deploy" }),
      });

      toast.push({
        status: "success",
        title: "Deploy request sent",
        description: "Netlify should start a new deploy in a few seconds.",
      });
    } catch {
      toast.push({
        status: "error",
        title: "Deploy failed to send",
        description: "Please check your network connection and hook URL.",
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <Box padding={4}>
      <Card border radius={3} padding={4}>
        <Stack space={4}>
          <Text size={2}>
            Trigger a manual Netlify deploy after publishing content in Sanity.
          </Text>
          <Button
            text={isDeploying ? "Triggering deploy..." : "Deploy Site"}
            tone="primary"
            onClick={triggerDeploy}
            disabled={isDeploying}
          />
          <Text size={1} muted>
            This button uses SANITY_STUDIO_NETLIFY_BUILD_HOOK_URL.
          </Text>
        </Stack>
      </Card>
    </Box>
  );
}
