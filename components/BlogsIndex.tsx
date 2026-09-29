"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogs } from "@/data/blogs";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./BlogPage.module.css";

export default function BlogsIndex() {
  useScrollReveal();

  return (
    <>
      <SiteHeader active="blogs" />
      <main id="main" tabIndex={-1}>
        <section className={styles.indexHero} aria-labelledby="blogs-title">
          <div className={`${styles.container} reveal`}>
            <span className={styles.kicker}>BLOGS</span>
            <h1 id="blogs-title">
              Clear answers for
              <br />
              <em>complex cancer questions.</em>
            </h1>
            <p>
              Practical guidance from Dr. (Brig.) A. K. Dhar — written to help patients and families
              understand treatment choices, reports, and next steps.
            </p>
          </div>
        </section>

        <section className={styles.container} aria-label="All blogs">
          <div className={styles.indexGrid}>
            {blogs.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className={`${styles.indexCard} reveal reveal-delay-${(index % 3) + 1}`}
              >
                <div className={styles.indexCardMedia}>
                  <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 900px) 100vw, 360px" />
                </div>
                <div className={styles.indexCardBody}>
                  <div className={styles.metaRow}>
                    <strong>{post.category.toUpperCase()}</strong>
                    <span>{post.dateLabel}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <em>
                    Read article <ArrowUpRight size={15} />
                  </em>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
