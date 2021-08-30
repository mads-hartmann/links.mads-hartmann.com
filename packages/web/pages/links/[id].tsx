import { LinksDB } from '@links/lib/links-db'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'

export const getStaticPaths: GetStaticPaths = async () => {
    const links = await LinksDB.fromGitRepository().getLinks()
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
    const link = await LinksDB.fromGitRepository().getLink(id)
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
        </>
    )
}
