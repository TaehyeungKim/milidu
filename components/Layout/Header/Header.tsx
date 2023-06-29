import Link from 'next/link'
import styles from './Header.module.scss'
import style from './style.module.scss'
import { favicion } from '@/public/icons/icons'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Header() {

    const router = useRouter()

    useEffect(()=>{
        const path = router.pathname.split('/')
        document.getElementById(path[1])?.setAttribute('checked', 'true')
    },[router.pathname])

    return(
        <header className={styles.header}>
            <nav className={style.navbar}>
                <div className={style.navbar_logo}>
                    {favicion()}
                    <img src="/milidu_logo.png" id = {style.logo_image}/>
                </div>

            <ul className={style.navbar_menu}>
                <li>
                    
                    <input type="radio" id ="certification" name="nav" onChange={()=>router.push("/certification")}/>
                    <label htmlFor="certification" className={style.ra_all} >자격증</label>    
                    
                </li>
                <li>
                    
                    <input type="radio" id ="university" name="nav" onChange={()=>router.push("/university")}/>
                    <label htmlFor="university" className={style.ra_all} >대학 군 수강</label>
                    
                </li>
            </ul>

            <ul className={style.navbar_links}>
                <li>
                    <input type="radio"  id="ra_4" name="nav" />
                    <label htmlFor="ra_4" className={style.ra_links} id={style.login}>로그인</label>
                </li>
                <li>
                    <input type="radio" id="ra_5" name="nav" />
                    <label htmlFor="ra_5" className={style.ra_links}>회원가입</label>
                </li>
            </ul>
            </nav>
        </header>
    )
}