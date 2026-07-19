const DANGEROUS_PATTERNS = [
  "git push",
  "git reset --hard",
  "git clean -fd",
  "git clean -f",
  "git branch -D",
  "git checkout \\.",
  "git restore \\.",
  "push --force",
  "reset --hard",
];

export const GitGuardrails = async () => {
  return {
    "tool.execute.before": async (input, output) => {
      if (input.tool !== "bash") return;

      const command = output.args?.command;
      if (typeof command !== "string") return;

      for (const pattern of DANGEROUS_PATTERNS) {
        if (new RegExp(pattern).test(command)) {
          throw new Error(
            `BLOCKED: '${command}' matches dangerous git pattern '${pattern}'. The user has prevented you from running this.`,
          );
        }
      }
    },
  };
};