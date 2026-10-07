"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";
import type { BlogPost } from "@/data/blogs";
import { blogs } from "@/data/blogs";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./BlogPage.module.css";
import { useI18n } from "./I18nProvider";

type Props = { post: BlogPost };

export default function BlogPostPage({ post }: Props) {
  const { t, localizeHref } = useI18n();
  useScrollReveal();
  const [activeId, setActiveId] = useState("overview");
  const [openFaq, setOpenFaq] = useState(0);
  const related = blogs.filter((item) => item.slug !== post.slug).slice(0, 2);

  const toc = [
    { id: "overview", label: t("Overview") },
    ...post.sections.map((section) => ({ id: section.id, label: t(section.heading) })),
    { id: "takeaway", label: t("Key takeaway") },
    { id: "faqs", label: t("FAQs") },
  ];

  useEffect(() => {
    const ids = [
      "overview",
      ...post.sections.map((section) => section.id),
      "takeaway",
      "faqs",
    ];

    const updateActive = () => {
      const marker = 160;
      let next = ids[0];

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - marker <= 0) {
          next = id;
        } else {
          break;
        }
      }

      setActiveId((prev) => (prev === next ? prev : next));
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [post.slug, post.sections]);

  return (
    <>
      <SiteHeader active="blogs" />
      <main id="main" tabIndex={-1}>
        <article>
          <header className={styles.postHero}>
            <div className={styles.container}>
              <div className={`${styles.postHeroInner} reveal`}>
                <Link href={localizeHref("/blogs")} className={styles.backLink}>
                  <ArrowLeft size={15} strokeWidth={1.8} />
                  {t("All blogs")}
                </Link>
                <div className={styles.metaRow}>
                  <strong>{t(post.category.toUpperCase())}</strong>
                  <span>{t(post.dateLabel)}</span>
                  <span>{t(post.readTime)}</span>
                </div>
                <h1>{t(post.title)}</h1>
                <p className={styles.postLead}>{t(post.excerpt)}</p>
              </div>

              <div className={`${styles.postMedia} reveal reveal-delay-1`}>
                <Image
                  src={post.image}
                  alt={t(post.imageAlt)}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 1100px"
                />
              </div>
            </div>
          </header>

          <div className={styles.postBody}>
            <div className={styles.container}>
              <div className={styles.postLayout}>
                <nav className={`${styles.tocNav} reveal`} aria-label={t("Article sections")}>
                  <span className={styles.tocLabel}>{t("ON THIS PAGE")}</span>
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={activeId === item.id ? styles.tocActive : undefined}
                    >
                      {item.label}
                    </a>
                  ))}

                  <div className={styles.tocCta}>
                    <span>{t("Questions about your reports?")}</span>
                    <Link href={localizeHref("/contact")}>
                      {t("Book appointment")} <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </nav>

                <div className={`${styles.article} reveal reveal-delay-1`}>
                  <section id="overview" className={styles.overview}>
                    <h2>{t("Overview")}</h2>
                    <p>{t(post.intro)}</p>
                  </section>

                  {post.sections.map((section) => (
                    <section key={section.id} id={section.id} className={styles.section}>
                      <h2>{t(section.heading)}</h2>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{t(paragraph)}</p>
                      ))}
                      {section.bullets ? (
                        <ul>
                          {section.bullets.map((item) => (
                            <li key={item}>{t(item)}</li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}

                  <div id="takeaway" className={styles.takeaway}>
                    <span>{t("KEY TAKEAWAY")}</span>
                    <p>{t(post.takeaway)}</p>
                  </div>

                  <section id="faqs" className={styles.faqSection}>
                    <span className={styles.kicker}>{t("FAQS")}</span>
                    <h2>{t("Frequently asked questions")}</h2>
                    <div className={styles.faqList}>
                      {post.faqs.map(([question, answer], index) => {
                        const open = openFaq === index;
                        return (
                          <div key={question} className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`}>
                            <button
                              type="button"
                              aria-expanded={open}
                              onClick={() => setOpenFaq(open ? -1 : index)}
                            >
                              <span>{t(question)}</span>
                              <ChevronDown size={18} />
                            </button>
                            <div className={styles.faqAnswer} data-open={open}>
                              <p>{t(answer)}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  <div className={styles.relatedBlock}>
                    <span className={styles.kicker}>{t("MORE TO READ")}</span>
                    <div className={styles.relatedGrid}>
                      {related.map((item) => (
                        <Link key={item.slug} href={localizeHref(`/blogs/${item.slug}`)} className={styles.relatedCard}>
                          <strong>{t(item.category)}</strong>
                          <span>{t(item.title)}</span>
                          <em>
                            {t("Read article")} <ArrowUpRight size={14} />
                          </em>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        <SiteFooter />
      </main>
    </>
  );
}

