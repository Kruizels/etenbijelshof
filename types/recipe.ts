// types/recipe.ts

export interface Recipe {
  id: number;
  slug: string;
  name: string;
  description: string;
  notes?: string;
  source?: string;
  author: string;
  date_published: string;
  image: string;
  prep_time?: string;
  cook_time?: string;
  total_time?: string;
  recipe_yield?: string;
  recipe_ingredient: string[];
  recipe_instructions: string[];
  recipe_category?: string[];
  recipe_cuisine?: string[];
  suitable_for_diet?: string[];
  tags?: string[];
  keywords?: string[];
  aggregate_rating?: {
    ratingValue: string;
    reviewCount: string;
  };
  nutrition?: {
    calories: string;
    [key: string]: string;
  };
  video?: any; // Uitwerken als je het later gebruikt
  created_at?: string;
}
