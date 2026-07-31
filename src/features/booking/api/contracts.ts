import { z } from "zod";

/** Contratos temporários da fase 01.5; a API continua sendo a fonte de verdade. */
export const apiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
});

export const publicTenantSchema = z.object({
  slug: z.string(),
  name: z.string(),
  timezone: z.string(),
  currency_code: z.string(),
  offerings: z.array(z.object({
    id: z.string(),
    name: z.string(),
    duration_minutes: z.number().int().positive(),
    price_cents: z.number().int().nonnegative().nullable(),
  })),
  calendars: z.array(z.object({
    id: z.string(),
    name: z.string(),
    timezone: z.string(),
  })),
});

export const availableSlotsSchema = z.object({
  slots: z.array(z.string().datetime({ offset: true })),
});

export const createAppointmentSchema = z.object({
  offering_id: z.string(),
  calendar_id: z.string(),
  slot_start_at: z.string().datetime({ offset: true }),
  customer: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email().optional(),
    notes: z.string().optional(),
  }),
});

export type ApiError = z.infer<typeof apiErrorSchema>["error"];
export type PublicTenantWire = z.infer<typeof publicTenantSchema>;
export type AvailableSlotsWire = z.infer<typeof availableSlotsSchema>;
export type CreateAppointmentWire = z.infer<typeof createAppointmentSchema>;
