import type { Preview } from "@storybook/nextjs";

import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    a11y: {
      test: "todo",
    },
    backgrounds: {
      default: "Umbra light",
      values: [
        { name: "Umbra light", value: "oklch(0.985 0.018 91)" },
        { name: "Umbra dark", value: "oklch(0.16 0.024 72)" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
};

export default preview;
