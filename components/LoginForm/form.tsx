// 'use client'


// import { FloatingId, FloatingPw } from '@/components/SignPageRelated/FloatingInp/FloatingInp'
// import { CustomButton, SignButton } from '@/components/Global/CustomButton'
// //@ts-ignore
// import {useFormState, useFormStatus} from 'react-dom'
// import { authenticate } from '@/lib/action'
// import LoadingBlocking from '@/components/Global/LoadinBlocking/LoadingBlocking'
// import Link from 'next/link'
// import { useRef } from 'react'
// // import styles from './index.module.scss'

// interface LoginFormProps {

// }


// export default function LoginForm() {
//     const [loginState, loginAction] = useFormState(authenticate, undefined)
//     const idRef = useRef<HTMLInputElement>(null);
//     const pwRef = useRef<HTMLInputElement>(null);
//     const submitBtRef = useRef<HTMLButtonElement>(null);

//     return(
//         <form action={loginAction}>
//         {/* {state.state === "loading" ? <LoadingBlocking/> : null} */}
//         <FloatingId ref={idRef}/>
//         <FloatingPw ref={pwRef}/>
//         <footer>
//             <CustomButton ref={submitBtRef} onClick={()=>{
//                 // dispatch({type: "loading"})
//                 // handleSubmit(idRef.current?.value as string, pwRef.current?.value as string, userContext, ()=>{
//                 //     router.push('/')
//                 // }, ()=>dispatch({type: "fail", message: "로그인이 실패하셨습니다."}))
//                 // authenticate(idRef.current?.value as string, pwRef.current?.value as string)
//                 }}>로그인</CustomButton>
//             <Link href={'/signup'}>
//                 <SignButton>회원가입하기</SignButton>
//             </Link>
//         </footer>
//         {/* <div className = {styles.failMsg}>{state.state === "fail" ? state.message : null}</div> */}
//         </form>
//     )
   
// }