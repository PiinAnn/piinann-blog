import type { CollectionEntry } from 'astro:content';

export type Lang = 'en' | 'zh';
type Post = CollectionEntry<'posts'>;

// Chinese posts live in src/content/posts/zh/, so their id starts with "zh/".
export const langOf = (post: Post): Lang => (post.id.startsWith('zh/') ? 'zh' : 'en');
export const slugOf = (post: Post): string => post.id.replace(/^zh\//, '');

export const postUrl = (post: Post): string =>
  langOf(post) === 'zh' ? `/zh/writings/${slugOf(post)}` : `/writings/${slugOf(post)}`;

export const indexUrl = (lang: Lang) => (lang === 'zh' ? '/zh/writings' : '/writings');

/** Find the same post in the other language, if it exists. */
export const counterpart = (post: Post, all: Post[]): Post | undefined =>
  all.find((p) => slugOf(p) === slugOf(post) && langOf(p) !== langOf(post));

export const formatDate = (d: Date, lang: Lang, long = false) =>
  lang === 'zh'
    ? d.toLocaleDateString('zh-TW', long ? { year: 'numeric', month: 'long', day: 'numeric' } : { year: 'numeric', month: 'long' })
    : d.toLocaleDateString('en-US', long ? { year: 'numeric', month: 'long', day: 'numeric' } : { year: 'numeric', month: 'short' });

export const ui = {
  en: {
    htmlLang: 'en',
    blogTitle: 'Piin-Ann Blog',
    intro: 'Studies, notes, and reflections.',
    studies: 'studies',
    notes: 'notes',
    empty: 'No posts yet.',
    contact: 'Want to discuss? Feel free to reach me at',
    home: '← home',
    back: '← back to writings',
    switchTo: '中文',
    onlyOther: '',
  },
  zh: {
    htmlLang: 'zh-Hant',
    blogTitle: 'Piin-Ann 部落格',
    intro: '研究、筆記與一些想法。',
    studies: '研究',
    notes: '筆記',
    empty: '還沒有文章。',
    contact: '想聊聊的話，歡迎寫信到',
    home: '← 首頁',
    back: '← 回到文章列表',
    switchTo: 'English',
    onlyOther: '英文',
  },
} as const;
