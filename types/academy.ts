export interface AcademyArticle {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  cas_number?: string;
  purity?: string;
  sequence?: string;
  molecular_weight?: string;
  molecular_formula?: string;
  appearance?: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}
