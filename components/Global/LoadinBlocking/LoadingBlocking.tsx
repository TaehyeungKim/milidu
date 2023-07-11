import styles from './LoadingBlocking.module.scss'
import { NestedReactComponent } from "@/Interface/interface"

export default function LoadingBlocking({children}:NestedReactComponent) {
    return(
        <div className = {styles.blocking}>
            {children}
        </div>
    )
}