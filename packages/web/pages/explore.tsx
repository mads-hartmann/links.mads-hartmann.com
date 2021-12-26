
import { useState } from 'react'
import styles from '../styles/Explore.module.css'
import Link from 'next/link'
import { LinksNotion, Link as LinkType } from '@links/lib/links-notion'

export async function getStaticProps() {
    const notion = new LinksNotion
    return {
        props: {
            tags: await notion.getTags(),
            links: await notion.getLinks()
        }
    }
}

export default function Home({ tags, links }) {
    const [selectedTags, setSelectedTags] = useState([])
    const filteredLinks = links.filter((link: LinkType) => selectedTags.every(t => link.topics.includes(t)))
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Explore</h1>
            </header>
            <main className={styles.main}>
                {!selectedTags.length ? (
                    <p>No tags selected. Select tags to show links</p>
                ) : (
                    <>
                        <p>Showing links that have all of the following tags: {selectedTags.join(',')}</p>
                        <button onClick={() => setSelectedTags([])}>Clear tags</button>
                        <ul>
                            {filteredLinks.map(link => (
                                <li key={link.id}>
                                    <Link href={`/links/${link.id}`}>
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

            </main>
            <aside className={styles.sidebar}>
                <ul className={styles.tags}>
                    {tags.map((tag: string) => {
                        const isSelected = selectedTags.includes(tag)
                        const linksWithTag = filteredLinks.filter((l) => l.topics.includes(tag)).length
                        const classes = [styles.tag, isSelected ? styles.selected : null]
                        if (!linksWithTag) {
                            return null
                        }
                        return (
                            <li
                                key={tag}
                                className={classes.join(' ')}
                                onClick={() => isSelected ?
                                    setSelectedTags(selectedTags.filter((t) => t !== tag)) :
                                    setSelectedTags([...selectedTags, tag])}
                            >
                                {tag} | {linksWithTag}
                            </li>
                        )
                    })}
                </ul>
            </aside>
            <footer className={styles.footer}>Total of {tags.length} tags and {links.length} links</footer>
        </div >
    )
}

Home.getLayout = function getLayout(page) {
    // Disable the default layout - this page is a prototype and doesn't
    // use the existing layout.
    return (
        <>
            {page}
        </>
    )
}
