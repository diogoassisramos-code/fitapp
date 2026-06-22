"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  MetricCard,
  StatusBadge,
  KebabMenu,
  Input,
  Textarea,
  Modal,
} from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { brl } from "@/lib/format";
import { listPlanosPlataforma } from "@/lib/admin";
import styles from "./planos.module.css";

export default function AdminPlanosPage() {
  const planos = useMemo(() => listPlanosPlataforma(), []);

  const [criarAberto, setCriarAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [limite, setLimite] = useState("");
  const [descricao, setDescricao] = useState("");

  const mrr = planos.reduce((s, p) => s + p.preco * p.assinantes, 0);
  const planosAtivos = planos.filter((p) => p.status === "ativo").length;
  const assinantesTotais = planos.reduce((s, p) => s + p.assinantes, 0);

  function fecharCriar() {
    setCriarAberto(false);
    setNome("");
    setPreco("");
    setLimite("");
    setDescricao("");
  }

  return (
    <>
      <PageHeader
        title="Planos da plataforma"
        subtitle="Planos de assinatura que as consultorias contratam"
        actions={
          <Button icon="plus" onClick={() => setCriarAberto(true)}>
            Criar plano
          </Button>
        }
      />

      <div className={styles.metrics}>
        <MetricCard
          label="MRR dos planos"
          value={brl(mrr)}
          sub="Receita recorrente mensal"
          icon="currency-real"
        />
        <MetricCard
          label="Planos ativos"
          value={planosAtivos}
          sub={`${planos.length} planos no total`}
          icon="layout-grid"
        />
        <MetricCard
          label="Assinantes totais"
          value={assinantesTotais}
          sub="Consultorias assinando"
          icon="building-store"
        />
      </div>

      <div className={styles.grid}>
        {planos.map((plano) => {
          const arquivado = plano.status === "arquivado";
          return (
            <Card
              key={plano.id}
              className={[
                styles.plano,
                plano.destaque ? styles.destaque : "",
                arquivado ? styles.arquivado : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <CardBody className={styles.planoBody}>
                <div className={styles.planoTop}>
                  <div className={styles.tituloLinha}>
                    <h3 className={styles.planoNome}>{plano.nome}</h3>
                    {plano.destaque && (
                      <span className={styles.popular}>
                        <i className="ti ti-star-filled" aria-hidden /> Mais popular
                      </span>
                    )}
                    {arquivado && (
                      <StatusBadge variant="off" noDot>
                        Arquivado
                      </StatusBadge>
                    )}
                  </div>

                  <div className={styles.precoLinha}>
                    <span className={styles.preco}>{brl(plano.preco)}</span>
                    <span className={styles.precoUnidade}>/mês</span>
                  </div>

                  <p className={styles.descricao}>{plano.descricao}</p>

                  <div className={styles.limite}>
                    <i className="ti ti-users" aria-hidden />
                    {plano.limiteAlunos === 0
                      ? "Alunos ilimitados"
                      : `Até ${plano.limiteAlunos} alunos`}
                  </div>
                </div>

                <ul className={styles.recursos}>
                  {plano.recursos.map((r) => (
                    <li key={r} className={styles.recurso}>
                      <i className="ti ti-circle-check-filled" aria-hidden />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.rodape}>
                  <span className={styles.assinantes}>
                    <i className="ti ti-building" aria-hidden />
                    {plano.assinantes}{" "}
                    {plano.assinantes === 1 ? "consultoria" : "consultorias"}
                  </span>
                  <KebabMenu
                    items={[
                      { label: "Editar", icon: "pencil", onClick: () => {} },
                      { label: "Duplicar", icon: "copy", onClick: () => {} },
                      {
                        label: "Arquivar",
                        icon: "archive",
                        danger: true,
                        separatorBefore: true,
                        onClick: () => {},
                      },
                    ]}
                  />
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Modal
        open={criarAberto}
        onClose={fecharCriar}
        title="Criar plano da plataforma"
        footer={
          <>
            <Button variant="outline" onClick={fecharCriar}>
              Cancelar
            </Button>
            <Button icon="check" onClick={fecharCriar}>
              Criar plano
            </Button>
          </>
        }
      >
        <div className={styles.form}>
          <Input
            label="Nome"
            placeholder="Ex.: Pro"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <div className={styles.formRow}>
            <Input
              label="Preço"
              prefix="R$"
              type="number"
              placeholder="99"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
            <Input
              label="Limite de alunos"
              type="number"
              hint="0 = ilimitado"
              placeholder="150"
              value={limite}
              onChange={(e) => setLimite(e.target.value)}
            />
          </div>
          <Textarea
            label="Descrição"
            placeholder="Para quem é este plano?"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
}
