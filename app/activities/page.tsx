import { Metadata } from "next";
import { SHARED_METADATA } from "../shared-metadata";
import { LaprasApiResponse, Activity } from "../../@types/lapras";
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

    // Group activities by year
    const activitiesByYear = groupActivitiesByYear(data.activities);
    const years = Object.keys(activitiesByYear).sort().reverse(); // Most recent first

    // Get categories for filtering
    const activityCategories = getActivityCategories(data.activities);

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
                years={years}
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
