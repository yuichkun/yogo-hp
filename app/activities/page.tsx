import { Metadata } from "next";
import { SHARED_METADATA } from "../shared-metadata";
import {
  LaprasApiResponse,
  Activity,
  QiitaActivity,
  ZennActivity,
  BlogActivity,
  NoteActivity,
  HatenaActivity,
  EventActivity,
  GitHubActivity,
  QiitaArticle,
  ZennArticle,
  BlogArticle,
  NoteArticle,
  HatenaArticle,
  Event,
} from "../../@types/lapras";
import { Suspense } from "react";
import { TagList, FilterItem } from "../components/TagList";
import { ActivitiesList } from "../components/ActivitiesList";

export const dynamic = "force-dynamic";

// Helper function to group activities by year
function groupActivitiesByYear(
  activities: Activity[]
): Record<string, Activity[]> {
  return activities.reduce(
    (groups, activity) => {
      const year = new Date(activity.date).getFullYear().toString() + "年";
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(activity);
      return groups;
    },
    {} as Record<string, Activity[]>
  );
}

// Helper function to get categories for filtering
function getActivityCategories(activities: Activity[]): FilterItem[] {
  // Map activity types to categories
  const typeToCategory: Record<Activity["type"], string> = {
    qiita: "articles",
    note: "articles",
    zenn: "articles",
    blog: "articles",
    hatena_blog: "articles",
    connpass: "events",
    github: "github",
    github_pr: "github",
  };

  // Get all unique types in the activities
  const typesInData = new Set(activities.map((a) => a.type));

  // Build category items based on what's actually in the data
  const categories: FilterItem[] = [];

  // Check if we have any article types
  const articleTypes: Activity["type"][] = [
    "qiita",
    "note",
    "zenn",
    "blog",
    "hatena_blog",
  ];
  if (articleTypes.some((type) => typesInData.has(type))) {
    categories.push({
      id: "articles",
      name: "articles",
      displayName: "Articles",
    });
  }

  // Check if we have GitHub activity
  const githubTypes: Activity["type"][] = ["github", "github_pr"];
  if (githubTypes.some((type) => typesInData.has(type))) {
    categories.push({
      id: "github",
      name: "github",
      displayName: "GitHub",
    });
  }

  // Check if we have events
  if (typesInData.has("connpass")) {
    categories.push({
      id: "events",
      name: "events",
      displayName: "Events",
    });
  }

  return categories;
}

// Transform functions for each data source
function transformQiitaArticles(articles: QiitaArticle[]): QiitaActivity[] {
  return articles.map((article) => ({
    type: "qiita" as const,
    title: article.title,
    url: article.url,
    date: article.updated_at,
    tags: article.tags,
    headlines: article.headlines,
    stockers_count: article.stockers_count,
  }));
}

function transformZennArticles(articles: ZennArticle[]): ZennActivity[] {
  return articles.map((article) => ({
    type: "zenn" as const,
    title: article.title,
    url: article.url,
    date: article.posted_at,
    tags: article.tags,
  }));
}

function transformBlogArticles(articles: BlogArticle[]): BlogActivity[] {
  return articles.map((article) => ({
    type: "blog" as const,
    title: article.title,
    url: article.url,
    date: article.posted_at,
    tags: article.tags,
  }));
}

function transformNoteArticles(articles: NoteArticle[]): NoteActivity[] {
  return articles.map((article) => ({
    type: "note" as const,
    title: article.title,
    url: article.url,
    date: article.published_at,
    tags: article.tags,
    like_count: article.like_count,
  }));
}

function transformHatenaArticles(articles: HatenaArticle[]): HatenaActivity[] {
  return articles.map((article) => ({
    type: "hatena_blog" as const,
    title: article.title,
    url: article.url,
    date: article.published_at,
    tags: article.tags,
    bookmark_count: article.bookmark_count,
  }));
}

function transformEvents(events: Event[]): EventActivity[] {
  return events.map((event) => ({
    type: "connpass" as const,
    title: event.title,
    url: event.url,
    date: event.date,
    is_presenter: event.is_presenter,
    is_organizer: event.is_organizer,
    status: event.status,
  }));
}

// Server Component with async data fetching
export default async function Activities() {
  try {
    // Fetch data directly in the component
    const response = await fetch("https://lapras.com/public/yuichkun.json", {
      next: { revalidate: 3600 }, // Cache for 1 hour and revalidate
    });

    if (!response.ok) {
      throw new Error("Failed to fetch activities");
    }

    const data: LaprasApiResponse = await response.json();

    // Combine activities from different sources
    const activities: Activity[] = [
      // Keep GitHub activities from the activities array
      ...data.activities.filter(
        (a) => a.type === "github" || a.type === "github_pr"
      ),
      // Transform and add activities from other sources
      ...transformQiitaArticles(data.qiita_articles || []),
      ...transformZennArticles(data.zenn_articles || []),
      ...transformBlogArticles(data.blog_articles || []),
      ...transformNoteArticles(data.note_articles || []),
      ...transformHatenaArticles(data.hatena_articles || []),
      ...transformEvents(data.events || []),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Group activities by year
    const activitiesByYear = groupActivitiesByYear(activities);
    const years = Object.keys(activitiesByYear).sort().reverse(); // Most recent first

    // Get categories for filtering
    const activityCategories = getActivityCategories(activities);

    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-white">Activities</h1>

          {/* Filter chips */}
          <div className="mb-8 -mx-4">
            <Suspense>
              <TagList
                items={activityCategories}
                baseUrl="/activities"
                paramName="category"
                allLabel="ALL"
              />
            </Suspense>
          </div>

          {years.length > 0 ? (
            <Suspense>
              <ActivitiesList
                activitiesByYear={activitiesByYear}
              />
            </Suspense>
          ) : (
            <p className="text-gray-300">No activities found.</p>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching activities:", error);

    return (
      <main className="container mx-auto px-4 py-8">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-white">Activities</h1>
          <div className="bg-red-900 bg-opacity-50 border border-red-600 rounded-lg p-4">
            <p className="text-red-200">
              Failed to load activities. Please try again later.
            </p>
          </div>
        </div>
      </main>
    );
  }
}

export const metadata: Metadata = {
  title: "Activities",
  description: "Activities of Yuichi Yogo",
  twitter: {
    ...SHARED_METADATA.twitter,
    title: `YOGO HP | Activities`,
    description: "Activities of Yuichi Yogo",
  },
};
