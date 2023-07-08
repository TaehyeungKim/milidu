import styled from "styled-components"
import { arrowRight, arrowLeft } from '@/public/icons/icons'
import { useState, useEffect, useRef, useCallback, useContext } from "react"
import { toRem } from "@/utils/toRem"
import { textAreaResize } from "@/utils/textAreaResize"
import StarRateComponent from "../StarRate/StarRateComponent"
import axios from 'axios'
import { LectureInfoContext, LectureComment } from "./UniveLectureList"

import styles from './UnivLectureComment.module.scss'

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



const MAXPERPAGE = 3;

const CommentList = styled.ul`
    all: unset;
    width: 90%;
    list-style: none;
    
    display: block;
    margin: 0 auto 0;
`
const Comment = styled.li`
    all: unset;
    
    padding: ${toRem(10)}rem;
    position: relative;
    display: block;
    border-bottom: 3px solid #ebeeff91;
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
const LectureInfoSection = styled(CommentSection)`
    position: relative;
    display: flex;
    align-items: flex-end;
	@media screen and (max-width: 405px) {
        display:block;
    }
`
const CommentData = styled(CommentSection)`
    font-size: ${toRem(17)}rem;
    @media screen and (max-width: 553px) {
        font-size: ${toRem(12)}rem;
    }
`
const Info = styled.span`
    display: inline-block;
    bottom: 0;
    margin-right: ${toRem(20)}rem;
    font-size: ${toRem(12)}rem;
    @media screen and (max-width: 553px) {
        font-size: ${toRem(8)}rem;
		margin-right: ${toRem(12)}rem;
    }
    &:last-child {
        margin-right: 0;
    }
`
const Wrapper = styled.footer`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${toRem(10)}rem;
    box-sizing: border-box;
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
    opacity: ${props=>(props.$index+1) * MAXPERPAGE >= ServerDataArr.length  ? 0.4 : 1}
`
const CommentTextArea = styled.textarea`
    resize: none;
    overflow: hidden;
    box-sizing: content-box;
    outline: none;
    border: 2px solid #ebeeff91;
    transition: border 0.3s ease-in-out;
    display: block;
    width: auto;
    font-size: ${toRem(16)}rem;
    font-family: '--main-kr';
    padding: ${toRem(5)}rem;
    @media screen and (max-width: 553px) {
        font-size: ${toRem(12)}rem;
    }
    &:focus-visible {
        border: 2px solid #84FFEA;
    }
    flex-grow: 1;
`
const LabelForStarBox = styled.span`
    font-size: ${toRem(16)}rem;
    font-family: '--main-kr';
    display: inline-block;
    font-weight: 400;
	margin:auto;
    @media screen and (max-width: 553px) {
        font-size: ${toRem(11)}rem;
    }
`
const RegisterButton = styled.button`
    all: unset;
    font-size: ${toRem(14)}rem;
    font-family: '--main-kr';
    background-color: white;
    border: 2px solid #FFAEAD;
    border-radius: 1em;
    padding: ${toRem(10)}rem;
    color: black;
    display: block;
    margin: ${toRem(14)}rem auto ${toRem(14)}rem;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    @media screen and (max-width: 553px) {
        font-size:${toRem(10)}rem;
    }
    &:hover {
        background-color: #FFAEAD;
        color: white;
        cursor: pointer;
    }
`
const SelectContainer = styled.div`
    position: relative;
    text-align: end;
    >* {
        min-width: ${toRem(50)}rem;
    }
    span {
        display: inline-block;
    }
    z-index: 10;
    cursor: pointer;
`
const SelectUl = styled.ul<{$visible:boolean}>`
    display: ${props=>props.$visible ? 'block':'none'};
    background-color: white;
    position: absolute;
    width: 100%;
    top: 0;
    transform: translateY(-100%);
    
`
const Selected = styled.span`
    @keyframes blink {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    &::after {
        content: "";
        border: 1px solid gray;
        display: block;
        width: 100%;
        animation: blink 1s infinite ease-in-out alternate;
    }
`
const RadioLabel = styled.label`
    padding: ${toRem(7)}rem ${toRem(20)}rem;
    background-color: #efefef;
    text-align: center;
    display: block;
    border-radius: 1em;
    margin: 0 ${toRem(7)}rem;
    border: 2px solid #efefef;
    cursor: pointer;
    font-weight: 600;
	@media screen and (max-width: 459px) {
		padding:${toRem(5)}rem ${toRem(12)}rem;
	}
	@media screen and (max-width: 348px) {
		padding: ${toRem(3)}rem ${toRem(8)}rem;
		font-size: ${toRem(10)}rem;
	}
`


const OPTION = ['1', '여름', '2', '겨울']

export type LectureReviewInp = {
    school_name:string,
    lecture_name:string,
    lecture_id:number,
    username:string,
    content:string,
    semester:string,
    rating:number
    load:string,
    grade:string
}

interface UnivLectureCommentProps {
    data: LectureComment[]
}


export default function UnivLectureComment({data}:UnivLectureCommentProps) {

    const lectureInfo = useContext(LectureInfoContext)

    
    const [page, setPage] = useState<number>(0);

    const [yearSelectVisible, setYearSelectVisible] = useState<boolean>(false);
    const [semSelectVisible, setSemSelectVisible] = useState<boolean>(false);

    const toggleYearSelect = () => setYearSelectVisible(v=>!v);
    const toggleSemSelect = () => setSemSelectVisible(v=>!v)

    const [load, setLoad] = useState<string>("");
    const updateLoad = (load:string) => setLoad(load)

    const [grade, setGrade] = useState<string>("");
    const updateGrade = (grade: string) => setGrade(grade);

    const Inp = (id:string, name: string, updater: (arg: string)=>void, value: string) => <input className = {styles.radio} type="radio" name={name} hidden id={id} onChange={()=>updater(value)}/>


    const pageIncrement = () => {
        if((page+1)*MAXPERPAGE< ServerDataArr.length) setPage(page=>page+1);
    }

    const pageDecrease = () => {
        if(page > 0 ) setPage(page=>page-1)
    }

    const [left, right] = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)]
    const textarea = useRef<HTMLTextAreaElement>(null);
    
    const [selectedYear, setSelectedYear] = useState<string>("");
    const [selectedSem, setSelectedSem] = useState<string>("1");
    const [rate, setRate] = useState<number>(0);

    const updateYear = (year:string) => setSelectedYear(year);
    const updateSem = (sem:string)=> setSelectedSem(sem)
    const updateRate = (rate:number)=>setRate(rate)


    const shownDataArr = data.filter((data: LectureComment, index: number)=>{
        return index >= page*MAXPERPAGE && index < (page+1)*MAXPERPAGE
    })

    
    const handleSubmit = useCallback(async(data:LectureReviewInp)=>{
        if(textarea.current?.value === ""
        || selectedYear === ""
        || selectedSem === ""
        || rate === 0
        || load === ""
        || grade === "") return ;
        const res = await axios.post('/create_lect_review', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(res.data)
    },[selectedYear, selectedSem, rate, load, grade])
    

    useEffect(()=>{
        if((page+1) * MAXPERPAGE === commentDataArr.length) {
            for(let i = 0; i < MAXPERPAGE; i++) {
                if(!ServerDataArr[(page+1)*MAXPERPAGE + i]) break;
                commentDataArr.push(ServerDataArr[(page+1)*MAXPERPAGE + i])
            }
        }
    },[page])

    useEffect(()=>{
        textAreaResize(textarea.current as HTMLTextAreaElement);
        updateYear(new Date().getFullYear().toString())
        updateSem(OPTION[0]);
    },[])

    

    return(
        <div style={{overflow: 'hidden'}}>
        {data.length === 0 ? <div style={{textAlign: 'center'}}>강의평이 존재하지 않습니다.</div>
        :
        <>
        <CommentList>
            {shownDataArr.map((data: LectureComment, index: number)=>(
                <Comment key={data.id}>
                
                <CommentData>{data.content}</CommentData>
                <LectureInfoSection>
                    <Info>수강년도: {data.semester}</Info><Info><StarRateComponent size={15} value={data.rating} disabled={true}></StarRateComponent></Info>
                    <Info>로드: {data.load}</Info><Info>성적: {data.grade}</Info>
                </LectureInfoSection>
            </Comment>
            ))}
        </CommentList>
        <Wrapper>
            <LeftButton $index={page} onClick={pageDecrease} ref={left}>{arrowLeft()}</LeftButton>
            <RightButton $index={page} onClick={pageIncrement} ref={right}>{arrowRight()}</RightButton>
        </Wrapper>
        </>
        }
        
        <section>
            <div className = {styles.review_box}>
                <div className = {styles.review_mini_box}>
                    <LabelForStarBox >별점을 매겨주세요!</LabelForStarBox>
                    <StarRateComponent size={40} disabled={false} updater={updateRate}/>
                </div>
                <div className= {styles.review_sub_box}>
                    <div className= {styles.review_day} onClick={toggleYearSelect}>
                        <span className= {styles.lecture_year}>수강년도: </span>
                        <SelectContainer>
                            <Selected>{selectedYear}</Selected>
                            <div>
                            <SelectUl $visible={yearSelectVisible}>
                                {(()=>{
                                let arr:any = [];
                                const curYear = new Date().getFullYear();
                                for(let i = 4; i >=0; i--) arr = [...arr, <li style={selectedYear === (curYear -i).toString() ? {backgroundColor: '#efefef'}:undefined} key={`year_${curYear-i}`} value={curYear-i} onClick={(e)=>{
                                        e.stopPropagation()
                                        updateYear((curYear-i).toString())
                                        toggleYearSelect()
                                    }}>{curYear - i}</li>]
                                return arr
                                })()}
                            </SelectUl>
                            </div>
                        </SelectContainer>
                        <span>년도</span>
                    </div>
                    <div style={{display: 'inline-flex'}} onClick={toggleSemSelect}>
                         <SelectContainer>
                         <Selected>{selectedSem}</Selected>
                            <div>
                                <SelectUl $visible={semSelectVisible}>
                                    {OPTION.map((op: string, i:number)=>(<li style={selectedSem === op ? {backgroundColor: "#efefef"}:undefined}key={op} value={op} onClick={(e)=>{
                                        e.stopPropagation()
                                        updateSem(op)
                                        toggleSemSelect()
                                    }}>{op}</li>))}
                                </SelectUl>
                            </div>
                        </SelectContainer>
                        <span>학기</span>
                    </div>
                </div>   
            </div>
            <div>
                <div className= {styles.load_part}>
                    <span>로드: </span>
                    <div style={{display: 'flex', marginLeft: `${toRem(10)}rem`}}>
                        {Inp("load_little", "load", updateLoad, "적음")}
                        <RadioLabel htmlFor="load_little">적음</RadioLabel>
                        {Inp("load_normal", "load", updateLoad, "보통")}
                        <RadioLabel htmlFor="load_normal">보통</RadioLabel>
                        {Inp("load_lot", "load", updateLoad, "많음")}
                        <RadioLabel htmlFor="load_lot">많음</RadioLabel>
                    </div>
                </div>
                <div className= {styles.load_part}>
                    <span>성적: </span>
                    <div style={{display: 'flex', marginLeft: `${toRem(10)}rem`}}>
                        {Inp("grade_poor", "grade", updateGrade, "박함")}
                        <RadioLabel htmlFor="grade_poor">박함</RadioLabel>
                        {Inp("grade_normal", "grade", updateGrade, "적당함")}
                        <RadioLabel htmlFor="grade_normal">적당함</RadioLabel>
                        {Inp("grade_well", "grade", updateGrade, "너그러움")}
                        <RadioLabel htmlFor="grade_well">너그러움</RadioLabel>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', display: 'flex'}}><CommentTextArea ref={textarea} placeholder="한 줄 수강평을 입력해주세요!"/></div>
            <RegisterButton onClick={()=>handleSubmit({
                    ...lectureInfo,
                    username:'taehyeungkim98',
                    content:textarea.current?.value as string,
                    semester: selectedYear + '년도 ' + selectedSem + '학기',
                    rating:rate,
                    load:load,
                    grade:grade
            })}>수강평 등록하기</RegisterButton>           
        </section>
        
        
        </div>
    )
}
