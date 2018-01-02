
interface Tags {
  count: number;
  name: string;
  title: string;
}

interface Images {
  large: string;
  medium: string;
  small: string;
}

export class Book {
  id: string;
  title: string;
  subtitle: string;
  author?: string[];
  publisher: string;
  pubdate: string;
  description: string;
  summary: string;
  author_intro?: string;
  isbn13?: string;
  isbn10?: string;
  rating?: string;
  type: string;
  url: string;
  image?: string;
  tag: Tags[];
  images?: Images;
  created_by?: string;
  alt?: string;
}
