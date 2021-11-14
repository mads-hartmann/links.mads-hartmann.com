import path from 'path'
import { LinksDB } from '@links/lib/links-db'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'

export const getStaticPaths: GetStaticPaths = async () => {
    const db = new LinksDB({
        dbPath: path.join(
            process.cwd(),
            'public',
            'data',
            'links.db'
        )
    });
    const links = await db.getLinks()
    const paths = links.map((link) => ({
        params: { id: link.id }
    }))
    return {
        paths: paths,
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const id: string = context.params.id as string
    const db = new LinksDB({
        dbPath: path.join(
            process.cwd(),
            'public',
            'data',
            'links.db'
        )
    });
    const link = await db.getLink(id)
    return {
        props: {
            link: link,
        }
    }
}

export default function LinkPage({ link }) {
    return (
        <>
            <h1>Title: {link.title}</h1>
            <ul>
                {link.topics.map(topic => (
                    <li key={topic}>
                        <Link href={`/tags/${topic}`}>
                            {topic}
                        </Link>
                    </li>
                ))}
            </ul>
            <p>Visit the link: <a href={link.url} target="_blank" rel="noreferrer">{link.url}</a></p>
        </>
    )
}
