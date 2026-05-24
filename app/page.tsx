import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Recognition } from "@/components/Recognition";
import { ClientsPartners } from "@/components/ClientsPartners";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { ContactForm } from "@/components/ContactForm";
import { BlogPreview } from "@/components/BlogPreview";
import { Footer } from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <ClientsPartners />
        <Testimonials />
        <Recognition />
        <Products />
        <Services />
        <ContactForm />
        <BlogPreview posts={posts} />
      </main>
      <Footer />
    </>
  );
}
