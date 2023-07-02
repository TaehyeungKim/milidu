import {ReactNode, useState} from 'react'
import styles from './BirthDateSelect.module.scss'

interface BirthDateSelectProps {
    curSelect: number,
    children: ReactNode
}

export default function BirthDateSelect({curSelect, children}:BirthDateSelectProps) {

    const [visible, setVisible]  = useState<boolean>(false);

    const toggle = () => setVisible(!visible)

    return(
        <div className = {styles.birth_select} onClick={toggle}>
            <div className = {styles.curSelect}>
                <span>{curSelect}</span>
            </div>
            <div className = {styles.listContainer} style={!visible ? {display: 'none'}:undefined}>
                {children}
            </div>    
            </div>
    )
}