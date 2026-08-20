import { z } from "zod";

import type { components } from "@/shared/api/generated/gnomon";

/** Contratos temporários da fase 01.5; a API continua sendo a fonte de verdade. */
export const apiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
});

export const publicTenantSchema = z.object({
  id: z.uuid(),
  slug: z.string(),
  name: z.string(),
  timezone: z.string(),
  currency_code: z.string(),
});

export const publicCalendarSchema = z.object({
  id: z.uuid(),
  collaborator_id: z.uuid(),
  collaborator_name: z.string(),
  name: z.string(),
  timezone: z.string(),
});

export const publicOfferingSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullable().optional(),
  duration_minutes: z.number().int().positive(),
  price_cents: z.number().int().nonnegative().nullable().optional(),
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }),
});

export const availableSlotsSchema = z.object({
  available_start_times: z.array(z.string().datetime({ offset: true })),
});

export const createAppointmentSchema = z.object({
  offering_id: z.uuid(),
  calendar_id: z.uuid(),
  start_at: z.string().datetime({ offset: true }),
  customer_name: z.string().min(1).max(120),
  customer_phone: z.string().min(1).max(64),
  customer_email: z.string().email().max(254).nullable().optional(),
  customer_notes: z.string().nullable().optional(),
});

export const appointmentSchema = z.object({
  id: z.uuid(),
  start_at: z.string().datetime({ offset: true }),
  end_at: z.string().datetime({ offset: true }),
  status: z.string(),
  calendar: z.object({ id: z.uuid(), name: z.string(), timezone: z.string() }),
  offering: z.object({ id: z.uuid(), title: z.string(), duration_minutes: z.number().int(), price_cents: z.number().int().nullable().optional() }),
  customer: z.object({ id: z.uuid(), name: z.string(), phone: z.string(), email: z.string().email().nullable().optional() }),
  customer_notes: z.string().nullable().optional(),
});

export type ApiError = z.infer<typeof apiErrorSchema>["error"];
export type PublicTenantWire = z.infer<typeof publicTenantSchema>;
export type AvailableSlotsWire = z.infer<typeof availableSlotsSchema>;
export type CreateAppointmentWire = z.infer<typeof createAppointmentSchema>;
export type AppointmentWire = z.infer<typeof appointmentSchema>;
export type PublicTenantOpenApi = components["schemas"]["PublicTenantProfileResponse"];
