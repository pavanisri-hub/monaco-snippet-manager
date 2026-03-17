export type SnippetLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'go'
  | 'java'
  | 'csharp'
  | 'rust'
  | 'css'
  | 'html'
  | 'json'
  | 'sql';

export interface Snippet {
  id: string;
  title: string;
  content: string;
  language: SnippetLanguage;
  tags: string[]; 
  createdAt: string;
  updatedAt: string;
}
