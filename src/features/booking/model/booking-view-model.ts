export type BookingStep = "service" | "calendar" | "datetime" | "customer" | "review" | "success";
export type BookingState =
  | "ready"
  | "loading"
  | "empty"
  | "error"
  | "invalid_tenant"
  | "validation_error"
  | "slot_unavailable"
  | "submitting";

export type BookingViewModel = {
  tenantName: string;
  timezone: string;
  currencyCode: string;
  serviceName: string;
  professionalName: string;
  appointmentDate: string;
  appointmentTime: string;
  priceCents: number | null;
};

export type BookingData = Pick<BookingViewModel, "tenantName" | "timezone" | "currencyCode" | "priceCents">;

export type BookingCallbacks = {
  onStepChange?: (step: BookingStep) => void;
  onSelectionChange?: (selection: { serviceName?: string; professionalName?: string; date?: string; time?: string }) => void;
  onRetry?: () => void;
  onSubmit?: () => void;
};
