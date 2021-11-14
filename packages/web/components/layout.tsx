import Styles from '../styles/Layout.module.css'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className={Styles.container}>
      <header>
        <nav>
          <ul className={Styles.navList}>
            <li className={Styles.navItem}><Link href={'/links'}>Links</Link></li>
            <li className={Styles.navItem}><Link href={'/'}>Tags</Link></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}
