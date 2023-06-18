import styles from './UnivDetail.module.scss'
import { univReducerState } from '@/pages/university'
import UniveLectureList from './UniveLectureList'

type univScheduledata = {
    university: string,
    "수강 신청일": string,
    "개강일": string,
    "수강신청 정정일": string,
    "수강 철회일": string,
    "종강일": string
}

export type lectureData = {
    "강의명": string,
    "교수": string,
    "학점": number,
    "정원": number
}

interface UnivDetailProps {
    state: univReducerState
}

const data: univScheduledata = {
    "university": "서울대학교",
    "수강 신청일": "2023.02.14 ~ 2023.03.14",
    "개강일": "2023.03.02",
    "수강신청 정정일": "2023.03.02 ~ 2023.03.14",
    "수강 철회일" : "2023.03.02 ~ 2023.03.14",
    "종강일": "2023.06.14"
}

const lectureDataArr: lectureData[] = [
    {"강의명": "르세라핌의 이해",
    "교수": "김채원",
    "학점": 3,
    "정원": 10},
    {"강의명": "르세라핌의 이해 연구",
    "교수": "홍은채",
    "학점": 2,
    "정원": 5},
    {"강의명": "에스파와 나의 삶",
    "교수": "Karina",
    "학점": 3,
    "정원": 20}
]

export default function UnivDetail({state}:UnivDetailProps) {

     


    return(
        <section className = {styles.univ_detail}>
            <table className = {styles.scheduleTable}>
                <thead>
                    <tr>
                        {Object.keys(data).map((key: string, index: number)=>(
                              key !== 'university' ? <th key={index}>{key}</th> : null    
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{data['수강 신청일']}</td>
                        <td>{data.개강일}</td>
                        <td>{data['수강신청 정정일']}</td>
                        <td>{data['수강 철회일']}</td>
                        <td>{data.종강일}</td>
                    </tr>
                </tbody>
            </table>
            <UniveLectureList lectureDataArr={lectureDataArr}/>
        </section>
    )
}