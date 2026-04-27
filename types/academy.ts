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
  solubility?: string;
  half_life?: string;
  bioavailability?: string;
  storage_condition?: string;
  tab_research?: string;
  tab_studies?: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}
