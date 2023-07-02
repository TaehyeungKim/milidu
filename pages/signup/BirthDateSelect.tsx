import {ReactElement, ReactNode, useEffect, useState} from 'react'
import styles from './BirthDateSelect.module.scss'

interface BirthDateSelectProps {
    curSelect: number,
    children: ReactNode,
    label: string
}

export default function BirthDateSelect({curSelect, children, label}:BirthDateSelectProps) {

    const [visible, setVisible]  = useState<boolean>(false);

    const toggle = () => setVisible(!visible)


    return(
        <div className = {styles.birth_select} onClick={toggle}>
            <div className = {styles.container}>
                    <span>{curSelect}</span>
                    <div className = {styles.listContainer} style={!visible ? {display: 'none'}:undefined}>
                        {children}
                    </div> 
            </div>
            <label className = {styles.birthdate}>{label}</label>
            
        </div>
    )
}