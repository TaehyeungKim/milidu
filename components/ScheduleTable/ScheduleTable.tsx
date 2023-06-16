import styles from './ScheduleTable.module.scss'

type ScheduleData = {
    "구분": string,
    "필기원서접수": string,
    "필기시험": string,
    "필기합격발표": string,
    "실기원서접수": string,
    "실기시험": string,
    "최종합격발표": string
}

const data: ScheduleData = {
    "구분": "2023년 정기 기사 1회",
    "필기원서접수": "2023.01.10 ~ 2023.01.19",
    "필기시험": "2023.02.13 ~ 2023.03.15",
    "필기합격발표": "2023.03.21",
    "실기원서접수": "2023.03.28 ~ 2023.03.31",
    "실기시험": "2023.04.22 ~ 2023.06.25",
    "최종합격발표": "2023.04.22 ~ 2023.06.25"
}

const dataArr = [data]


export default function ScheduleTable() {
    return(
        <table className = {styles.table}>
            <tr>
                {Object.keys(data).map((key: string, index: number)=><th key={index} className={styles.table_head}>{key}</th>)}
            </tr>
            {dataArr.map((data: ScheduleData, index:number)=>(
                <tr key={index} className = {styles.table_data}>
                    <td>{data.구분}</td>
                    <td>{data.필기원서접수}</td>
                    <td>{data.필기시험}</td>
                    <td>{data.필기합격발표}</td>
                    <td>{data.실기원서접수}</td>
                    <td>{data.실기시험}</td>
                    <td>{data.최종합격발표}</td>
                </tr>
            ))}
        </table>
    )
}