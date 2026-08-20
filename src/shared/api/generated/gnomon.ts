/**
 * This file is generated from GNOMON_OPENAPI_URL. Do not edit it manually.
 * Regenerate with: pnpm api:generate
 */

export interface paths {
  "/v1/public/tenants/{tenantSlug}": {
    get: { responses: { 200: { content: { "application/json": components["schemas"]["PublicTenantProfileResponse"] } } } };
  };
  "/v1/public/tenants/{tenantSlug}/calendars": {
    get: { responses: { 200: { content: { "application/json": components["schemas"]["PublicCalendarResponse"][] } } } };
  };
  "/v1/public/tenants/{tenantSlug}/offerings": {
    get: { responses: { 200: { content: { "application/json": components["schemas"]["PublicOfferingResponse"][] } } } };
  };
  "/v1/public/tenants/{tenantSlug}/available-slots": {
    get: { responses: { 200: { content: { "application/json": components["schemas"]["AvailableSlotsResponse"] } } } };
  };
  "/v1/public/tenants/{tenantSlug}/appointments": {
    post: { requestBody: { content: { "application/json": components["schemas"]["CreateAppointmentRequest"] } }; responses: { 200: { content: { "application/json": components["schemas"]["AppointmentResponse"] } }; 201: { content: { "application/json": components["schemas"]["AppointmentResponse"] } }; 409: { content: { "application/json": components["schemas"]["ApiErrorResponse"] } }; 422: { content: { "application/json": components["schemas"]["ApiErrorResponse"] } } } };
  };
}

export interface components {
  schemas: {
    ApiErrorResponse: { error: { code: string; message: string; details?: { field?: string; message?: string }[] | null } };
    PublicTenantProfileResponse: { id: string; name: string; slug: string; timezone: string; currency_code: string };
    PublicCalendarResponse: { id: string; collaborator_id: string; collaborator_name: string; name: string; timezone: string };
    PublicOfferingResponse: { id: string; title: string; description?: string | null; duration_minutes: number; price_cents?: number | null; created_at: string; updated_at: string };
    AvailableSlotsResponse: { available_start_times: string[] };
    CreateAppointmentRequest: { calendar_id: string; offering_id: string; start_at: string; customer_name: string; customer_phone: string; customer_email?: string | null; customer_notes?: string | null };
    AppointmentResponse: { id: string; start_at: string; end_at: string; status: string; calendar: { id: string; name: string; timezone: string }; offering: { id: string; title: string; duration_minutes: number; price_cents?: number | null }; customer: { id: string; name: string; phone: string; email?: string | null }; customer_notes?: string | null };
  };
}
