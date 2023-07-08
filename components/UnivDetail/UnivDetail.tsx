import styles from './UnivDetail.module.scss'
import { univReducerState } from '@/pages/university'
import UniveLectureList from './UniveLectureList'
import {useEffect, useState} from 'react'
import axios from 'axios'

type UnivScheduledata = {
    id: number,
    reg_cancel_end: string|Date,
    reg_cancel_start: string|Date,
    reg_change_end: string|Date,
    reg_change_start: string|Date,
    reg_end: string|Date,
    reg_start: string|Date,
    sem_end: string|Date,
    sem_start: string|Date,
    school_name: string
}

export type UnivLectureData = {
    code: string,
    costs: number,
    credit: number,
    id: number,
    lecture: string,
    lecture_type: string,
    max_seats: number,
    prof: string,
    reg_start: string,
    tuition: number,
    univ: string
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


const lectureDataArr: lectureData[] = [
    {"강의명": "르세라핌의 이해",
    "교수": "김채원",
    "학점": 3,
    "정원": 10,
    },
    {"강의명": "르세라핌의 이해 연구",
    "교수": "홍은채",
    "학점": 2,
    "정원": 5},
    {"강의명": "에스파와 나의 삶",
    "교수": "Karina",
    "학점": 3,
    "정원": 20}
]



const fetchUnivData = async(name: string, path:string) => {
    const body = {
        school_name: name
     }
    const res = await axios.post(path, body, {
        headers: {
            "Content-Type": 'application/json'
        }
    })

    return res.data
}

const yieldDateFormat = (data: Date) => `${data.getFullYear()}.${data.getMonth()+1}.${data.getUTCDay()}`


export default function UnivDetail({state}:UnivDetailProps) {

    const [univSchedule, setUnivSchedule] = useState<UnivScheduledata|null>(null)
    const [lectureList, setLectureList] = useState<UnivLectureData[]|null>(null)

    const updateUnivSchedule = (schedule: UnivScheduledata) => setUnivSchedule(schedule)
    const updateLectureList = (list: UnivLectureData[]) => setLectureList(list) 

    useEffect(()=>{
        fetchUnivData(state.univName as string, '/get_unischedule').then((data:any)=>updateUnivSchedule(data))
        fetchUnivData(state.univName as string, '/get_lecture').then((data:any)=>updateLectureList(data))

    },[])
     
    if(!univSchedule || !lectureList) return (<></>)

    const {reg_start, reg_end, sem_start, reg_change_start, reg_change_end, reg_cancel_start, reg_cancel_end, sem_end} = univSchedule;

   

    return(
        <section className = {styles.univ_detail}>
            <table className = {styles.scheduleTable}>
                <thead>
                    <tr>
                        <th>수강 신청일</th>
                        <th>개강일</th>
                        <th>수강신청 정정일</th>
                        <th>수강 철회읠</th>
                        <th>종강일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{yieldDateFormat(new Date(reg_start))} ~ {yieldDateFormat(new Date(reg_end))}</td>
                        <td>{yieldDateFormat(new Date(sem_start))}</td>
                        <td>{yieldDateFormat(new Date(reg_change_start))} ~ {yieldDateFormat(new Date(reg_change_end))}</td>
                        <td>{yieldDateFormat(new Date(reg_cancel_start))} ~ {yieldDateFormat(new Date(reg_cancel_end))}</td>
                        <td>{yieldDateFormat(new Date(sem_end))}</td>
                    </tr>
                </tbody>
            </table>
            <UniveLectureList lectureDataArr={lectureList}/>
        </section>
    )
}