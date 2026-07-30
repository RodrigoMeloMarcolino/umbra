import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Design System/Tokens",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const colors = [
  ["Background", "bg-background", "text-foreground"],
  ["Foreground", "bg-foreground", "text-background"],
  ["Card", "bg-card", "text-card-foreground"],
  ["Primary", "bg-primary", "text-primary-foreground"],
  ["Secondary", "bg-secondary", "text-secondary-foreground"],
  ["Accent", "bg-accent", "text-accent-foreground"],
  ["Muted", "bg-muted", "text-muted-foreground"],
  ["Destructive", "bg-destructive", "text-white"],
];

export const SolarPremium: Story = {
  render: () => (
    <main className="min-h-screen w-full p-8">
      <section className="mx-auto grid max-w-6xl gap-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">Umbra DS</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Solar premium</h1>
          <p className="mt-3 text-muted-foreground">
            Um sistema visual claro, quente e preciso para transformar disponibilidade em confiança.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {colors.map(([name, bg, fg]) => (
            <div key={name} className={`${bg} ${fg} rounded-2xl border border-border/70 p-5 shadow-card`}>
              <div className="text-sm font-semibold">{name}</div>
              <div className="mt-8 text-xs opacity-75">{bg.replace("bg-", "--")}</div>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">Radius</p>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {["rounded-sm", "rounded-md", "rounded-lg", "rounded-2xl"].map((radius) => (
                <div key={radius} className={`${radius} h-14 bg-primary/20 ring-1 ring-primary/30`} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">Typography</p>
            <div className="mt-3 space-y-2">
              <p className="text-3xl font-semibold tracking-tight">Horários com presença</p>
              <p className="text-sm text-muted-foreground">Legibilidade antes de ornamento.</p>
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <p className="text-sm text-muted-foreground">Shadow</p>
            <p className="mt-3 text-lg font-semibold">Sombra suave, produto calmo.</p>
          </div>
        </div>
      </section>
    </main>
  ),
};
