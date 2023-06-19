import styled from "styled-components"
import { arrowRight, arrowLeft } from '@/public/icons/icons'
import { useState, useEffect, useRef } from "react"

export type LectureCommentData = {
    period: string,
    rate: number,
    pf: string,
    comment: string
}

const ServerDataArr: LectureCommentData[] = [
    {
        period: "2023년 1학기",
        rate: 5,
        pf: "김채원",
        comment: "교수님이 너무 예쁘고 수업도 잘하세요!"
    },
    {
        period: "2022년 2학기",
        rate: 4,
        pf: "미와야키 사쿠라",
        comment: "일본인이신데도 한국어가 유창하세요"
    },
    {
        period: "2022년 1학기",
        rate: 5,
        pf: "김채원",
        comment: "짱이에요!"
    },
    {
        period: "2022년 1학기",
        rate: 5,
        pf: "허윤진",
        comment: "최고입니다!"
    },
    {
        period: "2021년 2학기",
        rate: 5,
        pf: "카리나",
        comment: "와우!!"
    },
]

const commentDataArr = [ServerDataArr[0], ServerDataArr[1], ServerDataArr[2]]

const toRem = (px: number) => px / 16 

const MAXPERPAGE = 3;



    const CommentList = styled.ul`
        all: unset;
        width: 90%;
        list-style: none;
        min-width: ${toRem(500)}rem;
        display: block;
        margin: 0 auto 0;
    `

    const Comment = styled.li`
        all: unset;
        width: 100%;
        padding: ${toRem(10)}rem;
        position: relative;
        display: block;
        border-bottom: 2px solid #ebeeff91;
        transition: background 0.3s ease-in-out;
        background: white;

        &:last-child {
            border-bottom: none;
        }

        &:hover {
            background: #ebeeff91;
            cursor: pointer;
        }
    `

    const CommentSection = styled.section`
        width: 100%;
        box-sizing: border-box;
        display: block;
    `

    const LectureInfoSection = styled(CommentSection)``
    const CommentData = styled(CommentSection)`
        font-size: ${toRem(17)}rem;
    `

    const Info = styled.span`
        display: inline-block;
        margin-right: ${toRem(20)}rem;
        font-size: ${toRem(12)}rem;

        &:last-child {
            margin-right: 0;
        }
    `

    const Rate = styled(Info)`
        color: tomato;
    `
    
    const Wrapper = styled.footer`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: ${toRem(10)}rem;
    `

    const PageButton = styled.button`
        all: unset;
        width: ${toRem(30)}rem;
        display: flex;
        box-sizing; border-box;

        &:hover {
            cursor: pointer;
        }
    `

    const LeftButton = styled(PageButton)<{$index:number}>`
        opacity: ${props=>props.$index === 0 ? 0.4 : 1}
    `

    const RightButton = styled(PageButton)<{$index:number}>`
        opacity: ${props=>props.$index+1 * MAXPERPAGE >= ServerDataArr.length  ? 0.4 : 1}
    `


export default function UnivLectureComment() {

    
    const [page, setPage] = useState<number>(0);

    const pageIncrement = () => {
        if((page+1)*MAXPERPAGE< ServerDataArr.length) setPage(page=>page+1);
    }

    const pageDecrease = () => {
        if(page > 0 ) setPage(page=>page-1)
    }

    const [left, right] = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)]

    

    const shownDataArr = commentDataArr.filter((data: LectureCommentData, index: number)=>{
        return index >= page*MAXPERPAGE && index < (page+1)*MAXPERPAGE
    })

    

    useEffect(()=>{
        if((page+1) * MAXPERPAGE === commentDataArr.length) {
            for(let i = 0; i < MAXPERPAGE; i++) {
                if(!ServerDataArr[(page+1)*MAXPERPAGE + i]) break;
                commentDataArr.push(ServerDataArr[(page+1)*MAXPERPAGE + i])
            }
        }
    },[page])

    return(
        <div style={{overflow: 'hidden'}}>
        <CommentList>
            {shownDataArr.map((data: LectureCommentData, index: number)=>(
                <Comment key={index}>
                
                <CommentData>{data.comment}</CommentData>
                <LectureInfoSection>
                    <Info>수강년도: {data.period}</Info><Info>교수: {data.pf}</Info><Rate>{'★'.repeat(data.rate)}</Rate>
                </LectureInfoSection>
            </Comment>
            ))}
        </CommentList>
        <Wrapper>
            <LeftButton $index={page} onClick={pageDecrease} ref={left}>{arrowLeft()}</LeftButton>
            <RightButton $index={page} onClick={pageIncrement} ref={right}>{arrowRight()}</RightButton>
        </Wrapper>
        </div>
    )
}