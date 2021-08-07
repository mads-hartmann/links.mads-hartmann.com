import { fetchLinks, fetchLink } from "../../lib/links";

export async function getStaticPaths() {
    const links = await fetchLinks()
    const paths = links.map((link) => ({
        params: { id: link.id }
    }))
    return {
        paths: paths,
        fallback: false
    };
}

export async function getStaticProps(context) {
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
                    <li>{topic}</li>
                ))}
            </ul>
        </>
    )
}
