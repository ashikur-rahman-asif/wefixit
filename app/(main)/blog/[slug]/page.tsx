import Container from "@/components/container";
import Image from "next/image";
import { BlogContent } from "./_components/blog-content";
import { SocialShare } from "./_components/social-share";

// Dummy HTML content to test rich text formatting
const dummyHtml = `
  <p>Technology has revolutionized the way we work, live, and communicate. As we continue to advance, the boundaries of what is possible are constantly being pushed. In this post, we will explore the <strong>impact of remote work</strong> and how to handle it effectively.</p>
  
  <h2>The Rise of Remote Work</h2>
  <p>Working from home is no longer a futuristic concept; it's a <em>present reality</em>. It has been integrated into our daily lives seamlessly.</p>
  
  <img src="/blog/top-blog-2.jpg" alt="Working remotely" />
  
  <blockquote>"The advance of technology is based on making it fit in so that you don't really even notice it, so it's part of everyday life." - Bill Gates</blockquote>
  
  <h3>Key Benefits of WFH:</h3>
  <ul>
    <li>Automation of repetitive tasks</li>
    <li>Improved decision making without office distractions</li>
    <li>Enhanced work-life balance for employees</li>
  </ul>

  <h3>Important Skills to Master</h3>
  <ol>
    <li>Time Management</li>
    <li>Self Motivation</li>
    <li>Clear Communication</li>
  </ol>
  
  <p>Here is an example of some inline code: <code>npm install wefixit</code>. And here is a code block showing a basic config:</p>
  
  <pre><code>{
  "theme": "dark",
  "notifications": true,
  "timezone": "UTC"
}</code></pre>
  
  <img src="/blog/top-blog-1.jpg" alt="Tech workspace" />
  
  <h3>Data Security in the Digital Age</h3>
  <p>With great power comes great responsibility. As we rely more on digital platforms, the importance of data security cannot be overstated.</p>
  
  <table>
    <thead>
      <tr>
        <th>Threat Type</th>
        <th>Description</th>
        <th>Prevention</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Phishing</td>
        <td>Deceptive emails to steal information</td>
        <td>Verify sender address</td>
      </tr>
      <tr>
        <td>Malware</td>
        <td>Malicious software targeting your OS</td>
        <td>Use antivirus software</td>
      </tr>
    </tbody>
  </table>
  
  <p>It's crucial for organizations to stay vigilant. Visit our <a href="/services">services page</a> to learn more.</p>
  <hr />
  <p>In conclusion, the future of work is hybrid, and it's up to us to adapt and thrive in this ever-changing landscape.</p>
`;

export default function SingleBlogPage() {
  return (
    <div className="bg-white">
      <Container className="py-2">
        <div className="max-w-4xl mx-auto text-center mb-2 md:mb-3">
          <div className="flex items-center justify-center gap-2 text-secondary font-medium mb-1 md:mb-2 text-sm md:text-base">
            <span>7 Sep 2026</span>
            <span className="size-1.5 bg-secondary rounded-full"></span>
            <span className="text-brand">Career Tips</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight">
            How Working From Home Can Reduce Stress
          </h1>
        </div>

        <div className="relative w-full aspect-video md:aspect-1240/531 rounded-2xl md:rounded-[32px] overflow-hidden mb-3 mx-auto max-w-310">
          <Image
            src="/blog/top-blog-1.jpg"
            alt="Blog Cover"
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <BlogContent content={dummyHtml} />
          <div className="mt-3">
            <SocialShare url="https://wefixit.com/blog/how-working-from-home-can-reduce-stress" />
          </div>
        </div>
      </Container>
    </div>
  );
}
