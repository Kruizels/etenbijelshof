// pages/api/recepten.ts

import type { NextApiRequest, NextApiResponse } from "next";

// Mockdata volgens jouw Recipe-structuur
const recepten = [
  {
    id: 1,
    slug: "pannenkoeken",
    name: "Pannenkoeken",
    description: "Heerlijke Hollandse pannenkoeken.",
    notes:
      "Vroeger maakte oma dit elke zondag. Wij aten het altijd met stroop en poedersuiker!",
    source: "Oma Elshof, familierecept",
    author: "Casper Elshof",
    date_published: "2024-06-01T12:00:00Z",
    image: "/images/pannenkoeken.png",
    prep_time: "PT10M",
    cook_time: "PT20M",
    total_time: "PT30M",
    recipe_yield: "4 stuks",
    recipe_ingredient: [
      "250g bloem",
      "2 eieren",
      "500ml melk",
      "snufje zout",
      "boter om te bakken",
    ],
    recipe_instructions: [
      "Doe de bloem in een kom.",
      "Klop de eieren en melk erdoor.",
      "Voeg een snufje zout toe.",
      "Verhit boter in een koekenpan.",
      "Bak de pannenkoeken goudbruin.",
    ],
    recipe_category: ["Ontbijt", "Zoet"],
    recipe_cuisine: ["Nederlands"],
    suitable_for_diet: ["https://schema.org/VegetarianDiet"],
    tags: ["klassiek", "snel", "favoriet"],
    keywords: ["ontbijt", "zoet", "klassiek"],
    aggregate_rating: {
      ratingValue: "4.5",
      reviewCount: "15",
    },
    nutrition: {
      calories: "230 calories",
    },
    video: null,
    created_at: "2024-06-01T12:00:00Z",
  },
  // Je kunt meer recepten toevoegen als je wilt
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(recepten);
}
