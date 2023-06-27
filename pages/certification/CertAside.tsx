import { Dispatch, useCallback } from 'react';
import styles from './CertAside.module.scss';
import { CertDetailPageAction } from './[id]';

interface CertAsideProps {
    dispatch: Dispatch<CertDetailPageAction>
}

export default function CertAside({dispatch}:CertAsideProps) {


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
        </aside>
    )
}