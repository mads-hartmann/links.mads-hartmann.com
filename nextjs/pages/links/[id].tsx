import { getLink, getLinks } from '../../lib/links-sqlite'
import { GetStaticProps, GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
    const links = await getLinks()
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
    const link = await getLink(id)
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
                        <a href={`/tags/${topic}`}>
                            {topic}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    )
}
