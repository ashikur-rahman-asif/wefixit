import { Metadata } from "next";

import { BlogHero } from "@/components/blog/hero";
import Container from "@/components/container";
import { TopBlogCard } from "./_components/top-blog-card";
import { RecentArticles } from "./_components/recent-articles";

export const metadata: Metadata = {
  title: "Blog - WeFixIt",
  description: "Stay Informed with the WeFixIt Blog",
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <Container className="py-6 lg:py-10">
        {/* top blogs  */}
        <div className="grid lg:grid-cols-2 gap-8">
          <TopBlogCard
            imageSrc="/blog/top-blog-1.jpg"
            date="9 Sep 2022"
            category="Career Tips"
            title="How Working From Home Can Reduce Stress"
            description="Feeling like work is a constant source of stress? You're not alone..."
            href="/blog/how-working-from-home-can-reduce-stress"
          />
          <TopBlogCard
            imageSrc="/blog/top-blog-2.jpg"
            date="9 Sep 2022"
            category="Career Tips"
            title="How To Break Into Tech Industries: 5 Tips"
            description="Whether you're switching careers or starting fresh, breaking into tech..."
            href="/blog/how-to-break-into-tech-industries-5-tips"
          />
        </div>
        
        {/* recent articles  */}
        <RecentArticles />
      </Container>
    </>
  );
}
