import { fetchLinks, fetchLink } from "../../lib/links";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
    const links = await fetchLinks()
    const paths = links.map((link) => ({
        params: { id: link.id }
    }))
    return {
        paths: paths,
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const link = await fetchLink(context.params.id)
    return {
        props: {
            link: link,
        }
    }
}

export default function Home({ link }) {
    return (
        <>
            <h1>{link.title}</h1>
            <ul>
                {link.topics.map(topic => (
                    <li key={topic}>{topic}</li>
                ))}
            </ul>
        </>
    )
}
