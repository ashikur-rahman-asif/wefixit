import { RecentBlogCard } from "../../_components/recent-blog-card";

export function BlogSidebar() {
  // Dummy data for the sidebar
  const articles = [
    {
      id: 1,
      imageSrc: "/blog/top-blog-1.jpg",
      date: "16 May 2022",
      category: "Career Tips",
      title: "How Intrapreneurship Can Help You Stand Out At Work",
    },
    {
      id: 2,
      imageSrc: "/blog/top-blog-2.jpg",
      date: "3 Sep 2022",
      category: "Interviews",
      title: "How To Know Your Resume Is Ready To Be Submitted",
    },
    {
      id: 3,
      imageSrc: "/blog/top-blog-1.jpg",
      date: "7 Feb 2022",
      category: "Interviews",
      title: "How To Sharpen Your Social Skills When You WFH",
    },
  ];

  return (
    <div className="flex flex-col gap-8 sticky top-24">
      <div className="bg-lightBrand p-6 lg:p-8 rounded-2xl md:rounded-3xl">
        <h3 className="text-xl md:text-2xl font-bold text-primary mb-6 md:mb-8">
          Recent Articles
        </h3>
        <div className="flex flex-col gap-6 md:gap-8">
          {articles.map((article) => (
            <RecentBlogCard
              key={article.id}
              imageSrc={article.imageSrc}
              date={article.date}
              category={article.category}
              title={article.title}
              href={`/blog/${article.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
