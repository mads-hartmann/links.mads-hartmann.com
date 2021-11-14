import Styles from '../styles/LinkList.module.css'

export default function LinkList(props) {
    const { links } = props;
    return (
        <ul className={Styles.list}>
            {links.map(link => (
                <li key={link.id} className={Styles.link}>
                    <a href={`/links/${link.id}`}>
                        {link.title}
                    </a>
                    <ul className={Styles.metadata}>
                        <li>Added on: {link.addedOn}</li>
                        {link.readOn ? <li>Read on: {link.readOn}</li> : null}
                    </ul>
                </li>
            ))}
        </ul>
    )
}
