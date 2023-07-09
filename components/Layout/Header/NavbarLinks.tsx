import style from './NavbarLinks.module.scss';
import { useRouter } from 'next/router';

import { SignButton } from '@/components/Global/CustomButton';
import { useContext } from 'react';
import { UserContext } from '@/pages/_app';
// import { User } from '@/Interface/interface'


export default function NavbarLinks() {

    const router = useRouter();

    const userContext = useContext(UserContext)

    const handleSignout = () => {
        // signOut({callbackUrl: '/', redirect: true})
        userContext?.dispatch(null)
        
    }



    return(
            <ul className={style.navbar_links}>
                
                {!userContext?.user ? 
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
                    {userContext?.user.name}
                
                </>
                 }
                
            </ul>
    )
}