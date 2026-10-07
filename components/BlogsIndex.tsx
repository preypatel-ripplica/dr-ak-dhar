"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogs as defaultBlogs, type BlogPost } from "@/data/blogs";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./BlogPage.module.css";
import { useI18n } from "./I18nProvider";

export default function BlogsIndex({ posts }: { posts?: BlogPost[] }) {
  const { t, localizeHref } = useI18n();
  useScrollReveal();
  const list = posts && posts.length > 0 ? posts : defaultBlogs;

  return (
    <>
      <SiteHeader active="blogs" />
      <main id="main" tabIndex={-1}>
        <section className={styles.indexHero} aria-labelledby="blogs-title">
          <div className={`${styles.container} reveal`}>
            <span className={styles.kicker}>{t("BLOGS")}</span>
            <h1 id="blogs-title">
              {t("Clear answers for")}
              <br />
              <em>{t("complex cancer questions.")}</em>
            </h1>
            <p>
              {t("Practical guidance from Dr. (Brig.) A. K. Dhar — written to help patients and families understand treatment choices, reports, and next steps.")}
            </p>
          </div>
        </section>

        <section className={styles.container} aria-label={t("All blogs")}>
          <div className={styles.indexGrid}>
            {list.map((post, index) => (
              <Link
                key={post.slug}
                href={localizeHref(`/blogs/${post.slug}`)}
                className={`${styles.indexCard} reveal reveal-delay-${(index % 3) + 1}`}
              >
                <div className={styles.indexCardMedia}>
                  <Image src={post.image} alt={t(post.imageAlt)} fill sizes="(max-width: 900px) 100vw, 360px" />
                </div>
                <div className={styles.indexCardBody}>
                  <div className={styles.metaRow}>
                    <strong>{t(post.category.toUpperCase())}</strong>
                    <span>{t(post.dateLabel)}</span>
                    <span>{t(post.readTime)}</span>
                  </div>
                  <h2>{t(post.title)}</h2>
                  <p>{t(post.excerpt)}</p>
                  <em>
                    {t("Read article")} <ArrowUpRight size={15} />
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

