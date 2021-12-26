import { LinksNotion } from '@links/lib/links-notion'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Styles from '../../styles/Link.module.css'

export const getStaticPaths: GetStaticPaths = async () => {
    const notion = new LinksNotion();
    const links = await notion.getLinks()
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
    const notion = new LinksNotion();
    const link = await notion.getLink(id)
    return {
        props: {
            link: link,
        }
    }
}

export default function LinkPage({ link }) {
    return (
        <>
            <h1>{link.title}</h1>
            <p className={Styles.externalLink}>
                <a href={link.url} target="_blank" rel="noreferrer">{link.url}</a>
            </p>
            <ul className={Styles.tags}>
                {link.topics.map(topic => (
                    <li key={topic} className={Styles.tag}>
                        <Link href={`/tags/${topic}`}>
                            {topic}
                        </Link>
                    </li>
                ))}
            </ul>

        </>
    )
}
