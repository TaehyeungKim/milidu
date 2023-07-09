import Link from 'next/link'
import styles from './index.module.scss'
import Layout from '@/components/SignPageRelated/Layout/Layout'
import { FloatingId, FloatingPw } from '@/components/SignPageRelated/FloatingInp/FloatingInp'
import { CustomButton, SignButton } from '@/components/Global/CustomButton'
import { useRef, useState } from 'react'


import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'


export default function Signin() {

    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null)

    const router = useRouter()

    const [isLoginFail, setLoginFail] = useState<boolean>(false)


    const handleSubmit = async() => {
        const res = await signIn('credentials', {
            username: idRef.current?.value,
            password: pwRef.current?.value,
            redirect: false,
            callbackUrl: "/"
        })
        if(res?.ok) return router.push(res.url as string)
        return setLoginFail(true)

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
            <div className = {styles.failMsg}>{isLoginFail ? "로그인이 실패하였습니다." : null}</div>
            
        </Layout>
    )
}