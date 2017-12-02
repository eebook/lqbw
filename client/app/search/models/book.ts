
interface tags {
  count: number;
  name: string;
  title: string;
}

interface images {
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
  tag: tags;
  images?: images;
  created_by?: string;
}
