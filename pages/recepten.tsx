// pages/recepten.tsx

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/recepten.module.css";
import type { Recipe } from "../types/recipe";

export default function ReceptenPage() {
  const [recepten, setRecepten] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("/api/recepten")
      .then((res) => res.json())
      .then(setRecepten)
      .catch(() => setRecepten([]));
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Alle recepten</h1>
      <section className={styles.grid}>
        {recepten.map((recept) => (
          <Link
            key={recept.id}
            href={`/recepten/${recept.slug}`}
            className={styles.card}
          >
            <Image
              src={recept.image}
              alt={recept.name}
              width={400}
              height={300}
              className={styles.image}
              unoptimized
            />
            <div className={styles.content}>
              <h2 className={styles.title}>{recept.name}</h2>
              <p className={styles.description}>{recept.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
