export interface BookOverview {
  author_key: string[]; //snake case API
  author_name: string[];
  coverEditionKey: string;
  cover_i?: number;
  edition_count: number;
  first_publish_year: number;
  key: string;
  language: string[];
  subtitle: string;
  title: string;
}

export interface BookDetails {
  first_publish_date: string;
  subtitle: string;
  title: string;
  covers: number[];
  lc_classifications: string[];
  subject_people: string[];
  key: string;
  authors: AuthorRole[];
  dewey_number: string[];
  type: {
    key: string;
  };
  subjects: string[];
  description: {
    type: string;
    value: string;
  };
  first_sentence: {
    type: string;
    value: string;
  };
  excerpts: Excerpt[];
  latest_revision: number;
  revision: number;
  created: {
    type: string;
    value: string;
  };
  last_modified: {
    type: string;
    value: string;
  };
}

interface AuthorRole {
  type: {
    key: string;
  };
  author: {
    key: string;
  };
}

interface Excerpt {
  excerpt: string;
}

export interface ViewedBook {
  imageUrl: string;
  title: string;
  key: string;
  coverId?: string;
}
