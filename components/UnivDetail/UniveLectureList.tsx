import styles from './UnivDetail.module.scss'
import { lectureData } from './UnivDetail'
import { useState } from 'react'

interface UniveLectureListProps {
    lectureDataArr: lectureData[]
}

interface LectureLiProps {
    data: lectureData,

}

function LectureLi({data}: LectureLiProps) {
    const [commentVisible, setCommentVisible] = useState<boolean>(false);

    const toggleCommentArea = () => setCommentVisible(!commentVisible)
    return(
        <li className = {styles.lecture}>
            <h5 className = {styles.lecture_title}>{data.강의명}</h5>
            <div className = {styles.lecture_info}>
                <div className = {styles['lecture_info--text']}><span>{data.교수}</span>&nbsp;/&nbsp;<span>{data.학점}학점</span>&nbsp;/&nbsp;<span>{data.정원}명</span></div>
                <button className = {styles.showComment} onClick={toggleCommentArea}>{commentVisible ? "▲" : "▼"}</button>
            </div>   
        </li>
    )
}

export default function UniveLectureList({lectureDataArr}:UniveLectureListProps) {

    

    return(
        <div className = {styles.lectureListContainer}>
        <h3>강의 목록</h3>
        <ul className={styles.lectureList}>
                {lectureDataArr.map((data: lectureData, index: number)=>(
                    <LectureLi data={data} key={index}/>
                ))}
        </ul>
        </div>
    )
}