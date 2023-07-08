import { Dispatch, useCallback } from 'react';
import styles from './CertAside.module.scss';
import { CertDetailPageAction, CertDetailPageState } from '@/pages/certification/[id]';

interface CertAsideProps {
    dispatch: Dispatch<CertDetailPageAction>
    state: CertDetailPageState
}

export default function CertAside({dispatch, state}:CertAsideProps) {


    const pageModeChangeFunc = (e: any) => {
        e.stopPropagation()
        const target = e.currentTarget as HTMLInputElement
        if(target.checked) dispatch({to: target.id})
    }

    const memoizedFunc = useCallback(pageModeChangeFunc, [])

    return(
        <aside className={styles.aside}>
            <input type="radio" name="asideSelect" id="info" hidden onChange={memoizedFunc} defaultChecked/>
            <label className={styles.aside_select} htmlFor='info'>자격증 정보</label>
            <input type="radio" name="asideSelect" id="review" hidden onChange={memoizedFunc}/>
            <label className={styles.aside_select} htmlFor='review'>합격후기</label>
            <input type="radio" name="asideSelect" id="write" hidden onChange={memoizedFunc}/>
            <label className={styles.aside_select} htmlFor='write'>합격후기 쓰기</label>
        </aside>
    )
}