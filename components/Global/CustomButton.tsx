
import styles from './style.module.scss';
import {NestedReactComponent} from '@/Interface/interface'

interface CustomButtonProps extends NestedReactComponent {
    onClick?: ()=>void;
}


export function CustomButton({children, onClick}:CustomButtonProps) {
    return(
        <button className = {styles.button} onClick={onClick}>
            {children}
        </button>
    )
}


export function SignButton({children, onClick}: CustomButtonProps) {
    return(
        <button className = {styles.register_bt} onClick={onClick}>
            {children}
        </button>
    )
}