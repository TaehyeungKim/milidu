
import { useEffect, useRef, Dispatch, useCallback, forwardRef, MutableRefObject } from 'react'
import styles from './FloatingInp.module.scss'
import { RegisterAction, StatePropertyData } from '@/pages/signup'


export type RegisterInpProps = {
    dispatch: Dispatch<RegisterAction>,
    state: StatePropertyData
}

interface FloatingInpProps {
    ref: MutableRefObject<HTMLInputElement>
}

const FloatingId = forwardRef(function FloatingId(props, ref) {

    return(
        <div className = {styles.floating}>
            <input type="text" id="userId" required ref={ref as MutableRefObject<HTMLInputElement>}></input >
            <label className = {styles.floatingLb} htmlFor='userId'>아이디를 입력해주세요</label>
        </div>
    )
})

const FloatingPw = forwardRef(function FloatingPw(props, ref) {
    return(
        <div className = {styles.floating}>
            <input type="password" id="userPW" required ref={ref as MutableRefObject<HTMLInputElement>}></input>
            <label className = {styles.floatingLb} htmlFor='userPW'>비밀번호를 입력해주세요</label>
        </div>
    )
}
)


function Floating_RegisterId({dispatch, state}: RegisterInpProps) {

    const idInp = useRef<HTMLInputElement>(null)



    const checkId = useCallback(() => {
        const typedId = idInp.current?.value as string
        const regExp = /(?=.*[a-z])(?=.*[0-9])(?=.{6,})/g;
        if(!regExp.test(typedId)) return dispatch({field: "id", status: false, data: "", message: "아이디는 영문(소), 숫자 포함 6자 이상이어야 합니다."})

        dispatch({field: "id", status: true, data: typedId, message: "사용할 수 있는 아이디입니다."})

    },[])

    return(
        <section>
        <label htmlFor='reg_userId'>아이디</label>
        <div className = {styles.floating}>    
            <input type="text" id="reg_userId" required ref={idInp}></input>
            <label className = {styles.floatingLb} htmlFor='reg_userId'>ID</label>
        </div>
        <div className = {styles.verify}>
            <button className = {styles.verifyBt} onClick={checkId}>중복확인</button>
            <span className = {styles.verifyRes + ` ${!state.state ? styles.fail : styles.succeed}`}>
                {state.message}
            </span>
        </div>
        </section>
    )
}

function Floating_RegisterPw({dispatch, state}: RegisterInpProps) {

    const pwInp = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        pwInp.current?.addEventListener('input',(e)=>{
            const target = e.target as HTMLInputElement;
            
            const regExp = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.{8,})/g
           
            if(regExp.test(target.value))dispatch({field: "pw", status: true, data: target.value, message: "사용 가능한 비밀번호입니다." })
            else dispatch({field: 'pw', status: false, data: "", message: "비밀번호는 영문(소,대), 숫자, 특수문자 포함 8자 이상이어야 합니다."});
            

        })
   },[])

    return(
        <section>
        <label htmlFor='reg_userId'>비밀번호</label>
        <div className = {styles.floating}>    
            <input type="password" id="reg_userPw" required ref={pwInp}></input>
            <label className = {styles.floatingLb} htmlFor='reg_userPw'>Password</label>
        </div>
        <div className = {styles.verify}>
            <span className={styles.verifyRes + ` ${!state.state ? styles.fail : styles.succeed}`}>{state.message}</span>
        </div>
        </section>
    )
}

type FloatingTextInpProps = {
    label: string,
    floatingLabel: string
}

const Floating_RegisterTextInput = forwardRef(function Floating_RegisterMajor(props:FloatingTextInpProps, ref) {

    const {label, floatingLabel} = props

    return(
        <section>
        <label htmlFor='reg_userMj'>{label}</label>
        <div className = {styles.floating}>    
            <input type="text" id={`reg_user${label}`} required ref={ref as MutableRefObject<HTMLInputElement>}></input>
            <label className = {styles.floatingLb} htmlFor={`reg_user${label}`}>{floatingLabel}</label>
        </div>
        </section>
    )
})



export {FloatingId, FloatingPw, Floating_RegisterId, Floating_RegisterPw, Floating_RegisterTextInput}