"use client";

import { useSearchParams } from "next/navigation";
import { Activity } from "../../@types/lapras";
import { useMemo } from "react";

// Type for grouped activities
type GroupedActivity = {
  activities: Activity[];
  startDate: string;
  endDate: string;
  type: Activity["type"];
  title: string;
  count: number;
};

// Helper function to get service icon URL
function getServiceIcon(type: Activity["type"]): string {
  const iconMap = {
    github: "/sns/github.svg",
    github_pr: "/sns/github.svg",
    qiita: "/sns/qiita.svg",
    zenn: "/sns/zenn.svg",
    note: "/sns/note.svg",
    blog: "/sns/blog.svg",
    connpass: "/sns/connpass.svg",
    hatena_blog: "/sns/hatena-blog.svg",
  };
  return iconMap[type] || "/sns/blog.svg";
}

// Helper function to format Japanese date
function formatJapaneseDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
}

// Helper function to format date range
function formatDateRange(startDate: string, endDate: string): string {
  if (startDate === endDate) {
    return formatJapaneseDate(startDate);
  }
  return `${formatJapaneseDate(startDate)}〜${formatJapaneseDate(endDate)}`;
}

// Helper function to get activity description
function getActivityDescription(activity: Activity): string {
  if (activity.type === "github_pr") {
    if (activity.title.includes("yuichkun/")) {
      return "PR作成";
    } else {
      return "OSSへのPR作成";
    }
  }

  const typeMap = {
    github: "リポジトリ作成",
    qiita: "Qiita記事投稿",
    zenn: "Zenn記事投稿",
    note: "note記事投稿",
    blog: "ブログ記事投稿",
    connpass: "イベント参加",
    hatena_blog: "はてなブログ記事投稿",
  };
  return typeMap[activity.type] || activity.type;
}

// Helper function to group consecutive activities with same type and title
function groupConsecutiveActivities(activities: Activity[]): GroupedActivity[] {
  if (activities.length === 0) return [];

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const groups: GroupedActivity[] = [];
  let currentGroup: Activity[] = [sortedActivities[0]];

  for (let i = 1; i < sortedActivities.length; i++) {
    const currentActivity = sortedActivities[i];
    const lastInGroup = currentGroup[currentGroup.length - 1];

    if (
      currentActivity.type === lastInGroup.type &&
      currentActivity.title === lastInGroup.title
    ) {
      currentGroup.push(currentActivity);
    } else {
      groups.push({
        activities: currentGroup,
        startDate: currentGroup[0].date,
        endDate: currentGroup[currentGroup.length - 1].date,
        type: currentGroup[0].type,
        title: currentGroup[0].title,
        count: currentGroup.length,
      });
      currentGroup = [currentActivity];
    }
  }

  if (currentGroup.length > 0) {
    groups.push({
      activities: currentGroup,
      startDate: currentGroup[0].date,
      endDate: currentGroup[currentGroup.length - 1].date,
      type: currentGroup[0].type,
      title: currentGroup[0].title,
      count: currentGroup.length,
    });
  }

  return groups.reverse();
}

type Props = {
  activitiesByYear: Record<string, Activity[]>;
  years: string[];
};

export function ActivitiesList({ activitiesByYear, years }: Props) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

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

  // Filter activities by category
  const filteredActivitiesByYear = useMemo(() => {
    if (!selectedCategory) return activitiesByYear;

    const filtered: Record<string, Activity[]> = {};

    for (const [year, activities] of Object.entries(activitiesByYear)) {
      const filteredActivities = activities.filter(
        (activity) => typeToCategory[activity.type] === selectedCategory
      );
      if (filteredActivities.length > 0) {
        filtered[year] = filteredActivities;
      }
    }

    return filtered;
  }, [activitiesByYear, selectedCategory]);

  const filteredYears = Object.keys(filteredActivitiesByYear).sort().reverse();

  if (filteredYears.length === 0) {
    return (
      <p className="text-gray-300">
        No activities found for the selected category.
      </p>
    );
  }

  return (
    <div className="space-y-12 px-4 sm:px-0">
      {filteredYears.map((year, yearIndex) => (
        <div key={year} className="space-y-6">
          <h2 className="text-2xl sm:text-xl font-bold text-white mb-8 sm:mb-6">
            {year}
          </h2>

          <div className="space-y-6 sm:space-y-4">
            {(() => {
              const groupedActivities = groupConsecutiveActivities(
                filteredActivitiesByYear[year]
              );
              return groupedActivities.map((group, index) => {
                const isLast =
                  index === groupedActivities.length - 1 &&
                  yearIndex === filteredYears.length - 1;
                return (
                  <div
                    key={index}
                    className="flex items-start space-x-4 sm:space-x-4"
                  >
                    {/* Mobile: Stack date above, Desktop: Date on left */}
                    <div className="hidden sm:flex flex-shrink-0 w-32 text-sm text-gray-300 text-right pt-1">
                      {formatDateRange(group.startDate, group.endDate)}
                    </div>

                    <div className="flex-shrink-0 relative">
                      {!isLast && (
                        <div className="absolute left-1/2 top-6 w-px h-20 sm:h-16 bg-gray-600 transform -translate-x-1/2"></div>
                      )}
                      <div className="w-4 h-4 sm:w-3 sm:h-3 bg-blue-400 rounded-full mt-2 relative z-10"></div>
                    </div>

                    <div className="flex-1 pb-6 sm:p-4">
                      {/* Mobile: Show date at top */}
                      <div className="sm:hidden text-sm text-gray-400 mb-2">
                        {formatDateRange(group.startDate, group.endDate)}
                      </div>

                      <div className="flex items-start space-x-3">
                        <img
                          src={getServiceIcon(group.type)}
                          alt={group.type}
                          className="w-7 h-7 sm:w-6 sm:h-6 rounded flex-shrink-0 mt-0.5"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-base sm:text-sm text-gray-200 font-medium">
                              {getActivityDescription(group.activities[0])}
                            </span>
                          </div>

                          <div className="flex items-start space-x-2">
                            <a
                              href={group.activities[0].url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 font-medium text-sm sm:text-sm leading-relaxed"
                            >
                              <span className="block">{group.title}</span>
                              {group.count > 1 && (
                                <span className="text-gray-400 text-xs mt-1 block">
                                  （{group.count}件）
                                </span>
                              )}
                            </a>
                            <svg
                              className="w-4 h-4 sm:w-3 sm:h-3 text-gray-400 flex-shrink-0 mt-0.5"
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
              });
            })()}
          </div>
        </div>
      ))}
    </div>
  );
}
