import { LinksDB } from '@links/lib/links-db'

export async function getStaticProps() {
    return {
        props: {
            tags: await LinksDB.fromGitRepository().getTags()
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
