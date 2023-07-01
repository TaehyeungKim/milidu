import Link from 'next/link'
import styles from './index.module.scss'
import Layout from '@/components/SignPageRelated/Layout/Layout'
import { FloatingId, FloatingPw } from '@/components/SignPageRelated/FloatingInp/FloatingInp'


export default function Signin() {
    return(
        <Layout>
            <FloatingId/>
            <FloatingPw/>
            <footer className={styles.register}>
                <Link href={'/signup'}>
                    <button className={styles.register_bt}>
                        <div>회원가입하기</div>
                    </button>
                </Link>
            </footer>
        </Layout>
    )
}