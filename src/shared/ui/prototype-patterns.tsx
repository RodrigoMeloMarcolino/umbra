import type { ReactNode } from "react";
import { AlertCircle, ChevronLeft, ChevronRight, Inbox, LockKeyhole } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="text-2xl font-semibold tracking-tight">{title}</h1>{description && <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>}</div>{action}</header>;
}

export function EmptyState({ title = "Ainda não há itens", description = "Quando houver informações para mostrar, elas aparecerão aqui.", action }: { title?: string; description?: string; action?: ReactNode }) {
  return <Card><CardContent className="grid min-h-52 place-items-center p-6 text-center"><div className="grid max-w-sm gap-2"><Inbox className="mx-auto size-7 text-primary" /><h2 className="font-semibold">{title}</h2><p className="text-sm text-muted-foreground">{description}</p>{action}</div></CardContent></Card>;
}

export function FeedbackPanel({ kind = "error", title, description }: { kind?: "error" | "warning" | "forbidden"; title: string; description: string }) {
  const Icon = kind === "forbidden" ? LockKeyhole : AlertCircle;
  return <Card className={kind === "error" ? "border-destructive/40" : "border-warning/60"}><CardContent className="flex gap-3 p-5"><Icon className={kind === "error" ? "mt-0.5 size-5 text-destructive" : "mt-0.5 size-5 text-warning-foreground"} /><div><h2 className="font-semibold">{title}</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p></div></CardContent></Card>;
}

export function Pagination({ page = 1, total = 3 }: { page?: number; total?: number }) {
  return <nav aria-label="Paginação" className="flex items-center justify-between gap-3"><Button variant="outline" disabled={page === 1}><ChevronLeft /> Anterior</Button><span className="text-sm text-muted-foreground">Página {page} de {total}</span><Button variant="outline" disabled={page === total}>Próxima <ChevronRight /></Button></nav>;
}

export function PrototypeCard({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return <Card><CardHeader><CardTitle>{title}</CardTitle>{description && <CardDescription>{description}</CardDescription>}</CardHeader><CardContent>{children}</CardContent></Card>;
}
