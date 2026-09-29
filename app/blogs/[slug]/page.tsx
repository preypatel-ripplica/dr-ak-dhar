import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, CheckCircle2, Clock, Quote, Tag, User } from "lucide-react";
import styles from "./blogSlug.module.css";
import { BLOGS } from "@/lib/data";
import FAQAccordion from "@/components/FAQAccordion";
import ContactCTA from "@/components/ContactCTA";
import MovingRibbon from "@/components/MovingRibbon";
import ScrollReveal from "@/components/ScrollReveal";
import { Metadata } from "next";

export async function generateStaticParams() {
  return BLOGS.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOGS.find((p) => p.slug === slug);
  if (!post) {
    return { title: "Article Not Found" };
  }
  return {
    title: `${post.title} — Dr. (Brig.) A. K. Dhar Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOGS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOGS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <article className={styles.articleSection}>
        <div className="container">
          <Link href="/blogs" className={styles.backLink}>
            <ArrowLeft size={16} /> Back to all insights &amp; articles
          </Link>

          {/* Article Header */}
          <ScrollReveal variant="fade-up" className={styles.articleHeader}>
            <div className={styles.metaBadgeRow}>
              <span className={styles.categoryBadge}><Tag size={13} /> {post.category}</span>
              <span className={styles.readTime}><Clock size={13} /> {post.readTime}</span>
              <span className={styles.date}>{post.date}</span>
            </div>

            <h1 className={styles.articleTitle}>{post.title}</h1>
            <p className={styles.articleExcerpt}>{post.excerpt}</p>

            <div className={styles.authorBar}>
              <div className={styles.authorAvatar}>
                <User size={20} />
              </div>
              <div>
                <strong>{post.author}</strong>
                <span>Clinical Director &amp; Head — Medical Oncology · Marengo Asia Hospitals</span>
              </div>
            </div>
          </ScrollReveal>

          {/* 1. Hero Image */}
          <ScrollReveal variant="scale-up" delay={150} className={styles.heroImageFrame}>
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1270}
              height={1600}
              className={styles.heroImg}
              priority
            />
            <div className={styles.imageCaption}>
              <span>Medical Oncology Clinical Insights · Dr. (Brig.) A. K. Dhar</span>
            </div>
          </ScrollReveal>

          {/* Article Main Body */}
          <div className={styles.articleBody}>
            {/* Introduction */}
            <ScrollReveal variant="fade-up" delay={100} className={styles.introBlock}>
              {post.introduction.map((p, idx) => (
                <p key={idx} className={styles.introParagraph}>{p}</p>
              ))}
            </ScrollReveal>

            {/* Structured Sections */}
            {post.sections && post.sections.map((sec, idx) => (
              <ScrollReveal variant="fade-up" delay={100 + idx * 50} key={idx} className={styles.sectionBlock}>
                <h2 className={styles.sectionHeading}>{sec.heading}</h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className={styles.bodyParagraph}>{p}</p>
                ))}

                {/* 2. Inline Content Image embedded after Section 1 */}
                {idx === 0 && (
                  <div className={styles.contentImageFrame}>
                    <Image
                      src={post.contentImage}
                      alt={`Supporting clinical visual for ${post.title}`}
                      width={1270}
                      height={1600}
                      className={styles.contentImg}
                    />
                    <div className={styles.contentImageOverlay}>
                      <Quote size={20} className={styles.quoteIcon} />
                      <p>
                        &ldquo;Personalised medical oncology aligns biological testing with patient-centered care.&rdquo;
                      </p>
                    </div>
                  </div>
                )}
              </ScrollReveal>
            ))}

            {/* Key Takeaways Box */}
            {post.takeaways && post.takeaways.length > 0 && (
              <ScrollReveal variant="fade-up" delay={150} className={styles.takeawaysBox}>
                <h3><BookOpen size={18} /> Key Clinical Takeaways</h3>
                <ul>
                  {post.takeaways.map((item, i) => (
                    <li key={i}>
                      <CheckCircle2 size={18} className={styles.checkIcon} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            )}

            {/* Author Bio Card */}
            <ScrollReveal variant="fade-up" delay={200} className={styles.authorBioCard}>
              <div className={styles.bioAvatarRing}>
                <User size={24} />
              </div>
              <div>
                <h4>About the Author: {post.author}</h4>
                <p>
                  Senior Medical Oncologist with 35+ years of experience leading complex cancer care protocols at Marengo Asia Hospitals, Sector 56, Gurugram.
                </p>
                <Link href="/contact" className={styles.bioLink}>
                  Schedule a direct consultation with Dr. Dhar &rarr;
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </article>

      <MovingRibbon variant="accent" />

      {/* Article FAQ */}
      {post.faqs && post.faqs.length > 0 && (
        <FAQAccordion
          items={post.faqs}
          title="Frequently Asked Questions"
          kicker="ARTICLE Q&amp;A"
          subtitle="Key questions patients ask regarding this topic."
        />
      )}

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className="container">
            <h2 className={styles.relatedHeading}>Related Oncology Insights</h2>
            <ScrollReveal variant="fade-up" delay={100} staggerChildren staggerDelay={120} className={styles.relatedGrid}>
              {relatedPosts.map((r) => (
                <div key={r.slug} className={styles.relatedCard}>
                  <span className={styles.relatedCat}>{r.category}</span>
                  <h3><Link href={`/blogs/${r.slug}`}>{r.title}</Link></h3>
                  <p>{r.excerpt}</p>
                  <Link href={`/blogs/${r.slug}`} className={styles.relatedLink}>
                    Read Article <ArrowUpRight size={15} />
                  </Link>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
