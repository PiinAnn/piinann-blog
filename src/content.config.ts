import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    category: z.enum(['studies', 'notes']),
    tags: z.array(z.string()).optional(),
    doi: z.string().optional(),
  }),
});

export const collections = { posts };