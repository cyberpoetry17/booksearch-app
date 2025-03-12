interface BookOverview {
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

export default BookOverview;
