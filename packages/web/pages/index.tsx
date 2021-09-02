import path from 'path'
import { LinksDB } from '@links/lib/links-db'
import Link from 'next/link'

export async function getStaticProps() {
    const db = new LinksDB({
        dbPath: path.join(
            process.cwd(),
            'public',
            'data',
            'links.db'
        )
    });
    const tags = await db.getTags()
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
            <p>There are currently {count} tags in use.</p>
            {groupedByLetter.map((tuple) => {
                const [letter, tags] = tuple
                return (
                    <div key={letter}>
                        <h2>{letter}</h2>
                        <ul>
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
        </>
    )
}
