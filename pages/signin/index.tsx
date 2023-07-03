import Link from 'next/link'
import styles from './index.module.scss'
import Layout from '@/components/SignPageRelated/Layout/Layout'
import { FloatingId, FloatingPw } from '@/components/SignPageRelated/FloatingInp/FloatingInp'
import SignButton from '@/components/SignPageRelated/SignButton/SignButton'
import CustomButton from '@/components/Global/CustomButton'
import { useRef } from 'react'

import { signIn } from 'next-auth/react'


export default function Signin() {

    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async() => {
        await signIn('credentials', {
            username: idRef.current?.value,
            password: idRef.current?.value,
            redirect: true
        })
    }



    return(
        <Layout>
            <FloatingId ref={idRef}/>
            <FloatingPw ref={pwRef}/>
            <footer className={styles.register}>
                <CustomButton onClick={handleSubmit}>로그인</CustomButton>
                <Link href={'/signup'}>
                    <SignButton>회원가입하기</SignButton>
                </Link>
            </footer>
        </Layout>
    )
}