"use client";
import { useState, type ReactNode } from "react";
import { Badge } from "@/shared/ui/badge";
import { EmptyState } from "@/shared/ui/prototype-patterns";
import { MonthPicker } from "@/features/calendar/prototypes/month-picker";

export type CalendarSurface = "month" | "week" | "day" | "availability";
export type CalendarState = "ready" | "loading" | "empty";
export function CalendarSurfaces({ surface = "week", state = "ready", readonly = false, timezone = "America/Fortaleza", dst = false }: { surface?: CalendarSurface; state?: CalendarState; readonly?: boolean; timezone?: string; dst?: boolean }) {
  const [selected, setSelected] = useState("09:15");
  if (state === "loading") return <div className="grid gap-3 p-5 animate-pulse"><div className="h-11 rounded bg-muted" /><div className="h-96 rounded bg-muted" /></div>;
  if (state === "empty") return <div className="p-5"><EmptyState title="Nenhum compromisso neste período" /></div>;
  const columns = surface === "day" ? ["Terça, 14"] : ["Seg 13", "Ter 14", "Qua 15", "Qui 16", "Sex 17"];
  if (surface === "month") return <div className="p-5"><MonthPicker visibleMonth="Julho 2026" selectedDate="2026-07-14" today="2026-07-30" days={Array.from({ length: 31 }, (_, i) => ({ date: `2026-07-${String(i + 1).padStart(2, "0")}`, label: String(i + 1), state: i + 1 < 14 ? "past" as const : "available" as const }))} /></div>;
  const slots: ReactNode[] = [];
  "08:00 08:15 08:30 08:45 09:00 09:15 09:30 09:45 10:00".split(" ").forEach((time, row) => { slots.push(<span key={`label-${time}`} className="bg-card p-2 text-xs text-muted-foreground">{time}</span>); columns.forEach((column, col) => slots.push(<button key={`${column}-${time}`} disabled={readonly} onClick={() => setSelected(time)} className={`min-h-10 bg-card p-1 text-left text-xs focus-visible:ring-3 focus-visible:ring-ring ${surface === "availability" && row > 1 && row < 7 ? "bg-primary/15 hover:bg-primary/25" : ""} ${surface !== "availability" && ((col === 1 && row === 5) || (col === 1 && row === 6) || (col === 2 && row === 5) ? "bg-secondary" : "")}`}>{surface !== "availability" && col === 1 && row === 5 ? <span><b>{selected}</b><br />Marina · Corte</span> : null}</button>)); });
  return <section className="p-5"><header className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h1 className="font-semibold">{surface === "availability" ? "Disponibilidade semanal" : `${surface === "week" ? "Semana" : "Dia"} da agenda`}</h1><p className="text-sm text-muted-foreground">{timezone}{dst ? " · semana de transição DST (23h)" : ""}</p></div><Badge variant="outline">{readonly ? "Somente leitura" : "Interativo"}</Badge></header><div className="grid min-w-[42rem] grid-cols-[4rem_repeat(5,minmax(8rem,1fr))] gap-px overflow-x-auto rounded-xl border bg-border"><div className="bg-card" />{columns.map((x) => <b key={x} className="bg-card p-3 text-center text-sm">{x}</b>)}{slots}</div></section>;
}
