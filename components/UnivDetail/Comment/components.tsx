import styles from './styles.module.scss'
import { toRem } from '@/utils/toRem'
import { RadioLabel, SelectContainer, Selected, SelectUl } from './sc'
import { CommentData, CommentDataAction } from './UnivLectureComment'
import { Dispatch, useState } from 'react'
import { LabelForStarBox } from './sc'
import StarRateComponent from './StarRateComponent'

type IdValue = {
    id: string,
    value: string
}

interface UnivLectReviewRadioProps{
    idValueArr: IdValue[],
    name: string,
    updater: (arg: string) => void
    children: JSX.Element
}

export function UnivLectReviewRadio({idValueArr, name, updater, children}: UnivLectReviewRadioProps) {
    const Inp = (id:string, name: string, updater: (arg: string)=>void, value: string) => <input className = {styles.radio} type="radio" name={name} hidden id={id} onChange={()=>updater(value)}/>
    return(
        <div className= {styles.load_part}>
            {children}
            <div style={{display: 'flex', marginLeft: `${toRem(10)}rem`}}>
                {idValueArr.map((v: IdValue)=>(
                    <>
                    {Inp(v.id, name, updater, v.value)}
                    <RadioLabel htmlFor={v.id}>{v.value}</RadioLabel>
                    </>
                ))}
            </div>
        </div>
    )
}

interface UnivLectReviewStarboxProps {
    dispatch: Dispatch<CommentDataAction>
}

export function UnivLectReviewStarbox({dispatch}:UnivLectReviewStarboxProps) {
    return(
        <div className = {styles.review_mini_box}>
            <LabelForStarBox >별점을 매겨주세요!</LabelForStarBox>
            <StarRateComponent size={40} disabled={false} updater={(rate: number)=>dispatch({type: "rate", data: rate})}/>
        </div>
    )
}

interface YearSelectProps {
    year: string,
    dispatch: Dispatch<CommentDataAction>
}

function YearSelect({year, dispatch}: YearSelectProps){
    const [yearSelectVisible, setYearSelectVisible] = useState<boolean>(false);
    const toggleYearSelect = () => setYearSelectVisible(v=>!v);
    return(
        <div className= {styles.review_day} onClick={toggleYearSelect}>
            <span className= {styles.lecture_year}>수강년도: </span>
            <SelectContainer>
                <Selected>{year}</Selected>
                <div>
                <SelectUl $visible={yearSelectVisible}>
                    {(()=>{
                    let arr:any = [];
                    const curYear = new Date().getFullYear();
                    for(let i = 4; i >=0; i--) arr = [...arr, <li style={year === (curYear -i).toString() ? {backgroundColor: '#efefef'}:undefined} key={`year_${curYear-i}`} value={curYear-i} onClick={(e)=>{
                            e.stopPropagation()
                            
                            dispatch({type: "year", data: `${curYear-i}`})
                            toggleYearSelect()
                        }}>{curYear - i}</li>]
                    return arr
                    })()}
                </SelectUl>
                </div>
            </SelectContainer>
            <span>년도</span>
        </div>
    )
}

interface SemSelectProps {
    semester: string,
    dispatch: Dispatch<CommentDataAction>
}

const OPTION = ['1', '여름', '2', '겨울']

function SemSelect({semester, dispatch}: SemSelectProps){
    const [semSelectVisible, setSemSelectVisible] = useState<boolean>(false);
    const toggleSemSelect = () => setSemSelectVisible(v=>!v)
    return(
        <div style={{display: 'inline-flex'}} onClick={toggleSemSelect}>
                <SelectContainer>
                <Selected>{semester}</Selected>
                <div>
                    <SelectUl $visible={semSelectVisible}>
                        {OPTION.map((op: string, i:number)=>(<li style={semester === op ? {backgroundColor: "#efefef"}:undefined}key={op} value={op} onClick={(e)=>{
                            e.stopPropagation()
                            dispatch({type: "semester", data: op})
                            toggleSemSelect()
                        }}>{op}</li>))}
                    </SelectUl>
                </div>
            </SelectContainer>
            <span>학기</span>
        </div>
    )
}

interface UnivLectReviePeriodSelectProps {
    data: CommentData,
    dispatch: Dispatch<CommentDataAction>
}

export function UnivLectReviePeriodSelect({data, dispatch}:UnivLectReviePeriodSelectProps) {
    return(
        <div className= {styles.review_sub_box}>
            <YearSelect year={data.year} dispatch={dispatch}></YearSelect>            
            <SemSelect semester={data.semester} dispatch={dispatch}></SemSelect>                  
        </div>
    )
}