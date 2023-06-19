import styles from './UnivDetail.module.scss'
import { lectureData } from './UnivDetail'
import { useState, useRef, useEffect } from 'react'
import UnivLectureComment from './UnivLectureComment'
import styled from 'styled-components'


interface UniveLectureListProps {
    lectureDataArr: lectureData[]
}

interface LectureLiProps {
    data: lectureData,
}

const CommentShowButton = styled.button<{$commentVisible:boolean}>`
        all: unset;
        display: block;
        transform: ${props=>props.$commentVisible ? 'rotate(180deg)' : 'rotate(0deg)'};
        transition: transform 0.5s ease-in-out, color 0.5s ease-in-out;
        color: ${props=>props.$commentVisible ? 'teal' : 'aquamarine'};
    `


function LectureLi({data}: LectureLiProps) {
    const [commentVisible, setCommentVisible] = useState<boolean>(false);

    const commentListContainer = useRef<HTMLDivElement>(null)

    

    const toggleCommentArea = () => setCommentVisible(!commentVisible)

    


    useEffect(()=>{
        if(commentVisible) {
            commentListContainer.current?.classList.add(styles.showCommentList)
            commentListContainer.current?.classList.remove(styles.hideCommentList)
        } else {
            commentListContainer.current?.classList.remove(styles.showCommentList)
            commentListContainer.current?.classList.add(styles.hideCommentList)
        }
        
    },[commentVisible])

    return(
        <li className = {styles.lecture}>
            <div className = {styles.container}>
            <h5 className = {styles.lecture_title}>{data.강의명}</h5>
            <div className = {styles.lecture_info}>
                <div className = {styles['lecture_info--text']}><span>{data.교수}</span>&nbsp;/&nbsp;<span>{data.학점}학점</span>&nbsp;/&nbsp;<span>{data.정원}명</span></div>
                <CommentShowButton $commentVisible={commentVisible}  onClick={toggleCommentArea}>▼</CommentShowButton>
                
            </div>
            </div>
            <div className = {styles.commentListContainer} ref={commentListContainer}>
                 <UnivLectureComment/>   
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