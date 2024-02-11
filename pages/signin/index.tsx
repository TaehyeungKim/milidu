import Link from 'next/link'
import styles from './index.module.scss'
import Layout from '@/components/SignPageRelated/Layout/Layout'
import { FloatingId, FloatingPw } from '@/components/SignPageRelated/FloatingInp/FloatingInp'
import { CustomButton, SignButton } from '@/components/Global/CustomButton'
import { useRef, useContext, useEffect, useReducer } from 'react'
import { handleSubmit } from '@/utils/HandleUser'
import LoadingBlocking from '@/components/Global/LoadinBlocking/LoadingBlocking'


import { useRouter } from 'next/router'

import { UserContext } from '../_app'

type SignInAction = {
    type: string,
    message?: string
}

type SignInState = {
    state: string,
    message?: string
}
const signInReducer = (state: SignInState, action: SignInAction) => {
    switch(action.type) {
        default:
            return {...state}
        case "fail":
            return {state: "fail", message: action.message}
        case "loading":
            return {state: "loading"}
    }
}


export default function Signin() {


    const idRef = useRef<HTMLInputElement>(null);
    const pwRef = useRef<HTMLInputElement>(null);
    const submitBtRef = useRef<HTMLButtonElement>(null);

    const router = useRouter()


    const userContext = useContext(UserContext)

    const [state, dispatch] = useReducer(signInReducer, {state: "plain"})


    useEffect(()=>{
        const keyboardSubmit = (e:KeyboardEvent)=>{
            if(e.key === 'Enter') submitBtRef.current?.click()
        }
        window.addEventListener('keydown', keyboardSubmit)
        return(()=>{
            window.removeEventListener('keydown', keyboardSubmit)
        })
    },[])
    


    return(
        <Layout>
            {state.state === "loading" ? <LoadingBlocking/> : null}
            <FloatingId ref={idRef}/>
            <FloatingPw ref={pwRef}/>
            <footer className={styles.register}>
                <CustomButton ref={submitBtRef} onClick={()=>{
                    dispatch({type: "loading"})
                    handleSubmit(idRef.current?.value as string, pwRef.current?.value as string, userContext, ()=>{
                        router.push('/')
                    }, ()=>dispatch({type: "fail", message: "로그인이 실패하셨습니다."}))
                    }}>로그인</CustomButton>
                <Link href={'/signup'}>
                    <SignButton>회원가입하기</SignButton>
                </Link>
            </footer>
            <div className = {styles.failMsg}>{state.state === "fail" ? state.message : null}</div>
            
        </Layout>
    )
}