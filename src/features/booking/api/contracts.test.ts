import { describe, expect, it } from "vitest";

import { appointmentSchema, availableSlotsSchema, createAppointmentSchema, publicTenantSchema } from "./contracts";

const id = "30000000-0000-4000-8000-000000000001";

describe("public booking contracts", () => {
  it("accepts the separate tenant response and offset instants", () => {
    expect(publicTenantSchema.parse({ id, slug: "umbra-smoke", name: "Umbra Smoke", timezone: "America/Fortaleza", currency_code: "BRL" }).slug).toBe("umbra-smoke");
    expect(availableSlotsSchema.parse({ available_start_times: ["2026-08-02T12:00:00-03:00"] }).available_start_times).toHaveLength(1);
  });

  it("requires canonical UUIDs and Gnomon's flattened booking payload", () => {
    expect(createAppointmentSchema.safeParse({ calendar_id: "calendar", offering_id: id, start_at: "2026-08-02T12:00:00-03:00", customer_name: "Ana", customer_phone: "+5585999990000" }).success).toBe(false);
    expect(createAppointmentSchema.parse({ calendar_id: id, offering_id: id, start_at: "2026-08-02T12:00:00-03:00", customer_name: "Ana", customer_phone: "+5585999990000" }).start_at).toContain("-03:00");
  });

  it("accepts booking responses for both create and idempotent replay", () => {
    expect(appointmentSchema.parse({ id, start_at: "2026-08-02T15:00:00Z", end_at: "2026-08-02T15:30:00Z", status: "scheduled", calendar: { id, name: "Ana", timezone: "America/Fortaleza" }, offering: { id, title: "Corte", duration_minutes: 30, price_cents: 5000 }, customer: { id, name: "Ana", phone: "+5585999990000", email: null }, customer_notes: null }).status).toBe("scheduled");
  });
});
