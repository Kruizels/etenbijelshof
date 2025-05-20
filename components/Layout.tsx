// components/Layout.tsx
import Link from "next/link";
import styles from "../styles/layout.module.css";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/recepten">Recepten</Link>
          <Link href="/recepten/toevoegen">Toevoegen</Link>
        </nav>
      </header>
      <main className={styles.content}>{children}</main>
    </>
  );
}
