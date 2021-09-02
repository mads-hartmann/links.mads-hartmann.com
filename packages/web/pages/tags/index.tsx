import path from 'path'
import { LinksDB } from '@links/lib/links-db'

export async function getStaticProps() {
    const db = new LinksDB({
        dbPath: path.join(
            process.cwd(),
            'public',
            'data',
            'links.db'
        )
    });
    return {
        props: {
            tags: await db.getTags()
        }
    }
}

export default function Home({ tags }) {
    return (
        <div>
            <ul>
                {tags.map(tag => (
                    <li key={tag}>
                        <a href={`/tags/${tag}`}>
                            {tag}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
