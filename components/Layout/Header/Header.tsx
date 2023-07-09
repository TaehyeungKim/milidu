import Link from 'next/link'
import styles from './Header.module.scss'
import style from './style.module.scss'
import { favicion } from '@/public/icons/icons'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import NavbarLinks from './NavbarLinks'
import { CurRouteContext } from '@/pages/_app'


export default function Header() {

    const router = useRouter()

    // const curRoute = useContext(CurRouteContext)
    

    useEffect(()=>{
        const path = router.pathname
        console.log(path)
        const blank = document.getElementById('blank') as HTMLInputElement;
        
        if(path === '/') {
            blank.checked = true;
            return ;
        }
        const navForPath = document.getElementById(`${path.split('/')[1]}`) as HTMLInputElement
        navForPath.checked = true;
    },[router])

    return(
        <header className={styles.header}>
            <nav className={style.navbar}>
                <Link href='/'>
                <div className={style.navbar_logo}>
                    {favicion()}
                    <img src="/milidu_logo.png" id = {style.logo_image}/>
                </div>
                </Link>
                

            <ul className={style.navbar_menu}>
                <li>
                    
                    <input type="radio" id ="certification" name="nav" onClick={()=>router.push("/certification")}/>
                    <label htmlFor="certification" className={style.ra_all} >자격증</label>    
                    
                </li>
                <li>
                    
                    <input type="radio" id ="university" name="nav" onClick={()=>router.push("/university")}/>
                    <label htmlFor="university" className={style.ra_all} >대학 군 수강</label>
                    
                </li>
                <input type="radio" id="blank" hidden name="nav"/>
            </ul>
            <NavbarLinks/>

            
            </nav>
        </header>
    )
}