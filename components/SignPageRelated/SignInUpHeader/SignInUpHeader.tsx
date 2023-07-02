import Link from "next/link"
import styles from './SignInUpHeader.module.scss'
import { favicion } from "@/public/icons/icons"


export default function SignInUpHeader() {
    return(
        <header className = {styles.signin_header}>
            <Link className = {styles.header_link} href='/'>
                    <div className = {styles.favicon}>
                        {favicion()}
                    </div>
                <img src='/milidu_logo.png'/>
            </Link>
            </header>
    )
}