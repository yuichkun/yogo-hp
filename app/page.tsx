// TODO: replace this with CMS
const news = [
  {
    id: 1,
    date: "2024/06/09",
    title: "HPを更新しました",
  },
];

export default function Home() {
  return (
    <main className="p-8 font-mono max-w-96 mx-auto">
      <div className="flex justify-center">
        <span className="bg-black mb-8">What&apos;s New?</span>
      </div>

      <ul>
        {news.map((n) => (
          <li key={n.id}>
            <div
              className="grid grid-cols-2 text-sm bg-gray-200 text-black mix-blend-overlay"
              style={{
                gridTemplateColumns: "120px auto",
              }}
            >
              <div className="">{n.date}</div>
              <div className="text-sm underline">{n.title}</div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
