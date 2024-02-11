import styles from './styles.module.scss'

import { RegisterButton, CommentPostMessage } from "./sc";
import { UnivLectReviewStarbox } from './components';
import { CommentData } from "./UnivLectureComment";
import { Dispatch, useState, useReducer, useCallback, MutableRefObject } from "react";
import { UnivLectureReviewDataCollector } from "@/utils/DataCollector";

import axios from "axios";
import { UnivLectReviewRadio, UnivLectReviePeriodSelect, UnivLectCommentTextarea } from './components';
import { CommentDataAction } from './UnivLectureComment';



interface UnivCommentWriteProps {
    data: CommentData,
    dispatch: Dispatch<CommentDataAction>,
    collectorRef: MutableRefObject<UnivLectureReviewDataCollector>,
    initialArg: CommentData,
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
type CommentPostStatus = {status: "plain"|"success"|"fail", reason?: string}
export type CommentPostAction = CommentPostStatus

const postReducer = (_: CommentPostStatus, action: CommentPostAction) => {
    return action
}


export default function UnivCommentWrite({data, dispatch, collectorRef, initialArg}: UnivCommentWriteProps) {
    

    const [commentPosting, setCommentPosting] = useState<boolean>(false)
    const [postStatus, postDispatch] = useReducer(postReducer, {status: "plain"})

    

    const handleSubmit = useCallback(async(data:CommentData)=>{
        if(commentPosting) return ;
        setCommentPosting(true)
        if(data.content === ""
        || data.semester === ""
        || data.year === ""
        || data.rate === 0
        || data.load === ""
        || data.grade === "") {
            if(data.content === "") postDispatch({status: "fail", reason: "한 줄 수강평을 입력해주세요."})
            else if(data.load === "") postDispatch({status: "fail", reason: "로드량을 선택해주세요."})
            else if(data.grade === "") postDispatch({status: "fail", reason: "학점 난이도를 선택해주세요."})
            else if(data.rate === 0) postDispatch({status: "fail", reason: "추천도를 입력해주세요."})
            setCommentPosting(false);
            return ;
        }
        
        
        const res = await axios.post('/create_lect_review', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(res.status === 200) collectorRef.current.collectData('/get_lect_review', "POST", {
            category: "강좌ID",
            keyword: data.lecture_id
        }).finally(()=>{
            const keys = Object.keys(initialArg) as [keyof CommentData];
            keys.forEach((key: keyof CommentData)=>dispatch({type: key, data: initialArg[key]}))
            setCommentPosting(false)
        })
    },[commentPosting])

    

    return(
        <section>
            <div className = {styles.review_box}>
                <UnivLectReviewStarbox dispatch={dispatch} rate={data.rate}></UnivLectReviewStarbox>
                <UnivLectReviePeriodSelect data={data} dispatch={dispatch}></UnivLectReviePeriodSelect>
            </div>
            <div>
                <UnivLectReviewRadio idValueArr={LOADRADIOARR(data.lecture_id)} name={"load"} updater={(load: string)=>dispatch({type: "load", data: load})} posting={commentPosting}>
                    <span>로드: </span>    
                </UnivLectReviewRadio>
                <UnivLectReviewRadio idValueArr={GRADERADIOARR(data.lecture_id)} name={"grade"} updater = {(grade: string)=>dispatch({type: "grade", data: grade})} posting={commentPosting}>
                    <span>성적: </span>
                </UnivLectReviewRadio>
            </div>
            <div style={{width: '100%', display: 'flex'}}>
                <UnivLectCommentTextarea dispatch={dispatch} posting={commentPosting}></UnivLectCommentTextarea>
            </div>
            <RegisterButton $commentPosting = {commentPosting} onClick={()=>handleSubmit(data)}>{commentPosting ? "수강평 등록중..." : "수강평 등록하기"}</RegisterButton>           
            {postStatus.status === "fail" ? <CommentPostMessage>{postStatus.reason}</CommentPostMessage> : null}
        </section>
    )
}