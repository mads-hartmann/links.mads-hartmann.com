import { LinksNotion } from '@links/lib/links-notion'
import Link from 'next/link'
import Styles from '../styles/Tags.module.css'
import SharedStyles from '../styles/Shared.module.css'

export async function getStaticProps() {
    const notion = new LinksNotion()
    const tags = await notion.getTags()
    const grouped = tags.reduce((grouped, tag) => {
        const letter = tag[0].toUpperCase()
        const tags = grouped[letter] || []
        tags.push(tag)
        grouped[letter] = tags
        return grouped
    }, {})
    return {
        props: {
            groupedByLetter: Object.entries(grouped).sort(),
            count: tags.length
        }
    }
}

export default function Home({ groupedByLetter, count }) {
    return (
        <>
            <h1>Tags</h1>
            <p className={SharedStyles.statistics}>There are currently {count} tags in use.</p>
            <div className={Styles.container}>
                {groupedByLetter.map((tuple) => {
                    const [letter, tags] = tuple
                    return (
                        <div className={Styles.tagContainer} key={letter}>
                            <h2>{letter}</h2>
                            <ul className={Styles.list}>
                                {tags.map((tag: string) => (
                                    <li key={tag}>
                                        <Link href={`/tags/${tag}`}>
                                            {tag}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
