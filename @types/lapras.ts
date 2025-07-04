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

export interface Activity {
  title: string;
  url: string;
  date: string;
  type:
    | "github"
    | "github_pr"
    | "speaker_deck"
    | "qiita"
    | "zenn"
    | "note"
    | "teratail"
    | "blog"
    | "connpass"
    | "hatena_blog";
}

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
