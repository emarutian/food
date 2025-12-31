import { Recipe, Comment, User } from "@/types";

// Videos from "I Have Food at Home" YouTube channel (@Ihavefoodathome)
export const mockRecipes: Recipe[] = [
  {
    id: "1",
    slug: "korean-short-ribs-20-mins",
    title: "Korean Short Ribs in 20 Mins | 3 ingredients | 1 Secret | 100% Kid-Approved",
    description: "Make delicious Korean-style short ribs in just 20 minutes with only 3 simple ingredients. A family-friendly recipe that even the pickiest eaters will love!",
    youtubeUrl: "https://www.youtube.com/watch?v=IrlzlhQfHvo",
    youtubeId: "IrlzlhQfHvo",
    thumbnailUrl: "https://i.ytimg.com/vi/IrlzlhQfHvo/hqdefault.jpg",
    enhancedRecipe: {
      ingredients: [
        "2 lbs beef short ribs (flanken-cut)",
        "1/2 cup soy sauce",
        "3 tbsp brown sugar or honey",
        "4 cloves garlic, minced",
        "1 tbsp sesame oil",
        "Green onions for garnish",
        "Sesame seeds for garnish"
      ],
      instructions: [
        "Pat short ribs dry and score lightly on both sides.",
        "Mix soy sauce, brown sugar, and garlic to create the marinade.",
        "Coat ribs generously with the marinade.",
        "Heat a grill pan or skillet over high heat.",
        "Cook ribs 3-4 minutes per side until caramelized.",
        "Drizzle with sesame oil before serving.",
        "Garnish with green onions and sesame seeds.",
        "Serve immediately with steamed rice."
      ],
      prepTime: "5 mins",
      cookTime: "15 mins",
      totalTime: "20 mins",
      servings: "4",
      difficulty: "Easy",
      tips: [
        "Flanken-cut ribs cook faster than English-cut",
        "High heat is key for caramelization",
        "Let the meat rest for 2 minutes before serving"
      ],
      variations: [
        "Add gochujang for a spicy kick",
        "Use pork ribs as an alternative",
        "Marinate overnight for deeper flavor"
      ]
    },
    rating: 96,
    ratingCount: 234,
    commentCount: 45,
    isPublished: true,
    publishedAt: new Date("2024-12-20"),
    updatedAt: new Date("2024-12-20")
  },
  {
    id: "2",
    slug: "french-method-picky-eaters",
    title: "Learn The French Method I Use to Turn Picky Eaters Into Foodies",
    description: "Discover the French approach to introducing new foods to children. Transform picky eaters into adventurous foodies with these time-tested techniques.",
    youtubeUrl: "https://www.youtube.com/watch?v=0vjlb0k4Juk",
    youtubeId: "0vjlb0k4Juk",
    thumbnailUrl: "https://i.ytimg.com/vi/0vjlb0k4Juk/hqdefault.jpg",
    enhancedRecipe: {
      ingredients: [
        "Variety of fresh vegetables",
        "Quality butter",
        "Fresh herbs (thyme, parsley)",
        "Sea salt",
        "Olive oil",
        "Seasonal fruits",
        "Whole grain bread"
      ],
      instructions: [
        "Start with small tastings - one bite is enough.",
        "Present foods multiple times without pressure.",
        "Involve children in meal preparation.",
        "Eat together as a family at the table.",
        "Model adventurous eating yourself.",
        "Make presentation appealing and fun.",
        "Pair new foods with familiar favorites.",
        "Celebrate trying new things, not finishing plates."
      ],
      prepTime: "Ongoing",
      cookTime: "Varies",
      totalTime: "A journey",
      servings: "Family",
      difficulty: "Easy",
      tips: [
        "Consistency is more important than perfection",
        "Never force a child to eat",
        "It can take 10-15 exposures to accept a new food"
      ],
      variations: [
        "Adapt techniques for toddlers vs older kids",
        "Create themed dinner nights",
        "Start a family garden for fresh produce"
      ]
    },
    rating: 94,
    ratingCount: 189,
    commentCount: 67,
    isPublished: true,
    publishedAt: new Date("2024-12-15"),
    updatedAt: new Date("2024-12-15")
  },
  {
    id: "3",
    slug: "high-protein-snack-kids",
    title: "Kids adore this High Protein Snack!",
    description: "A healthy, protein-packed snack that kids absolutely love. Quick to make and perfect for after school or on-the-go nutrition.",
    youtubeUrl: "https://www.youtube.com/watch?v=AsxK4BQgmZ0",
    youtubeId: "AsxK4BQgmZ0",
    thumbnailUrl: "https://i.ytimg.com/vi/AsxK4BQgmZ0/hqdefault.jpg",
    enhancedRecipe: {
      ingredients: [
        "1 cup Greek yogurt",
        "2 tbsp nut butter (peanut or almond)",
        "1 tbsp honey or maple syrup",
        "1/4 cup rolled oats",
        "2 tbsp mini chocolate chips",
        "1 tbsp chia seeds",
        "Fresh berries for topping"
      ],
      instructions: [
        "Mix Greek yogurt with nut butter until smooth.",
        "Stir in honey or maple syrup to taste.",
        "Fold in rolled oats and chia seeds.",
        "Add chocolate chips and mix gently.",
        "Portion into small cups or bowls.",
        "Top with fresh berries.",
        "Serve immediately or chill for later.",
        "Can be frozen for protein popsicles!"
      ],
      prepTime: "5 mins",
      cookTime: "0 mins",
      totalTime: "5 mins",
      servings: "4",
      difficulty: "Easy",
      tips: [
        "Use full-fat Greek yogurt for creamiest texture",
        "Adjust sweetness to your child's preference",
        "Prep ahead for busy mornings"
      ],
      variations: [
        "Make it nut-free with sunflower seed butter",
        "Add protein powder for extra boost",
        "Use coconut yogurt for dairy-free version"
      ]
    },
    rating: 98,
    ratingCount: 312,
    commentCount: 89,
    isPublished: true,
    publishedAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-10")
  },
  {
    id: "4",
    slug: "no-bake-pumpkin-tiramisu",
    title: "No-Bake Pumpkin Tiramisu in 10 Mins | Kids LOVE It",
    description: "A quick and delicious no-bake pumpkin tiramisu that takes just 10 minutes to prepare. Kid-approved and perfect for fall gatherings!",
    youtubeUrl: "https://www.youtube.com/watch?v=iO0ESqwW5OQ",
    youtubeId: "iO0ESqwW5OQ",
    thumbnailUrl: "https://i.ytimg.com/vi/iO0ESqwW5OQ/hqdefault.jpg",
    enhancedRecipe: {
      ingredients: [
        "1 cup pumpkin puree",
        "8 oz mascarpone cheese",
        "1 cup heavy cream",
        "1/2 cup powdered sugar",
        "1 tsp vanilla extract",
        "1 tsp pumpkin pie spice",
        "Ladyfinger cookies",
        "Cinnamon for dusting"
      ],
      instructions: [
        "Whip heavy cream with powdered sugar until stiff peaks form.",
        "In another bowl, mix mascarpone, pumpkin puree, vanilla, and spices.",
        "Gently fold whipped cream into pumpkin mixture.",
        "Dip ladyfingers briefly in coffee or apple cider (optional).",
        "Layer ladyfingers in a dish.",
        "Spread half the pumpkin cream on top.",
        "Repeat layers ending with cream.",
        "Dust with cinnamon and refrigerate 2+ hours."
      ],
      prepTime: "10 mins",
      cookTime: "0 mins",
      totalTime: "10 mins + chilling",
      servings: "8",
      difficulty: "Easy",
      tips: [
        "Use real pumpkin puree, not pie filling",
        "Mascarpone should be room temperature",
        "Chilling overnight gives best flavor"
      ],
      variations: [
        "Skip the coffee dip for a kid-friendly version",
        "Add a layer of caramel sauce",
        "Use gingersnaps instead of ladyfingers"
      ]
    },
    rating: 95,
    ratingCount: 267,
    commentCount: 54,
    isPublished: true,
    publishedAt: new Date("2024-11-25"),
    updatedAt: new Date("2024-11-25")
  },
  {
    id: "5",
    slug: "french-pancakes-10-minutes",
    title: "How to Make French Pancakes in 10 Minutes!",
    description: "Master the art of making authentic French crepes in just 10 minutes. Light, delicate, and endlessly versatile for sweet or savory fillings.",
    youtubeUrl: "https://www.youtube.com/watch?v=0Q3eJM72GBE",
    youtubeId: "0Q3eJM72GBE",
    thumbnailUrl: "https://i.ytimg.com/vi/0Q3eJM72GBE/hqdefault.jpg",
    enhancedRecipe: {
      ingredients: [
        "1 cup all-purpose flour",
        "2 large eggs",
        "1 1/4 cups milk",
        "2 tbsp melted butter",
        "1 tbsp sugar",
        "Pinch of salt",
        "Butter for cooking",
        "Your favorite toppings"
      ],
      instructions: [
        "Blend all ingredients until smooth - no lumps!",
        "Let batter rest 5 minutes if time allows.",
        "Heat a non-stick pan over medium heat.",
        "Add a small pat of butter to coat.",
        "Pour 1/4 cup batter, swirl to spread thin.",
        "Cook 1-2 minutes until edges lift easily.",
        "Flip and cook 30 seconds more.",
        "Fill with Nutella, fruit, or savory ingredients."
      ],
      prepTime: "5 mins",
      cookTime: "5 mins",
      totalTime: "10 mins",
      servings: "8 crepes",
      difficulty: "Easy",
      tips: [
        "A blender makes the smoothest batter",
        "First crepe is always a test - don't worry if it's not perfect",
        "Keep cooked crepes warm under a towel"
      ],
      variations: [
        "Add cocoa powder for chocolate crepes",
        "Fill with ham and cheese for savory version",
        "Make ahead and freeze between parchment"
      ]
    },
    rating: 97,
    ratingCount: 456,
    commentCount: 123,
    isPublished: true,
    publishedAt: new Date("2024-11-20"),
    updatedAt: new Date("2024-11-20")
  }
];

export const mockComments: Comment[] = [
  {
    id: "c1",
    recipeId: "1",
    userId: "u1",
    user: { id: "u1", name: "Maria Garcia", image: null },
    content: "Made these short ribs last night and my kids devoured them! The 3-ingredient marinade is genius. So simple but so flavorful!",
    createdAt: new Date("2024-12-21"),
    adminReply: "So happy to hear that, Maria! That's exactly what we love - simple recipes the whole family enjoys!",
    adminReplyAt: new Date("2024-12-21")
  },
  {
    id: "c2",
    recipeId: "1",
    userId: "u2",
    user: { id: "u2", name: "James Chen", image: null },
    content: "Can I use regular short ribs instead of flanken-cut?",
    createdAt: new Date("2024-12-22"),
    adminReply: "Absolutely! English-cut ribs will work too, just increase cooking time to about 8-10 minutes per side since they're thicker.",
    adminReplyAt: new Date("2024-12-22")
  },
  {
    id: "c3",
    recipeId: "3",
    userId: "u3",
    user: { id: "u3", name: "Sophie Laurent", image: null },
    content: "My toddler is obsessed with this snack! I make a big batch every Sunday for the week. Game changer for daycare!",
    createdAt: new Date("2024-12-11"),
    adminReply: null,
    adminReplyAt: null
  },
  {
    id: "c4",
    recipeId: "5",
    userId: "u4",
    user: { id: "u4", name: "Michael Brown", image: null },
    content: "These crepes are restaurant quality! My wife is French and she approved. That's the ultimate test!",
    createdAt: new Date("2024-11-22"),
    adminReply: "Wow, French-wife approved - that's the best compliment we could receive! Merci!",
    adminReplyAt: new Date("2024-11-22")
  },
  {
    id: "c5",
    recipeId: "4",
    userId: "u5",
    user: { id: "u5", name: "Emma Wilson", image: null },
    content: "Made this for Thanksgiving instead of pumpkin pie. Everyone asked for the recipe! It's now our new tradition.",
    createdAt: new Date("2024-11-28"),
    adminReply: "That's amazing, Emma! So honored to be part of your family tradition. Happy cooking!",
    adminReplyAt: new Date("2024-11-28")
  }
];

export const mockUser: User = {
  id: "demo-user",
  email: "demo@example.com",
  name: "Demo User",
  image: null,
  isAdmin: false,
  createdAt: new Date()
};

export const mockAdmin: User = {
  id: "admin-user",
  email: "lan@ihavefoodathome.com",
  name: "Lan",
  image: null,
  isAdmin: true,
  createdAt: new Date()
};

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return mockRecipes.find(r => r.slug === slug);
}

export function getCommentsForRecipe(recipeId: string): Comment[] {
  return mockComments.filter(c => c.recipeId === recipeId);
}
