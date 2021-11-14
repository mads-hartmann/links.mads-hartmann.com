import path from 'path'
import { LinksDB } from '@links/lib/links-db'
import Link from 'next/link'
import SharedStyles from '../../styles/Shared.module.css'
import LinkList from '../../components/LinkList';

export async function getStaticProps() {
  const db = new LinksDB({
    dbPath: path.join(
      process.cwd(),
      'public',
      'data',
      'links.db'
    )
  });
  const links = await db.getLinks()
  const read = links.filter((link) => link.readOn)
  const inbox = links.filter((link) => !link.readOn)
  return {
    props: {
      statistics: {
        total: links.length,
        read: read.length,
        inbox: inbox.length
      },
      read: read,
      inbox: inbox
    }
  }
}

export default function Home(props) {
  const { statistics, read, inbox } = props;
  return (
    <>
      <h1>Links</h1>
      <p className={SharedStyles.statistics}>There are {statistics.total} links in the db. {statistics.read} are read. {statistics.inbox} are in the inbox</p>
      <h2>Read</h2>
      <LinkList links={read} />
      <h2>Inbox</h2>
      <LinkList links={inbox} />
    </>
  )
}
