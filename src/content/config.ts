import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    lang: z.enum(["en", "fr"]),
    date: z.date(),
    hero: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    openGraph: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
      })
      .optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    translationKey: z.string().optional(),
  }),
});

const profile = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      locale: z.enum(["en", "fr"]),
      name: z.string(),
      title: z.string(),
      kicker: z.string(),
      ogDescription: z.string().optional(),
      location: z.string(),
      openTo: z.string().optional(),
      relocation: z.string().optional(),
      toolbox: z.array(z.string()),
      writing: z
        .array(
          z.object({
            title: z.string(),
            href: z.string(),
          }),
        )
        .optional(),
      contact: z.object({
        email: z.string().optional(),
        linkedin: z.string().optional(),
        github: z.string().optional(),
        pdf: z
          .object({
            file: z.string(),
            name: z.string(),
          })
          .optional(),
      }),
      experience: z.array(
        z.object({
          company: z.string(),
          role: z.string(),
          period: z.string(),
          location: z.string(),
          summary: z.array(z.string()),
          breakdown: z.string().optional(),
          stack: z.array(z.string()).optional(),
          links: z
            .array(
              z.object({
                label: z.string(),
                href: z.string(),
              }),
            )
            .optional(),
        }),
      ),
      projects: z
        .array(
          z.object({
            name: z.string(),
            blurb: z.string(),
            href: z.string().optional(),
          }),
        )
        .optional(),
    }),
});

export const collections = {
  posts,
  profile,
};
