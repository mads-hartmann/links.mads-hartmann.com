import { getTags } from '../../lib/links-sqlite'

export async function getStaticProps() {
    return {
        props: {
            tags: await getTags()
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
