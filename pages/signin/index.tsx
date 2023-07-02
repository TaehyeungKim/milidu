import Link from 'next/link'
import styles from './index.module.scss'
import Layout from '@/components/SignPageRelated/Layout/Layout'
import { FloatingId, FloatingPw } from '@/components/SignPageRelated/FloatingInp/FloatingInp'
import SignButton from '@/components/SignPageRelated/SignButton/SignButton'


export default function Signin() {
    return(
        <Layout>
            <FloatingId/>
            <FloatingPw/>
            <footer className={styles.register}>
                <Link href={'/signup'}>
                    <SignButton>회원가입하기</SignButton>
                </Link>
            </footer>
        </Layout>
    )
}