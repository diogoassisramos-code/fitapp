"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, COACH } from "@/lib/nav";
import styles from "./Sidebar.module.css";

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  onCloseMobile,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar} data-collapsed={collapsed}>
      {/* Logo + colapsar */}
      <div className={styles.head}>
        <Link href="/" className={styles.logo} onClick={onCloseMobile}>
          <span className={styles.logoMark}>
            <i className="ti ti-barbell" aria-hidden />
          </span>
          <span className={styles.logoText}>CoachFit</span>
        </Link>
        <button
          type="button"
          className={styles.collapseBtn}
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          title={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          <i
            className={
              collapsed
                ? "ti ti-layout-sidebar-left-expand"
                : "ti ti-layout-sidebar-left-collapse"
            }
            aria-hidden
          />
        </button>
      </div>

      {/* Navegação */}
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href, pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navItem}
              data-active={active}
              onClick={onCloseMobile}
              title={collapsed ? item.label : undefined}
            >
              <i className={`ti ti-${item.icon}`} aria-hidden />
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Acesso ao painel administrativo da plataforma */}
      <Link
        href="/admin"
        className={styles.adminLink}
        onClick={onCloseMobile}
        title={collapsed ? "Painel admin" : undefined}
      >
        <i className="ti ti-shield-cog" aria-hidden />
        <span className={styles.navLabel}>Painel admin</span>
      </Link>

      {/* Card do usuário no rodapé */}
      <div className={styles.userRow}>
        <Link href="/configuracoes" className={styles.userCard} onClick={onCloseMobile}>
          <span className={styles.avatar}>{COACH.iniciais}</span>
          <span className={styles.userMeta}>
            <span className={styles.userName}>{COACH.nome}</span>
            <span className={styles.userConselho}>{COACH.conselho}</span>
          </span>
        </Link>
        <Link
          href="/login"
          className={styles.logout}
          onClick={onCloseMobile}
          title="Sair"
          aria-label="Sair"
        >
          <i className="ti ti-logout" aria-hidden />
        </Link>
      </div>
    </aside>
  );
}
