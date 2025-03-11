interface BookDetails {
  first_publish_date: string;
  subtitle: string;
  title: string;
  covers: number[]; // Array of cover IDs
  lc_classifications: string[]; // Library of Congress classifications
  subject_people: string[]; // People related to the book
  key: string; // Unique key for the work
  authors: AuthorRole[]; // List of authors
  dewey_number: string[]; // Dewey Decimal number
  type: {
    key: string; // Type key (always '/type/work' in this case)
  };
  subjects: string[]; // Array of subjects related to the book
  description: {
    type: string; // Type of description ('/type/text')
    value: string; // The description text
  };
  first_sentence: {
    type: string; // Type of the sentence ('/type/text')
    value: string; // The first sentence
  };
  excerpts: Excerpt[]; // List of excerpts from the book
  latest_revision: number; // Latest revision number
  revision: number; // Revision number
  created: {
    type: string; // Type of created field ('/type/datetime')
    value: string; // Created datetime value
  };
  last_modified: {
    type: string; // Type of last modified field ('/type/datetime')
    value: string; // Last modified datetime value
  };
}

interface AuthorRole {
  type: {
    key: string; // Type of author role (always '/type/author_role')
  };
  author: {
    key: string; // Unique author key
  };
}

interface Excerpt {
  excerpt: string; // The excerpt text
}

export default BookDetails;
