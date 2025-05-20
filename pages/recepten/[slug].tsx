// pages/recepten/[slug].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Recipe } from "../../types/recipe";
import styles from "../../styles/recept.module.css";
import Head from "next/head";
import Image from "next/image";

export default function ReceptDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [recept, setRecept] = useState<Recipe | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch("/api/recepten")
      .then((res) => res.json())
      .then((data: Recipe[]) => {
        const gevonden = data.find((r) => r.slug === slug);
        setRecept(gevonden || null);
      });
  }, [slug]);

  if (!recept) {
    return (
      <p className={styles.laden}>Recept wordt geladen of bestaat niet.</p>
    );
  }

  return (
    <>
      <Head>
        <title>{recept.name} | Eten bij Elshof</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Recipe",
              name: recept.name,
              description: recept.description,
              image: recept.image,
              author: {
                "@type": "Person",
                name: recept.author,
              },
              datePublished: recept.date_published,
              prepTime: recept.prep_time,
              cookTime: recept.cook_time,
              totalTime: recept.total_time,
              recipeYield: recept.recipe_yield,
              recipeIngredient: recept.recipe_ingredient,
              recipeInstructions: recept.recipe_instructions.map((step) => ({
                "@type": "HowToStep",
                text: step,
              })),
            }),
          }}
        />
      </Head>

      <article className={styles.recept}>
        <h1 className={styles.titel}>{recept.name}</h1>
        <Image
          src={recept.image}
          alt={recept.name}
          width={700}
          height={400}
          className={styles.afbeelding}
        />
        <p className={styles.omschrijving}>{recept.description}</p>

        {recept.notes && (
          <section className={styles.sectie}>
            <h2>Verhaal</h2>
            <p>{recept.notes}</p>
          </section>
        )}

        <section className={styles.sectie}>
          <h2>Ingrediënten</h2>
          <ul>
            {recept.recipe_ingredient.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={styles.sectie}>
          <h2>Bereiding</h2>
          <ol>
            {recept.recipe_instructions.map((stap, idx) => (
              <li key={idx}>{stap}</li>
            ))}
          </ol>
        </section>

        <p className={styles.bron}>
          <strong>Bron:</strong> {recept.source}
        </p>
      </article>
    </>
  );
}
