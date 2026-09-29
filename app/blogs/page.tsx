"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Clock, Tag, User } from "lucide-react";
import styles from "./blogs.module.css";
import { BLOGS } from "@/lib/data";
import MovingRibbon from "@/components/MovingRibbon";
import FAQAccordion from "@/components/FAQAccordion";
import ContactCTA from "@/components/ContactCTA";
import ScrollReveal from "@/components/ScrollReveal";

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Immunotherapy", "Patient Guide", "Lung Cancer"];

  const filteredPosts = selectedCategory === "All"
    ? BLOGS
    : BLOGS.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const featuredPost = BLOGS[0];

  return (
    <>
      <section className={styles.heroSection}>
        <ScrollReveal variant="fade-up" className={`container ${styles.heroContent}`}>
          <span className={styles.kicker}>
            <BookOpen size={15} /> CLINICAL INSIGHTS &amp; PATIENT GUIDES
          </span>
          <h1 className={styles.title}>Cancer Care Articles &amp; Insights</h1>
          <p className={styles.subtitle}>
            Empowering patients and families with clear, evidence-based medical oncology knowledge written directly by Dr. (Brig.) A. K. Dhar.
          </p>
        </ScrollReveal>
      </section>

      <MovingRibbon variant="dark" />

      <section className={styles.mainSection}>
        <div className="container">
          {/* Featured Article Box */}
          {featuredPost && (
            <ScrollReveal variant="fade-up" delay={100} className={styles.featuredBox}>
              <span className={styles.featuredBadge}>FEATURED ARTICLE</span>
              <div className={styles.featuredGrid}>
                <div className={styles.featuredImageWrapper}>
                  <Image
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    width={787}
                    height={802}
                    className={styles.featuredImg}
                    priority
                  />
                </div>

                <div className={styles.featuredCopy}>
                  <div className={styles.metaRow}>
                    <span className={styles.catPill}><Tag size={13} /> {featuredPost.category}</span>
                    <span className={styles.timeMeta}><Clock size={13} /> {featuredPost.readTime}</span>
                  </div>

                  <h2 className={styles.featuredTitle}>
                    <Link href={`/blogs/${featuredPost.slug}`}>{featuredPost.title}</Link>
                  </h2>

                  <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>

                  <div className={styles.authorRow}>
                    <div className={styles.authorAvatar}>
                      <User size={16} />
                    </div>
                    <span>Written by {featuredPost.author} · {featuredPost.date}</span>
                  </div>

                  <Link href={`/blogs/${featuredPost.slug}`} className={styles.readBtn}>
                    Read Full Article <ArrowUpRight size={17} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Category Filter Tabs */}
          <ScrollReveal variant="fade-up" delay={150} className={styles.filterBar}>
            <span className={styles.filterLabel}>FILTER ARTICLES BY TOPIC:</span>
            <div className={styles.tabsRow}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterTab} ${selectedCategory === cat ? styles.filterTabActive : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Regular Blog Posts Grid */}
          <ScrollReveal variant="fade-up" delay={200} staggerChildren staggerDelay={100} className={styles.postsGrid}>
            {filteredPosts.map((post) => (
              <article key={post.slug} className={styles.postCard}>
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    width={787}
                    height={802}
                    className={styles.cardImg}
                  />
                  <span className={styles.categoryTag}>{post.category}</span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span><Clock size={13} /> {post.readTime}</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className={styles.cardTitle}>
                    <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className={styles.cardExcerpt}>{post.excerpt}</p>

                  <div className={styles.cardFooter}>
                    <Link href={`/blogs/${post.slug}`} className={styles.cardReadLink}>
                      Read Article <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <FAQAccordion title="Questions About Medical Oncology Insights" />
      <ContactCTA />
    </>
  );
}
