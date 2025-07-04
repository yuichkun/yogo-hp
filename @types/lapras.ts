// LAPRAS API Response Types based on https://github.com/lapras-inc/public-api-schema

export interface QiitaArticle {
  title: string;
  url: string;
  tags: string[];
  headlines: string[];
  stockers_count: number;
  updated_at: string;
}

export interface ZennArticle {
  title: string;
  url: string;
  tags: string[];
  posted_at: string;
}

export interface BlogArticle {
  title: string;
  url: string;
  tags: string[];
  posted_at: string;
}

export interface NoteArticle {
  url: string;
  title: string;
  tags: string[];
  like_count: number;
  published_at: string;
}

export interface HatenaArticle {
  url: string;
  title: string;
  bookmark_count: number;
  tags: string[];
  published_at: string;
}

export interface GitHubRepository {
  id: number;
  title: string;
  url: string;
  is_oss: boolean;
  is_fork: boolean;
  is_owner: boolean;
  description: string;
  stargazers_count: number;
  stargazers_url: string;
  forks: number;
  contributors_count: number;
  contributors_url: string;
  contributions: number;
  contributions_url: string;
  language: string;
  languages: {
    name: string;
    bytes: number;
  }[];
}

export interface Event {
  title: string;
  url: string;
  status: number;
  date: string;
  is_presenter: boolean;
  is_organizer: boolean;
}

export interface GitHubActivity {
  type: "github" | "github_pr";
  title: string;
  url: string;
  date: string;
}

export interface QiitaActivity {
  type: "qiita";
  title: string;
  url: string;
  date: string;
  tags: string[];
  headlines: string[];
  stockers_count: number;
}

export interface ZennActivity {
  type: "zenn";
  title: string;
  url: string;
  date: string;
  tags: string[];
}

export interface BlogActivity {
  type: "blog";
  title: string;
  url: string;
  date: string;
  tags: string[];
}

export interface NoteActivity {
  type: "note";
  title: string;
  url: string;
  date: string;
  tags: string[];
  like_count: number;
}

export interface HatenaActivity {
  type: "hatena_blog";
  title: string;
  url: string;
  date: string;
  tags: string[];
  bookmark_count: number;
}

export interface EventActivity {
  type: "connpass";
  title: string;
  url: string;
  date: string;
  is_presenter: boolean;
  is_organizer: boolean;
  status: number;
}

export type Activity =
  | GitHubActivity
  | QiitaActivity
  | ZennActivity
  | BlogActivity
  | NoteActivity
  | HatenaActivity
  | EventActivity;

// Main LAPRAS API Response Type - only fields of interest
export interface LaprasApiResponse {
  qiita_articles: QiitaArticle[];
  zenn_articles: ZennArticle[];
  blog_articles: BlogArticle[];
  note_articles: NoteArticle[];
  hatena_articles: HatenaArticle[];
  github_repositories: GitHubRepository[];
  events: Event[];
  activities: Activity[];
}
