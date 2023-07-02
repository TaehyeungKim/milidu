import {ReactNode} from 'react'
import styles from './Layout.module.scss'
import SignInUpHeader from '@/components/SignPageRelated/SignInUpHeader/SignInUpHeader'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({children}: LayoutProps) {
    return(
        <div className = {styles.layout}>
            <section className = {styles.container}>
                <SignInUpHeader/>
                {children}
            </section>

        </div>
    )
}