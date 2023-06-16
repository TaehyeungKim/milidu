import { ReactNode } from "react" 
import styles from './Main.module.scss'

interface LayoutMainProps {
    children: ReactNode
}

export default function Main({children}:LayoutMainProps) {
    return(
        <main className={styles.main}>
            {children}
        </main>
    )
}