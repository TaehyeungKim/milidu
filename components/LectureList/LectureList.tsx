import styles from './LectureList.module.scss'

type LectureData = {
    lecture: string,
    teacher: string
}

export default function LectureList() {

    const data: LectureData[] = [
        {lecture: "최고의 언어는 춤",
        teacher: "김태형"},
        {lecture: "랩은 나의 삶",
        teacher: "박종선"},
        {lecture: "애니 없이는 못살아",
        teacher: "이시윤"},
        {lecture: "비표! 줘!",
        teacher: "이승훈"}
    ]

    return(
        <div className = {styles.container}>
            {data.map((data:LectureData, index: number)=>(
                <article className = {styles.lectureList} key={index}>
                    <h3 className = {styles['lectureList--lecture']}>{data.lecture}</h3>
                    <span className = {styles['lecturList--teacher']}>{data.teacher}</span>
                </article>
            ))}
        </div>
        
    )
}