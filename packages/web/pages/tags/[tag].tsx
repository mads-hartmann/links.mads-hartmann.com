import { LinksNotion } from '@links/lib/links-notion'
import { GetStaticProps, GetStaticPaths } from 'next'
import SharedStyles from '../../styles/Shared.module.css'
import LinkList from '../../components/LinkList';

export const getStaticPaths: GetStaticPaths = async () => {
    const notion = new LinksNotion()
    const tags = await notion.getTags()
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
    const notion = new LinksNotion()
    const links = await notion.getLinksWithTag(tag)
    const read = links.filter((link) => link.readOn)
    const inbox = links.filter((link) => !link.readOn)
    return {
        props: {
            tag: tag,
            count: links.length,
            read: read,
            inbox: inbox
        }
    }
}

export default function TagPage(props) {
    const { tag, count, read, inbox } = props;
    return (
        <>
            <h1>{tag}</h1>
            <p className={SharedStyles.statistics}>{count} links are tagged with {tag}</p>
            <h2>Read</h2>
            <LinkList links={read} />
            <h2>Inbox</h2>
            <LinkList links={inbox} />
        </>
    )
}
