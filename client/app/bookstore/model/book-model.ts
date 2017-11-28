export class Book {
  name: string;
  tags: Array<string>;
  type: string;
  uuid: string;
  download_url: string;
  created_by: string;
}

interface tags {
  count: number;
  name: string;
  title: string;
}

export interface BookTmp {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishDate: string;
  description: string;
  price: string;
  summary: string;
  author_intro: string;
  isbn13?: string;
  isbn10?: string;
  rating?: string;
  type: string;
  url: string;
  tag: tags;
}
