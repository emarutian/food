import { config, fields, collection } from "@keystatic/core";

export default config({
  storage:
    process.env.NODE_ENV === "production"
      ? {
          kind: "github",
          repo: "emarutian/food",
        }
      : {
          kind: "local",
        },
  collections: {
    recipes: collection({
      label: "Recipes",
      path: "content/recipes/*",
      format: { contentField: "content" },
      slugField: "title",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        youtubeUrl: fields.url({
          label: "YouTube URL",
        }),
        youtubeId: fields.text({
          label: "YouTube Video ID",
        }),
        thumbnailUrl: fields.url({
          label: "Thumbnail URL",
        }),
        difficulty: fields.select({
          label: "Difficulty",
          options: [
            { label: "Easy", value: "Easy" },
            { label: "Medium", value: "Medium" },
            { label: "Hard", value: "Hard" },
          ],
          defaultValue: "Easy",
        }),
        prepTime: fields.text({
          label: "Prep Time",
          defaultValue: "10 mins",
        }),
        cookTime: fields.text({
          label: "Cook Time",
          defaultValue: "20 mins",
        }),
        totalTime: fields.text({
          label: "Total Time",
          defaultValue: "30 mins",
        }),
        servings: fields.text({
          label: "Servings",
          defaultValue: "4",
        }),
        isPublished: fields.checkbox({
          label: "Published",
          defaultValue: false,
        }),
        publishedAt: fields.date({
          label: "Published Date",
        }),
        // Rich text content field for the recipe body (ingredients, instructions, tips, variations)
        content: fields.markdoc({
          label: "Recipe Content",
          description:
            "Write your recipe content using markdown. Include sections for Ingredients, Instructions, Tips, and Variations.",
        }),
      },
    }),
  },
});
