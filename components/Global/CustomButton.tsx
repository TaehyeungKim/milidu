
import styles from './style.module.scss';
import {NestedReactComponent} from '@/Interface/interface'

interface CustomButtonProps extends NestedReactComponent {
    onClick?: ()=>void;
}


export default function CustomButton({children, onClick}:CustomButtonProps) {
    return(
        <button className = {styles.button} onClick={onClick}>
            {children}
        </button>
    )
}