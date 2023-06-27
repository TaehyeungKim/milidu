import styles from './Header.module.scss'
import style from './style.module.scss'
import { favicion } from '@/public/icons/icons'

export default function Header() {
    return(
        <header className={styles.header}>
            <nav className={style.navbar}>
                <div className={style.navbar_logo}>
                    {favicion()}
                    <img src="/milidu_logo.png" id = {style.logo_image}/>
                </div>

            <ul className={style.navbar_menu}>
                <li>
                    <input type="radio" id ="ra_1" name="nav" />
                    <label htmlFor="ra_1" className={style.ra_all} >자격증</label>
                </li>
                <li>
                    <input type="radio" id ="ra_2" name="nav" />
                    <label htmlFor="ra_2" className={style.ra_all} >대학 군 수강</label>
                </li>
                <li>
                    <input type="radio" id ="ra_3" name="nav" />
                    <label htmlFor="ra_3" className={style.ra_all} >멘토·멘티</label> 
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