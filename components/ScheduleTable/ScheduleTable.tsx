import styles from './ScheduleTable.module.scss'
import {useContext} from 'react'
import { ScheduleContext } from '@/pages/certification/[id]'


const yieldDataWithString = (str: string) => `${str.slice(0,4)}.${str.slice(4,6)}.${str.slice(6,8)}`



export default function ScheduleTable() {
    
    const schedule = useContext(ScheduleContext)


    if(!schedule||schedule.length === 0) return (<></>)

    return(
        <table className = {styles.table}>
            <thead>
                <tr>
                <th className={styles.table_head}>회차</th>
                <th className={styles.table_head}>필기원서접수</th>
                <th className={styles.table_head}>필기시험</th>
                <th className={styles.table_head}>실기원서접수</th>
                <th className={styles.table_head}>실기시험</th>
                <th className={styles.table_head}>최종합격발표</th>
                    {/* {Object.keys(data).map((key: string, index: number)=><th key={index} className={styles.table_head}>{key}</th>)} */}
                </tr>
            </thead>
            <tbody>
            {/* {schedule?.map((data: CertTestSchedule, index:number)=>(
                
            ))} */}
                <tr className = {styles.table_data}>
                    <td>{schedule[0].회차}</td>
                    <td>{yieldDataWithString(schedule[0].필기원서접수시작)}~{yieldDataWithString(schedule[0].필기원서접수종료)}</td>
                    <td>{yieldDataWithString(schedule[0].필기종료)}</td>
                    <td>{yieldDataWithString(schedule[0].실기원서접수시작)}~{yieldDataWithString(schedule[0].실기원서접수종료)}</td>
                    <td>{yieldDataWithString(schedule[0].실기종료)}</td>
                    <td>{yieldDataWithString(schedule[0].합격발표시작)}~{yieldDataWithString(schedule[0].합격발표종료)}</td>
                </tr>
            </tbody>
        </table>
    )
}