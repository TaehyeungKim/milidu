import styles from './LectureList.module.scss'
import {CertLecture} from '@/pages/certification/[id]'

interface LectureListProps {
    lecture_data: CertLecture[]
}

export default function LectureList({lecture_data}:LectureListProps) {


    if(lecture_data.length === 0) return(
        <div className = {styles.container}>
            강의가 없습니다.
        </div>
    )

    return(
        <div className = {styles.container}>
            {lecture_data.map((data:CertLecture, index: number)=>(
                <article className = {styles.lectureList} key={index} onClick={()=>window.location.replace(data.url)}>
                    <h3 className = {styles['lectureList--lecture']}>{data.lecture_name}</h3>
                    <span className = {styles['lectureList--teacher']}>{data.teacher}</span>
                </article>
            ))}
        </div>
        
    )
}