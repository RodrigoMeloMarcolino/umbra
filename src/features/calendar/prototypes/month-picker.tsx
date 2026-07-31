"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/ui/button";

export type MonthDayState = "available" | "unavailable" | "past" | "adjacent" | "loading";
export type MonthPickerProps = {
  visibleMonth: string;
  selectedDate?: string;
  today?: string;
  days: Array<{ date: string; label: string; state: MonthDayState }>;
  onMonthChange?: (month: string) => void;
  onDateChange?: (date: string) => void;
};

export function MonthPicker({ visibleMonth, selectedDate, today, days, onMonthChange, onDateChange }: MonthPickerProps) {
  return (
    <section aria-labelledby="month-picker-title" className="w-full max-w-xl">
      <header className="mb-4 flex items-center justify-between gap-3">
        <Button variant="outline" size="icon" aria-label="Mês anterior" onClick={() => onMonthChange?.("previous")}><ChevronLeft /></Button>
        <h2 id="month-picker-title" className="font-semibold">{visibleMonth}</h2>
        <Button variant="outline" size="icon" aria-label="Próximo mês" onClick={() => onMonthChange?.("next")}><ChevronRight /></Button>
      </header>
      <div role="grid" aria-label={`Calendário de ${visibleMonth}`} className="grid grid-cols-7 gap-1 text-center text-sm">
        {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day) => <b role="columnheader" key={day} className="p-2 text-muted-foreground">{day}</b>)}
        {days.map((day) => {
          const disabled = day.state !== "available";
          return <button
            type="button"
            role="gridcell"
            key={day.date}
            aria-label={`${day.label}${day.date === today ? ", hoje" : ""}`}
            aria-selected={day.date === selectedDate}
            aria-disabled={disabled}
            disabled={disabled}
            onClick={() => onDateChange?.(day.date)}
            className={`aspect-square rounded-lg p-1 focus-visible:ring-3 focus-visible:ring-ring ${day.date === selectedDate ? "bg-primary text-primary-foreground" : "hover:bg-muted"} ${day.state === "adjacent" ? "text-muted-foreground/50" : ""}`}
          >{day.label}</button>;
        })}
      </div>
      <p className="sr-only" aria-live="polite">{selectedDate ? `Data selecionada: ${selectedDate}` : "Nenhuma data selecionada"}</p>
    </section>
  );
}
