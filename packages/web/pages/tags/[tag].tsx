import { LinksDB } from '@links/lib/links-db'
import { GetStaticProps, GetStaticPaths } from 'next'
import path from 'path'
import SharedStyles from '../../styles/Shared.module.css'
import LinkList from '../../components/LinkList';

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
