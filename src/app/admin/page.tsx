import { PageHeader } from "@/components/PageHeader";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  MetricCard,
  StatusBadge,
  ListRow,
  Avatar,
  BarChart,
} from "@/components/ui";
import {
  adminStats,
  adminFinanceiro,
  listConsultorias,
  planoPlataformaNome,
  STATUS_CONSULTORIA,
} from "@/lib/admin";
import { brl } from "@/lib/format";
import styles from "./visao-geral.module.css";

export default function AdminVisaoGeralPage() {
  const topConsultorias = [...listConsultorias()]
    .sort((a, b) => b.alunosAtivos - a.alunosAtivos)
    .slice(0, 5);

  return (
    <>
      <PageHeader
        eyebrow="Painel da plataforma"
        title="Visão geral"
        subtitle="Saúde da plataforma CoachFit"
        actions={
          <Button icon="plus" href="/admin/consultores/novo">
            Nova consultoria
          </Button>
        }
      />

      <section className={styles.metrics}>
        <MetricCard
          label="Consultorias ativas"
          value={
            adminStats.consultoriasAtivas + " / " + adminStats.totalConsultorias
          }
          icon="briefcase"
        />
        <MetricCard
          label="Alunos na plataforma"
          value={adminStats.totalAlunos}
          icon="users"
        />
        <MetricCard
          label="MRR da plataforma"
          value={brl(adminStats.mrrPlataforma)}
          icon="repeat"
        />
        <MetricCard
          label="Volume processado"
          value={brl(adminStats.volumeProcessadoMes)}
          sub="GMV no mês"
          icon="chart-bar"
        />
        <MetricCard
          label="Novas no mês"
          value={adminStats.novasConsultoriasMes}
          icon="sparkles"
        />
        <MetricCard
          label="Inadimplentes"
          value={adminStats.inadimplentes}
          icon="alert-triangle"
        />
      </section>

      <section className={styles.charts}>
        <Card>
          <CardHeader title="Receita da plataforma (6 meses)" />
          <CardBody>
            <BarChart
              data={adminFinanceiro.faturamento6m.map((f) => ({
                label: f.mes,
                value: f.valor,
              }))}
              formatValue={(v) => "R$" + v}
            />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Volume processado (6 meses)" />
          <CardBody>
            <BarChart
              data={adminFinanceiro.volume6m.map((f) => ({
                label: f.mes,
                value: f.valor,
              }))}
              formatValue={(v) => "R$" + (v / 1000).toFixed(0) + "k"}
            />
          </CardBody>
        </Card>
      </section>

      <Card padded={false}>
        <CardHeader
          title="Top consultorias"
          action={
            <Button
              variant="ghost"
              size="sm"
              iconRight="arrow-right"
              href="/admin/consultores"
            >
              Ver todas
            </Button>
          }
        />
        <div className={styles.lista}>
          {topConsultorias.map((c) => {
            const status = STATUS_CONSULTORIA[c.status];
            return (
              <ListRow
                key={c.id}
                href={`/admin/consultores/${c.id}`}
                leading={<Avatar name={c.consultor} />}
                title={c.nomeNegocio + " · " + c.consultor}
                action={
                  <div className={styles.rowAction}>
                    <StatusBadge variant={status.variant}>
                      {status.label}
                    </StatusBadge>
                    <span className={styles.mrr}>{brl(c.mrr)}/mês</span>
                  </div>
                }
                meta={
                  <>
                    {planoPlataformaNome(c.planoPlataformaId)} · {c.alunosAtivos}{" "}
                    alunos ativos · {c.cidade}
                  </>
                }
              />
            );
          })}
        </div>
      </Card>
    </>
  );
}
