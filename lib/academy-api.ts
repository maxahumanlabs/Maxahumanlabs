import axios from 'axios';
import { AcademyArticle } from '@/types/academy';

const baseURL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL?.replace(/\/$/, '');

const api = axios.create({
  baseURL: `${baseURL}/wp-json/wp/v2`,
});

export async function getAcademyArticles(): Promise<AcademyArticle[]> {
  try {
    // _embed=1 is used to fetch featured images along with the posts
    const res = await api.get('/academy?_embed=1');
    return res.data;
  } catch (error) {
    console.error('Error fetching academy articles:', error);
    return [];
  }
}

export async function getAcademyArticleBySlug(slug: string): Promise<AcademyArticle | null> {
  try {
    const res = await api.get(`/academy?slug=${slug}&_embed=1`);
    return res.data.length > 0 ? res.data[0] : null;
  } catch (error) {
    console.error(`Error fetching academy article ${slug}:`, error);
    return null;
  }
}
