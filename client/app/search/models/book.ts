export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishDate: string;
    description: string;
    averageRating: number;
    ratingsCount: number;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
}

export class Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishDate: string;
    description: string;
    averageRating: number;
    ratingsCount: number;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
}

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

export class BookTmp {
  id: string;
  title: string;
  subtitle: string;
  author?: string[];
  publisher: string;
  publishDate: string;
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
}


export function generateMockBook(): Book {
  return {
    id: '1',
    volumeInfo: {
      title: 'title',
      subtitle: 'subtitle',
      authors: ['author'],
      publisher: 'publisher',
      publishDate: '',
      description: 'description',
      averageRating: 3,
      ratingsCount: 5,
      imageLinks: {
        thumbnail: 'string',
        smallThumbnail: 'string',
      },
    },
  };
}
