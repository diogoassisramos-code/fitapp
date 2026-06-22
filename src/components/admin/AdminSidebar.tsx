"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV, ADMIN_USER } from "@/lib/adminNav";
import styles from "./AdminSidebar.module.css";

function isActive(href: string, pathname: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(href + "/");
}

export function AdminSidebar({
  open,
  onCloseMobile,
}: {
  open: boolean;
  onCloseMobile: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar} data-open={open}>
      <div className={styles.head}>
        <Link href="/admin" className={styles.logo} onClick={onCloseMobile}>
          <span className={styles.logoMark}>
            <i className="ti ti-shield-cog" aria-hidden />
          </span>
          <span className={styles.logoText}>
            CoachFit
            <span className={styles.logoTag}>ADMIN</span>
          </span>
        </Link>
      </div>

      <nav className={styles.nav}>
        {ADMIN_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.navItem}
            data-active={isActive(item.href, pathname)}
            onClick={onCloseMobile}
          >
            <i className={`ti ti-${item.icon}`} aria-hidden />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.foot}>
        <Link href="/" className={styles.switch} onClick={onCloseMobile}>
          <i className="ti ti-arrow-back-up" aria-hidden />
          App do consultor
        </Link>
        <div className={styles.userCard}>
          <span className={styles.avatar}>{ADMIN_USER.iniciais}</span>
          <span className={styles.userMeta}>
            <span className={styles.userName}>{ADMIN_USER.nome}</span>
            <span className={styles.userEmail}>{ADMIN_USER.email}</span>
          </span>
          <Link href="/login" className={styles.logout} aria-label="Sair" title="Sair">
            <i className="ti ti-logout" aria-hidden />
          </Link>
        </div>
      </div>
    </aside>
  );
}
