import type { Meta, StoryObj } from "@storybook/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";

const bookingContactSchema = z.object({
  name: z.string().min(2, "Informe pelo menos 2 caracteres."),
  phone: z.string().min(10, "Informe um telefone válido."),
  channel: z.enum(["whatsapp", "phone", "email"]),
});

type BookingContactValues = z.infer<typeof bookingContactSchema>;

function RhfZodExample() {
  const form = useForm<BookingContactValues>({
    resolver: zodResolver(bookingContactSchema),
    defaultValues: {
      name: "",
      phone: "",
      channel: "whatsapp",
    },
  });

  return (
    <Card className="w-[min(92vw,28rem)]">
      <CardHeader>
        <CardTitle>Form wrapper + RHF + Zod</CardTitle>
        <CardDescription>Exemplo de integração para formulários do booking público.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5" onSubmit={form.handleSubmit(() => undefined)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="story-name">Nome</FieldLabel>
              <Input id="story-name" aria-invalid={Boolean(form.formState.errors.name)} {...form.register("name")} />
              {form.formState.errors.name ? <FieldError>{form.formState.errors.name.message}</FieldError> : null}
            </Field>
            <Field>
              <FieldLabel htmlFor="story-phone">Telefone</FieldLabel>
              <Input id="story-phone" aria-invalid={Boolean(form.formState.errors.phone)} {...form.register("phone")} />
              {form.formState.errors.phone ? <FieldError>{form.formState.errors.phone.message}</FieldError> : null}
              <FieldDescription>As mensagens espelham o backend quando a Fase 02 definir schemas finais.</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="story-channel">Canal</FieldLabel>
              <Select id="story-channel" {...form.register("channel")}>
                <option value="whatsapp">WhatsApp</option>
                <option value="phone">Ligação</option>
                <option value="email">E-mail</option>
              </Select>
            </Field>
          </FieldGroup>
          <Button type="submit">Validar exemplo</Button>
        </form>
      </CardContent>
    </Card>
  );
}

const meta = {
  title: "Design System/Forms",
  component: RhfZodExample,
} satisfies Meta<typeof RhfZodExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReactHookFormWithZod: Story = {};
