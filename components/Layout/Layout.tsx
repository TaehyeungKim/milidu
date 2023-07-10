import Header from '@/components/Layout/Header/Header'
import Main from '@/components/Layout/Main/Main'
import Footer from '@/components/Layout/Footer/Footer'
import {useRouter} from 'next/router'
import styles from './Layout.module.scss';
import { NestedReactComponent } from '@/Interface/interface'



export default function Layout({children}:NestedReactComponent) {

    

    const router = useRouter();

   

    return (
        <div className = {styles.layout} id="portal">
        {router.pathname !== '/signin' && router.pathname !== '/signup' ? <Header></Header> : null}
        
            <Main>
                {children}
            </Main>
        
        <Footer></Footer>
        </div>
        
        
    )
}