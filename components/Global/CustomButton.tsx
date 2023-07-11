
import styles from './style.module.scss';
import {NestedReactComponent} from '@/Interface/interface'
import {forwardRef, MutableRefObject} from 'react'

interface CustomButtonProps extends NestedReactComponent {
    onClick?: ()=>void;
    className?: string
}


export const CustomButton = forwardRef (function CustomButton({children, onClick, className}:CustomButtonProps, ref) {
    const added = className ? className : ''
    return(
        <button className = {styles.button + ' ' + added} onClick={onClick} ref={ref as MutableRefObject<HTMLButtonElement>}>
            {children}
        </button>
    )
})



export function SignButton({children, onClick}: CustomButtonProps) {
    return(
        <button className = {styles.register_bt} onClick={onClick}>
            {children}
        </button>
    )
}