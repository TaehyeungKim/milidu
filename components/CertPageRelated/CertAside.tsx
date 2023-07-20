import { Dispatch, useCallback, useContext, useEffect, useState } from 'react';

import styles from './CertAside.module.scss';
import { CertDetailPageAction, CertDetailPageState } from '@/pages/certification/[id]';
import {UserContext} from '@/pages/_app'
import {ComponentPortal} from '@/utils/ComponentPortal'
import {Unauthorized} from './Unauthorized';

interface CertAsideProps {
    dispatch: Dispatch<CertDetailPageAction>
    state: CertDetailPageState
}

export default function CertAside({dispatch, state}:CertAsideProps) {

    const userContext = useContext(UserContext)

    const [unauthorizedAlert, setUnauthroizedAlert] = useState<boolean>(false);
    
    const alertOn = () => setUnauthroizedAlert(true);
    const alertOff = () => setUnauthroizedAlert(false)

    

    const pageModeChangeFunc = (e: any) => {
        e.stopPropagation()
        const target = e.currentTarget as HTMLInputElement
        if(target.checked) dispatch({to: target.id})
    }

    const memoizedFunc = useCallback(pageModeChangeFunc, [])

    useEffect(()=>{
        const mark = document.getElementById(state.page) as HTMLInputElement;
        mark.checked = true;
        return(()=>{mark.checked = false})
    },[state.page])


    return(
        
        <aside className={styles.aside}>
            <input type="radio" name="asideSelect" id="info" hidden onChange={memoizedFunc} defaultChecked/>
            <label className={styles.aside_select} htmlFor='info'>자격증 정보</label>
            <input type="radio" name="asideSelect" id="review" hidden onChange={memoizedFunc}/>
            <label className={styles.aside_select} htmlFor='review'>합격후기</label>
            <input type="radio" name="asideSelect" id="write" hidden onChange={memoizedFunc}/>
            <label className={styles.aside_select} id={!userContext?.user ? styles.unauthorized : undefined}htmlFor='write' onClick={!userContext?.user ? (e)=>{e.preventDefault();alertOn()} : undefined}>합격후기 쓰기</label> 
            {unauthorizedAlert ? <ComponentPortal component={<Unauthorized toggle={alertOff}/>}/>:null}
        </aside>
        
        
    )
}