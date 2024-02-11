import styles from './UnivDetail.module.scss'
// import { lectureData } from './UnivDetail'

import { useState, useRef, useEffect, createContext, useCallback } from 'react'
import UnivLectureComment from './Comment/UnivLectureComment'
import styled from 'styled-components'
import {UnivLectureData} from '@/components/UnivDetail/UnivDetail'
// import {LectureReviewInp} from '@/components/UnivDetail/UnivLectureComment'
import { CommentData } from './Comment/UnivLectureComment'
import axios from 'axios'


interface UniveLectureListProps {
    lectureDataArr: UnivLectureData[]
}

interface LectureLiProps {
    data: UnivLectureData,
}

const CommentShowButton = styled.button<{$commentVisible:boolean}>`
        all: unset;
        display: block;
        transform: ${props=>props.$commentVisible ? 'rotate(180deg)' : 'rotate(0deg)'};
        transition: transform 0.5s ease-in-out, color 0.5s ease-in-out;
        color: ${props=>props.$commentVisible ? 'teal' : 'aquamarine'};
    `
export type LectureInfoContextType = {
    school_name:string,
    lecture_name:string,
    lecture_id:number
}

type CommentOuterInfo = {
    created_at: string,
    updated_at: string,
    id: number
}

export type LectureComment = CommentData & CommentOuterInfo


export const LectureInfoContext = createContext<LectureInfoContextType>({
    school_name: "",
    lecture_name:"",
    lecture_id:0
})

const fetchCommentData = async(id: number) => {
    const res = await axios.post('/get_lect_review', {
        category: "강좌ID",
        keyword: id
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return res.data
}

function LectureLi({data}: LectureLiProps) {
    const [commentVisible, setCommentVisible] = useState<boolean>(false);
    const [commentList, setCommentList] = useState<LectureComment[]|null>(null)

    const commentListContainer = useRef<HTMLDivElement>(null)
    const updateCommentList = (list: LectureComment[]) => setCommentList(list)

    

    const toggleCommentArea = useCallback(() => {
        if(commentList) setCommentVisible(visible=>!visible)
    },[commentList])

    useEffect(()=>{
        fetchCommentData(data.id).then((res)=>{
            updateCommentList(res)
        })
    },[])


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
            <div className = {styles.container} onClick={toggleCommentArea}>
            <h5 className = {styles.lecture_title}>{data.lecture}</h5>
            <div className = {styles.lecture_info}>
                <div className = {styles['lecture_info--text']}><span className="lecture_info_all">{data.prof}</span>&nbsp;/&nbsp;
					<span className="lecture_info_all">{data.credit}학점</span>&nbsp;/&nbsp;
					<span className="lecture_info_all">{data.max_seats}명</span></div>
                <CommentShowButton $commentVisible={commentVisible}>▼</CommentShowButton>
                
            </div>
            </div>
            <div className = {styles.commentListContainer} ref={commentListContainer}>
                {commentList ? 
                <LectureInfoContext.Provider value={{
                    school_name: data.univ,
                    lecture_name: data.lecture,
                    lecture_id: data.id
                }}>
                    <UnivLectureComment data={commentList}/>   
                 </LectureInfoContext.Provider>
                 :
                null    
                }
                
            </div>
        </li>
        
    )
}

export default function UniveLectureList({lectureDataArr}:UniveLectureListProps) {

    

    return(
        <div className = {styles.lectureListContainer}>
        <h3>강의 목록</h3>
        <ul className={styles.lectureList}>
                
                {lectureDataArr.map((data: UnivLectureData)=>(
                    <LectureLi data={data} key={data.id}/>
                ))}
        </ul>
        </div>
    )
}