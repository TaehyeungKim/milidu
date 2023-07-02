import styles from './SignButton.module.scss';
import {NestedReactComponent} from '@/Interface/interface'

export default function SignButton({children}: NestedReactComponent) {
    return(
        <button className = {styles.register_bt}>
            {children}
        </button>
    )
}