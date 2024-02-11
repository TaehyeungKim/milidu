import styles from './styles.module.scss'

import { RegisterButton, CommentTextArea } from "./sc";
import { UnivLectReviewStarbox } from './components';
import { CommentData } from "./UnivLectureComment";
import { Dispatch, useState, useRef, useCallback, MutableRefObject, useEffect } from "react";
import { UnivLectureReviewDataCollector } from "@/utils/DataCollector";
import { textAreaResize } from "@/utils/textAreaResize"
import axios from "axios";
import { UnivLectReviewRadio, UnivLectReviePeriodSelect } from './components';
import { CommentDataAction } from './UnivLectureComment';


interface UnivCommentWriteProps {
    data: CommentData,
    dispatch: Dispatch<CommentDataAction>,
    collectorRef: MutableRefObject<UnivLectureReviewDataCollector>
}

const LOADRADIOARR =(lecture_id: number)=> [
    {id: `load_little_${lecture_id}`, value: "적음"},
    {id: `load_normal_${lecture_id}`, value: "보통"},
    {id: `load_lot_${lecture_id}`, value: "많음"}
]

const GRADERADIOARR = (lecture_id: number) => [
    {id: `grade_poor_${lecture_id}`, value: "박함"},
    {id: `grade_normal_${lecture_id}`, value: "적당함"},
    {id: `grade_well_${lecture_id}`, value: "너그러움"}
]


export default function UnivCommentWrite({data, dispatch, collectorRef}: UnivCommentWriteProps) {
    
    const textarea = useRef<HTMLTextAreaElement>(null);

    const [commentPosting, setCommentPosting] = useState<boolean>(false)

    const handleSubmit = useCallback(async(data:CommentData)=>{
        if(commentPosting) return ;
        setCommentPosting(true)
        if(data.content === ""
        || data.semester === ""
        || data.year === ""
        || data.rate === 0
        || data.load === ""
        || data.grade === "") return ;
        const res = await axios.post('/create_lect_review', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(res.status === 200) collectorRef.current.collectData('/get_lect_review', "POST", {
            category: "강좌ID",
            keyword: data.lecture_id
        }).finally(()=>setCommentPosting(false))
    },[commentPosting])

    useEffect(()=>{
        textAreaResize(textarea.current as HTMLTextAreaElement);
    },[])

    return(
        <section>
            <div className = {styles.review_box}>
                <UnivLectReviewStarbox dispatch={dispatch}></UnivLectReviewStarbox>
                <UnivLectReviePeriodSelect data={data} dispatch={dispatch}></UnivLectReviePeriodSelect>
            </div>
            <div>
                <UnivLectReviewRadio idValueArr={LOADRADIOARR(data.lecture_id)} name={"load"} updater={(load: string)=>dispatch({type: "load", data: load})}>
                    <span>로드: </span>    
                </UnivLectReviewRadio>
                <UnivLectReviewRadio idValueArr={GRADERADIOARR(data.lecture_id)} name={"grade"} updater = {(grade: string)=>dispatch({type: "grade", data: grade})}>
                    <span>성적: </span>
                </UnivLectReviewRadio>
            </div>
            <div style={{width: '100%', display: 'flex'}}><CommentTextArea ref={textarea} onChange={(e)=>dispatch({type: "content", data: e.target.value})} placeholder="한 줄 수강평을 입력해주세요!"/></div>
            <RegisterButton $commentPosting = {commentPosting} onClick={()=>handleSubmit(data)}>{commentPosting ? "수강평 등록중..." : "수강평 등록하기"}</RegisterButton>           
        </section>
    )
}