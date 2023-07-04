import style from './NavbarLinks.module.scss';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react'
import { SignButton } from '@/components/Global/CustomButton';


export default function NavbarLinks() {

    const router = useRouter();
    const {data: session, status} = useSession();

    const handleSignout = () => {
        signOut({callbackUrl: '/', redirect: true})
        console.log('logout')
    }

    return(
            <ul className={style.navbar_links}>
                
                {status === 'unauthenticated'|| status === 'loading' ? 
                <>
                <li>
                    <input type="radio"  id="signin" name="nav" onChange={()=>router.push("/signin")}/>
                    <label htmlFor="signin" className={style.ra_links} id={style.login}>로그인</label>
                </li>
                <li>
                    <input type="radio" id="signup" name="nav" onChange= {()=>router.push("/signup")}/>
                    <label htmlFor="signup" className={style.ra_links}>회원가입</label>
                </li>
                </>
                :
                <>    
                
                    <SignButton onClick={handleSignout}>로그아웃</SignButton>
                
                </>
                 }
                
            </ul>
    )
}