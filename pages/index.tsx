// pages/index.tsx
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Recipe } from "../types/recipe";
import styles from "../styles/home.module.css";
import Image from "next/image";

export default function Home() {
  const [randomRecept, setRandomRecept] = useState<Recipe | null>(null);

  useEffect(() => {
    fetch("/api/recepten")
      .then((res) => res.json())
      .then((data: Recipe[]) => {
        const random = data[Math.floor(Math.random() * data.length)];
        setRandomRecept(random);
      });
  }, []);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link href="/">Home</Link>
        <Link href="/recepten">Recepten</Link>
        <Link href="/categorieen">Categorieën</Link>
        <Link href="/recepten/toevoegen">Toevoegen</Link>
      </nav>

      <header className={styles.header}>
        <h1>Eten bij Elshof</h1>
        <p>Een receptenarchief voor en door de familie Elshof</p>
      </header>

      <input
        className={styles.zoekveld}
        type="text"
        placeholder="Zoek op titel, ingrediënt of tag..."
      />

      <section className={styles.randomRecept}>
        <h2>Willekeurig recept</h2>
        {randomRecept ? (
          <div className={styles.kaart}>
            <Image
              src={randomRecept.image}
              alt={randomRecept.name}
              width={400}
              height={300}
            />
            <h3>{randomRecept.name}</h3>
            <p>{randomRecept.description}</p>
            <Link href={`/recepten/${randomRecept.slug}`}>Bekijk recept</Link>
          </div>
        ) : (
          <p>Recept aan het laden...</p>
        )}
      </section>

      <footer className={styles.footer}>© Familie Elshof 2025</footer>
    </div>
  );
}
