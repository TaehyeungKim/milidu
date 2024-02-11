import { useReducer } from "react"

import { arrowRight, arrowLeft } from '@/public/icons/icons'
import { useState, useEffect, useRef,  useContext, useSyncExternalStore } from "react"
import { CommentList, Comment, LectureInfoSection, CommentData, Info, Wrapper, LeftButton, RightButton } from "./sc"

import StarRateComponent from "./StarRateComponent"

import { LectureInfoContext, LectureComment, LectureInfoContextType } from "../UniveLectureList"
import { getSnapshotOfData, subscribe, UnivLectureReviewDataCollector } from "@/utils/DataCollector"
import UnivCommentWrite from "./write"

export type LectureCommentData = {
    period: string,
    rate: number,
    pf: string,
    comment: string
}


const MAXPERPAGE = 3;


const OPTION = ['1', '여름', '2', '겨울']


interface UnivLectureCommentProps {
    data: LectureComment[]
}

export type CommentData = LectureInfoContextType & {
    username: string,
    content: string,
    year: string
    semester: string,
    rate: number,
    load: string,
    grade: string
}

export type CommentDataAction = {type: keyof CommentData, data: string|number}


const commentDataReducer = (state: CommentData, action: CommentDataAction) => {
    return {...state, [action.type]: action.data}
}

export default function UnivLectureComment({data}:UnivLectureCommentProps) {
    const lectureInfo = useContext(LectureInfoContext)

    const [commentData, dispatch] = useReducer(commentDataReducer, {
        ...lectureInfo,
        username:'taehyeungkim98',
        content: "",
        rate:0,
        load:"",
        grade:"",
        year: "",
        semester: ""
    })
    

    const collectorRef = useRef<UnivLectureReviewDataCollector>(new UnivLectureReviewDataCollector());

    
    const [page, setPage] = useState<number>(0);

    const syncCommentData = useSyncExternalStore(subscribe.bind(collectorRef.current), getSnapshotOfData.bind(collectorRef.current), getSnapshotOfData.bind(collectorRef.current))

    let comments: LectureComment[] = data;
    if(syncCommentData) comments = syncCommentData as LectureComment[];

    const pageIncrement = () => {
        if((page+1)*MAXPERPAGE< comments.length) setPage(page=>page+1);
    }

    const pageDecrease = () => {
        if(page > 0 ) setPage(page=>page-1)
    }

    const [left, right] = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)]
    

    const shownDataArr = comments.filter((data: LectureComment, index: number)=>{
        return index >= page*MAXPERPAGE && index < (page+1)*MAXPERPAGE
    })
    

    // useEffect(()=>{
    //     if((page+1) * MAXPERPAGE === commentDataArr.length) {
    //         for(let i = 0; i < MAXPERPAGE; i++) {
    //             if(!ServerDataArr[(page+1)*MAXPERPAGE + i]) break;
    //             commentDataArr.push(ServerDataArr[(page+1)*MAXPERPAGE + i])
    //         }
    //     }
    // },[page])

    useEffect(()=>{
        dispatch({type: "year", data: new Date().getFullYear().toString()})
        dispatch({type: "semester", data: OPTION[0]})
    },[])

    useEffect(()=>{
        collectorRef.current.data = data as LectureComment[];
        return(()=>{
            collectorRef.current.data = null
        })
    },[])

    

    return(
        <div style={{overflow: 'hidden'}}>
        {comments.length === 0 ? <div style={{textAlign: 'center'}}>강의평이 존재하지 않습니다.</div>
        :
        <>
        <CommentList>
            {shownDataArr.map((data: LectureComment, index: number)=>(
                <Comment key={data.id}>
                
                <CommentData>{data.content}</CommentData>
                <LectureInfoSection>
                    <Info>수강년도: {data.semester}</Info><Info><StarRateComponent size={15} value={data.rate} disabled={true}></StarRateComponent></Info>
                    <Info>로드: {data.load}</Info><Info>성적: {data.grade}</Info>
                </LectureInfoSection>
            </Comment>
            ))}
        </CommentList>
        <Wrapper>
            <LeftButton $index={page} onClick={pageDecrease} ref={left}>{arrowLeft()}</LeftButton>
            <RightButton $index={page} $dataLength={comments.length} $MAX={MAXPERPAGE} onClick={pageIncrement} ref={right}>{arrowRight()}</RightButton>
        </Wrapper>
        </>
        }
        <UnivCommentWrite data={commentData} dispatch={dispatch} collectorRef={collectorRef}/>    
        </div>
    )
}
