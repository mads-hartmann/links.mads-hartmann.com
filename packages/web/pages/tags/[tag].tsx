import { LinksDB } from '@links/lib/links-db'
import { GetStaticProps, GetStaticPaths } from 'next'
import path from 'path'

export const getStaticPaths: GetStaticPaths = async () => {
    const db = new LinksDB({
        dbPath: path.join(
            process.cwd(),
            'public',
            'data',
            'links.db'
        )
    });
    const tags = await db.getTags()
    const paths = tags.map((tag) => ({
        params: { tag: tag }
    }))
    return {
        paths: paths,
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const tag: string = context.params.tag as string
    const db = new LinksDB({
        dbPath: path.join(
            process.cwd(),
            'public',
            'data',
            'links.db'
        )
    });
    const links = await db.getLinksWithTag(tag)
    return {
        props: {
            tag: tag,
            links: links
        }
    }
}

export default function TagPage({ tag, links }) {
    return (
        <>
            <h1>{tag}</h1>
            <ul>
                {links.map(link => (
                    <li key={link.id}>
                        <a href={`/links/${link.id}`}>
                            {link.title}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    )
}
