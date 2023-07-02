
import styles from './style.module.scss';
import {NestedReactComponent} from '@/Interface/interface'


export default function CustomButton({children}:NestedReactComponent) {
    return(
        <button className = {styles.button}>
            {children}
        </button>
    )
}