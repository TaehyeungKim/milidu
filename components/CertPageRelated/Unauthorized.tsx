import {useEffect, useRef} from 'react';

import styles from './Unauthorized.module.scss'


interface UnauthorizedProps {
  toggle: ()=>void;
}

export const Unauthorized = ({toggle}:UnauthorizedProps) => {

    const TRANSITIONDUR = '2s'
    const unauthRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
      unauthRef.current?.addEventListener('animationend', ()=>{
        toggle()
      })
    },[])

    return(
        <div className={styles.unauthorized} ref={unauthRef}>
            후기 작성은 로그인 후 가능합니다.
        </div>
    )
}

