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

type Props = { post: BlogPost };

export default function BlogPostPage({ post }: Props) {
  useScrollReveal();
  const [activeId, setActiveId] = useState("overview");
  const [openFaq, setOpenFaq] = useState(0);
  const related = blogs.filter((item) => item.slug !== post.slug).slice(0, 2);

  const toc = [
    { id: "overview", label: "Overview" },
    ...post.sections.map((section) => ({ id: section.id, label: section.heading })),
    { id: "takeaway", label: "Key takeaway" },
    { id: "faqs", label: "FAQs" },
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
                <Link href="/blogs" className={styles.backLink}>
                  <ArrowLeft size={15} strokeWidth={1.8} />
                  All blogs
                </Link>
                <div className={styles.metaRow}>
                  <strong>{post.category.toUpperCase()}</strong>
                  <span>{post.dateLabel}</span>
                  <span>{post.readTime}</span>
                </div>
                <h1>{post.title}</h1>
                <p className={styles.postLead}>{post.excerpt}</p>
              </div>

              <div className={`${styles.postMedia} reveal reveal-delay-1`}>
                <Image
                  src={post.image}
                  alt={post.imageAlt}
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
                <nav className={`${styles.tocNav} reveal`} aria-label="Article sections">
                  <span className={styles.tocLabel}>ON THIS PAGE</span>
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
                    <span>Questions about your reports?</span>
                    <Link href="/contact">
                      Book appointment <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </nav>

                <div className={`${styles.article} reveal reveal-delay-1`}>
                  <section id="overview" className={styles.overview}>
                    <h2>Overview</h2>
                    <p>{post.intro}</p>
                  </section>

                  {post.sections.map((section) => (
                    <section key={section.id} id={section.id} className={styles.section}>
                      <h2>{section.heading}</h2>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                      ))}
                      {section.bullets ? (
                        <ul>
                          {section.bullets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}

                  <div id="takeaway" className={styles.takeaway}>
                    <span>KEY TAKEAWAY</span>
                    <p>{post.takeaway}</p>
                  </div>

                  <section id="faqs" className={styles.faqSection}>
                    <span className={styles.kicker}>FAQS</span>
                    <h2>Frequently asked questions</h2>
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
                              <span>{question}</span>
                              <ChevronDown size={18} />
                            </button>
                            <div className={styles.faqAnswer} data-open={open}>
                              <p>{answer}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  <div className={styles.relatedBlock}>
                    <span className={styles.kicker}>MORE TO READ</span>
                    <div className={styles.relatedGrid}>
                      {related.map((item) => (
                        <Link key={item.slug} href={`/blogs/${item.slug}`} className={styles.relatedCard}>
                          <strong>{item.category}</strong>
                          <span>{item.title}</span>
                          <em>
                            Read article <ArrowUpRight size={14} />
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
