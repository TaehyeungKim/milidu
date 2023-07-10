import {useState, useEffect, useRef} from 'react';
import { createPortal } from 'react-dom';
import styles from './Unauthorized.module.scss'

interface UnauthorizedProps {
  toggle: ()=>void;
}

const Unauthroized = ({toggle}:UnauthorizedProps) => {

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

interface UnauthroizedPortalProps {
  toggle: ()=>void;
}

export default function UnauthorizedPortal({toggle}:UnauthroizedPortalProps) {
    const [isCSR, setIsCSR] = useState<boolean>(false);
  
    useEffect(() => {
      setIsCSR(true);
    }, [])
    
    if (typeof window === 'undefined') return <></>;
    if (!isCSR) return <></>;
  
    
    const portal = createPortal(<Unauthroized toggle={toggle}/>, document.getElementById('portal') as HTMLDivElement);
  
    return portal
}