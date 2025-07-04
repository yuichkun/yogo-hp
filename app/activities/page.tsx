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

// Helper function to get unique activity types
function getActivityTypes(activities: Activity[]): FilterItem[] {
  const typeMap: Record<Activity["type"], string> = {
    github: "リポジトリ作成",
    github_pr: "Pull Request",
    qiita: "Qiita",
    zenn: "Zenn",
    note: "note",
    blog: "ブログ",
    connpass: "イベント参加",
    hatena_blog: "はてなブログ",
  };

  const uniqueTypes = Array.from(new Set(activities.map((a) => a.type)));

  return uniqueTypes
    .map((type) => ({
      id: type,
      name: type,
      displayName: typeMap[type] || type,
    }))
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
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

    // Get unique activity types for filtering
    const activityTypes = getActivityTypes(data.activities);

    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-white">Activities</h1>

          {/* Filter chips */}
          <div className="mb-8 -mx-4">
            <Suspense>
              <TagList
                items={activityTypes}
                baseUrl="/activities"
                paramName="type"
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
