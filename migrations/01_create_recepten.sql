CREATE TABLE recepten (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,           -- URL-vriendelijke unieke naam (bv. 'pannenkoeken')
    name TEXT NOT NULL,                  -- Titel van het recept (schema.org: name)
    description TEXT NOT NULL,           -- Korte samenvatting voor Google (schema.org: description)
    notes TEXT,                          -- Eigen verhaal, herinnering, ervaring, extra tips
    source TEXT,                         -- Herkomst/bron (boek, persoon, website, etc.)
    author TEXT NOT NULL,                -- Auteur (schema.org: author)
    date_published DATETIME NOT NULL,    -- Datum van publicatie (schema.org: datePublished)
    image TEXT NOT NULL,                 -- URL hoofdafbeelding (schema.org: image)
    prep_time TEXT,                      -- Voorbereidingstijd in ISO 8601 (schema.org: prepTime)
    cook_time TEXT,                      -- Kooktijd in ISO 8601 (schema.org: cookTime)
    total_time TEXT,                     -- Totale tijd in ISO 8601 (schema.org: totalTime)
    recipe_yield TEXT,                   -- Opbrengst (schema.org: recipeYield)
    recipe_ingredient TEXT NOT NULL,     -- JSON-array van ingrediënten (schema.org: recipeIngredient)
    recipe_instructions TEXT NOT NULL,   -- JSON-array van stappen (schema.org: recipeInstructions)
    recipe_category TEXT,                -- JSON-array van categorieën (schema.org: recipeCategory)
    recipe_cuisine TEXT,                 -- JSON-array van keukens (schema.org: recipeCuisine)
    suitable_for_diet TEXT,              -- JSON-array van dieet-types (schema.org: suitableForDiet)
    tags TEXT,                           -- JSON-array van vrije labels
    keywords TEXT,                       -- JSON-array of string (schema.org: keywords)
    aggregate_rating TEXT,               -- JSON-object (schema.org: aggregateRating)
    nutrition TEXT,                      -- JSON-object (schema.org: nutrition)
    video TEXT,                          -- JSON-object (schema.org: video) [optioneel, kan leeg zijn]
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
