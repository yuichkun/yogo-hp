import { Metadata } from "next";
import { SHARED_METADATA } from "../shared-metadata";
import { LaprasApiResponse, Activity } from "../../@types/lapras";

// Helper function to get service icon URL
function getServiceIcon(type: Activity["type"]): string {
  const iconMap = {
    github: "https://picsum.photos/24/24?random=1",
    github_pr: "https://picsum.photos/24/24?random=2",
    qiita: "https://picsum.photos/24/24?random=3",
    zenn: "https://picsum.photos/24/24?random=4",
    note: "https://picsum.photos/24/24?random=5",
    speaker_deck: "https://picsum.photos/24/24?random=6",
    teratail: "https://picsum.photos/24/24?random=7",
    blog: "https://picsum.photos/24/24?random=8",
    connpass: "https://picsum.photos/24/24?random=9",
    hatena_blog: "https://picsum.photos/24/24?random=10",
  };
  return iconMap[type] || "https://picsum.photos/24/24?random=0";
}

// Helper function to format Japanese date
function formatJapaneseDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
}

// Helper function to get activity description
function getActivityDescription(activity: Activity): string {
  const typeMap = {
    github: "リポジトリ作成",
    github_pr: "自分のリポジトリへのPull Request作成",
    qiita: "Qiita記事投稿",
    zenn: "Zenn記事投稿",
    note: "note記事投稿",
    speaker_deck: "SpeakerDeckスライド投稿",
    teratail: "Teratail回答",
    blog: "ブログ記事投稿",
    connpass: "イベント参加",
    hatena_blog: "はてなブログ記事投稿",
  };
  return typeMap[activity.type] || activity.type;
}

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

// Server Component with async data fetching
export default async function Activities() {
  try {
    // Fetch data directly in the component
    const response = await fetch("https://lapras.com/public/yuichkun.json", {
      // Caching options:
      next: { revalidate: 3600 }, // Cache for 1 hour and revalidate
      // OR: cache: 'no-store' for fresh data on every request
      // OR: cache: 'force-cache' for static-like behavior
    });

    if (!response.ok) {
      throw new Error("Failed to fetch activities");
    }

    const data: LaprasApiResponse = await response.json();

    // Group activities by year
    const activitiesByYear = groupActivitiesByYear(data.activities);
    const years = Object.keys(activitiesByYear).sort().reverse(); // Most recent first

    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-white">Activities</h1>

          {years.length > 0 ? (
            <div className="space-y-8">
              {years.map((year, yearIndex) => (
                <div key={year} className="space-y-4">
                  {/* Year Header */}
                  <h2 className="text-xl font-bold text-white mb-6">{year}</h2>

                  {/* Activities for this year */}
                  <div className="space-y-4">
                    {activitiesByYear[year]
                      .sort(
                        (a, b) =>
                          new Date(b.date).getTime() -
                          new Date(a.date).getTime()
                      )
                      .map((activity, index) => {
                        const isLast =
                          index === activitiesByYear[year].length - 1 &&
                          yearIndex === years.length - 1;
                        return (
                          <div
                            key={index}
                            className="flex items-start space-x-4"
                          >
                            {/* Date */}
                            <div className="flex-shrink-0 w-16 text-sm text-gray-300 text-right pt-1">
                              {formatJapaneseDate(activity.date)}
                            </div>

                            {/* Timeline dot with vertical line */}
                            <div className="flex-shrink-0 relative">
                              {/* Vertical line */}
                              {!isLast && (
                                <div className="absolute left-1/2 top-6 w-px h-16 bg-gray-600 transform -translate-x-1/2"></div>
                              )}
                              {/* Timeline dot */}
                              <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 relative z-10"></div>
                            </div>

                            {/* Activity Card */}
                            <div className="flex-1 p-4">
                              <div className="flex items-start space-x-3">
                                {/* Service Icon */}
                                <img
                                  src={getServiceIcon(activity.type)}
                                  alt={activity.type}
                                  className="w-6 h-6 rounded flex-shrink-0 mt-0.5"
                                />

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-sm text-gray-300">
                                      {getActivityDescription(activity)}
                                    </span>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    <a
                                      href={activity.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:text-blue-300 font-medium text-sm truncate"
                                    >
                                      {activity.title}
                                    </a>
                                    <svg
                                      className="w-3 h-3 text-gray-400 flex-shrink-0"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
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
