import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "@/shared/ui/button";
import { EmptyState, FeedbackPanel, PageHeader, Pagination } from "@/shared/ui/prototype-patterns";

const meta = { title: "Padrões/Shared", parameters: { layout: "padded" } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const PageHeaderLongo: Story = { render: () => <PageHeader title="Configurações do Studio Sol Nascente" description="Administre os dados que aparecem em toda a experiência de agendamento do seu negócio." action={<Button>Salvar alterações</Button>} /> };
export const EmptyLoadingAndMobile: Story = { parameters: { viewport: { defaultViewport: "mobile1" } }, render: () => <EmptyState title="Nenhum agendamento hoje" action={<Button>Ver semana</Button>} /> };
export const Feedbacks: Story = { render: () => <div className="grid max-w-xl gap-4"><FeedbackPanel title="Não foi possível carregar" description="Tente novamente. Seus filtros continuam preservados." /><FeedbackPanel kind="forbidden" title="Acesso restrito" description="Esta área é reservada a proprietários e administradores." /></div> };
export const PaginationKeyboard: Story = { render: () => <Pagination /> };
