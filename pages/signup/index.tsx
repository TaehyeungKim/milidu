import Layout from "@/components/SignPageRelated/Layout/Layout"
import { useEffect, useRef, useReducer, useCallback, MouseEventHandler } from "react"
import { Floating_RegisterId, Floating_RegisterPw, Floating_RegisterTextInput } from "@/components/SignPageRelated/FloatingInp/FloatingInp"

import styles from './index.module.scss'
import { CustomButton, SignButton } from "@/components/Global/CustomButton"
import Link from 'next/link'
import BirthDateSection from "./BirthDateSection"
import GenderSection from "./GenderSection"
import axios from 'axios'
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"





export type StatePropertyData = {
    state: boolean,
    data: string,
    message: string
}

export type RegisterState = {
    id: StatePropertyData,
    pw: StatePropertyData,
    gender: StatePropertyData
}

export type RegisterAction = {
    field: string,
    status: boolean,
    data: string,
    message: string
}

const registerReducer = (state: RegisterState, action: RegisterAction):RegisterState => {
    switch(action.field) {
        case "id":
            return {
                ...state, id: {
                    state: action.status,
                    data: action.data,
                    message: action.message
                }
            }
        case "pw":
            return {
                ...state, pw:  {
                    state: action.status,
                    data: action.data,
                    message: action.message
                }
            }
        case "gender":
            return {
                ...state, gender:  {
                    state: action.status,
                    data: action.data,
                    message: action.message
                }
            }
        default:
            return {...state}
            
    }
}

const initialArg: RegisterState = {
    pw: {
        state: false,
        data: "",
        message:""
    }, 
    id: {
        state: false,
        data: "",
        message:""
    } , 
    gender: {
        state: false,
        data: "",
        message:""
    }
}

export type BirthSelectState = {
    year: number,
    month: number,
    date: number
}

export type BirthSelectAction = {
    area: string,
    selected: number
}

const dateSetReducer = (state: BirthSelectState, action: BirthSelectAction):BirthSelectState => {
    switch(action.area) {
        case "year":
            return {
                ...state,
                year: action.selected
            }
        case "month":
            return {
                ...state,
                month: action.selected
            }
        case "date":
            return {
                ...state,
                date: action.selected
            }
        default:
            return{
                ...state
            }
    }
}



export default function Signup() {

    const now = new Date();
    const router = useRouter();

    const [state, dispatch] = useReducer(registerReducer, initialArg)
    const majorRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)

    const [birthState, birthDispatch] = useReducer(dateSetReducer, {
        year: now.getFullYear(),
        month: now.getMonth()+1,
        date: now.getUTCDate()
    })

    const register = useCallback(async()=>{
        if(state.id.state && state.pw.state && state.gender.state && nameRef.current?.value !== "") {
            const res = await axios.post('/signup_register', {
                name: nameRef.current?.value as string,
                username: state.id.data,
                password:state.pw.data,
                major: majorRef.current?.value as string,
                sex: state.gender.data,
                birthdate: `${birthState.year}.${birthState.month}.${birthState.date}`
            })
            if(res.status === 200)  {
                const res = await signIn('credentials', {
                    username: nameRef.current?.value,
                    password: state.pw.data,
                    redirect: false,
                    callbackUrl: "/"
                })
                if(res?.ok) return router.push(res.url as string)
            }
            
            
        }
    },[state.id.state,state.pw.state,state.gender.state])

    return(
        
        <Layout>
            <Floating_RegisterId dispatch={dispatch} state={state.id}/>
            <Floating_RegisterPw dispatch={dispatch} state={state.pw}/>
            <Floating_RegisterTextInput label={"이름"} floatingLabel={"Name"} ref={nameRef}/>
            <Floating_RegisterTextInput label={"전공"} floatingLabel={"Major"} ref={majorRef}/>
            <GenderSection dispatch={dispatch} state={state.gender}/>
            <BirthDateSection state={birthState} dispatch={birthDispatch}/>
            <footer className = {styles.signup_footer}>
                <CustomButton onClick={register}>제출하기</CustomButton>
                <Link href='./signin'>
                    <SignButton>이미 계정이 있으신가요?</SignButton>
                </Link>
            </footer>
        </Layout>        
    )
}