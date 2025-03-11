interface BookOverview {
  authorKey: string[]; // Array of author keys (e.g., ["OL1770A", "OL4324199A"])
  authorName: string[]; // Array of author names (e.g., ["Rabindranath Tagore", "Marie Luise Gothein"])
  coverEditionKey: string; // Edition key for the cover (e.g., "OL5092558M")
  coverI?: number; // Cover image ID (e.g., 8246100)
  editionCount: number; // Number of editions available (e.g., 215)
  firstPublishYear: number; // Year the book was first published (e.g., 1910)
  key: string; // Key for the work (e.g., "/works/OL308575W")
  language: string[]; // Array of languages the book is available in (e.g., ["mag", "bam", "kan", "ger"])
  subtitle: string; // Subtitle of the book (e.g., "a collection of prose translations made by the author from the original Bengali")
  title: string; // Title of the book (e.g., "Gitanjali (song offerings)")
}

export default BookOverview;
