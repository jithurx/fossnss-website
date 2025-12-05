import { z, defineCollection } from 'astro:content';

const blog = defineCollection({
  type: 'content', 
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
    username: z.string().optional(),
    desc: z.string().optional(),
    cover: z.string().optional(),
    tag: z.string().optional(),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().optional(),
    username: z.string().optional(),
    cover: z.string().optional(),
  }),
});

const members = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    designation: z.string().optional(),
    url: z.string().url().optional(),
    avathar: z.string().url().optional(),
    dept: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    skills: z.union([z.string(), z.array(z.string())]).optional()
  }),
});

export const collections = {
  blog,
  events,
  members
};