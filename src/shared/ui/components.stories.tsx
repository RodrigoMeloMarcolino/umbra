import type { Meta, StoryObj } from "@storybook/nextjs";
import { toast } from "sonner";
import { CalendarDays, Check, Clock, MoreHorizontal } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogPopup, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Popover, PopoverPopup, PopoverTrigger } from "@/shared/ui/popover";
import { Select } from "@/shared/ui/select";
import { Skeleton } from "@/shared/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Textarea } from "@/shared/ui/textarea";
import { Toaster } from "@/shared/ui/sonner";

const meta = {
  title: "Design System/Components",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CoreSet: Story = {
  render: () => (
    <main className="min-h-screen w-full p-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <Badge className="w-fit" variant="warning">Solar premium</Badge>
            <CardTitle>Componentes base</CardTitle>
            <CardDescription>Estados principais para revisar a linguagem visual do Umbra.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <section className="flex flex-wrap gap-2">
              <Button>Confirmar horário</Button>
              <Button variant="secondary">Salvar rascunho</Button>
              <Button variant="outline">Ver agenda</Button>
              <Button variant="ghost" size="icon" aria-label="Mais ações"><MoreHorizontal /></Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => toast.success("Horário reservado no preview", { description: "Toast visual do design system." })}
              >
                Mostrar toast
              </Button>
              <Button disabled>Carregando</Button>
              <Toaster />
            </section>
            <section className="flex flex-wrap gap-2">
              <Badge>Disponível</Badge>
              <Badge variant="secondary">Novo</Badge>
              <Badge variant="success">Confirmado</Badge>
              <Badge variant="warning">Pendente</Badge>
              <Badge variant="destructive">Conflito</Badge>
              <Badge variant="outline">Rascunho</Badge>
            </section>
            <FieldGroup className="max-w-xl">
              <Field>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <Input id="name" placeholder="Marina Costa" />
                <FieldDescription>Usado apenas para identificar o agendamento.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="service">Serviço</FieldLabel>
                <Select id="service" defaultValue="cut">
                  <option value="cut">Corte solar — R$ 80</option>
                  <option value="color">Coloração — R$ 160</option>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="notes">Observações</FieldLabel>
                <Textarea id="notes" placeholder="Alguma preferência para o atendimento?" />
              </Field>
              <Field>
                <FieldLabel htmlFor="phone">Telefone</FieldLabel>
                <Input id="phone" aria-invalid="true" placeholder="(85) 99999-9999" />
                <FieldError>Informe um telefone válido.</FieldError>
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>Abrir diálogo</DialogTrigger>
              <DialogPopup>
                <DialogHeader>
                  <DialogTitle>Confirmar agendamento?</DialogTitle>
                  <DialogDescription>Este é um preview do padrão de confirmação para ações importantes.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancelar</Button>
                  <Button>Confirmar</Button>
                </DialogFooter>
              </DialogPopup>
            </Dialog>
            <Popover>
              <PopoverTrigger render={<Button variant="ghost" />}>Detalhes rápidos</PopoverTrigger>
              <PopoverPopup>
                <div className="space-y-2">
                  <p className="font-medium">Janela recomendada</p>
                  <p className="text-sm text-muted-foreground">Terça, 09:00–11:30, na timezone do calendário.</p>
                </div>
              </PopoverPopup>
            </Popover>
          </CardFooter>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CalendarDays className="size-5 text-primary" /> Mini agenda</CardTitle>
              <CardDescription>Table, loading e status de appointments.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Horário</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">09:00</TableCell>
                    <TableCell>Ana Lima</TableCell>
                    <TableCell><Badge variant="success"><Check className="mr-1 size-3" />Confirmado</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">10:15</TableCell>
                    <TableCell>João Alves</TableCell>
                    <TableCell><Badge variant="warning"><Clock className="mr-1 size-3" />Pendente</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Loading</CardTitle>
              <CardDescription>Skeletons para estados de carregamento calmos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-24 w-full" />
              <div className="grid grid-cols-3 gap-3">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  ),
};
