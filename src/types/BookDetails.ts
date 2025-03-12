interface BookDetails {
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

export default BookDetails;
