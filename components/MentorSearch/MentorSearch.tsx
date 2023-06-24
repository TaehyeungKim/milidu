import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import styles from './MentorSearch.module.scss'

const toRem = (px: number) => px / 16

const Container = styled.div`
    display: flex;
    position: inherit;
    width: 100%;
`

const SearchUpperContainer = styled(Container)`
    height: ${toRem(40)}rem;
`

const SearchBelowContainer = styled(Container)<{$shown: boolean}>`
    display: ${prop=>prop.$shown ? 'flex' : 'none'};
`
const SearchSelectedShowBar = styled(Container)`
    flex-flow: row wrap;
`

const FilterChoiceLabel = styled.label`
    width: ${toRem(120)}rem;
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
`

const SearchBox = styled.input`
    poisition: relative;
    flex-grow: 1;
    display: block;
    outline: none;
    border: 2px solid aqua;
`

const SearchBelow_right = styled.div<{$key: number, $index: number }>`
    display: ${prop=>prop.$key === prop.$index ? 'flex' : 'none'};
    flex-flow: row wrap;
    flex-grow: 1;
    align-content: flex-start;
    margin-left: ${toRem(30)}rem;

    >div {
        display: flex;
        align-items: center;
        height: fit-content;
    }

    label {
        user-select: none;
        padding: ${toRem(10)}rem;
    }
`



type LetterList = {
    letter: string,
    cert_list: string[]
}

const letterListArr: LetterList[] = [
    {letter: 'ㄱ,ㄴ,ㄷ',
    cert_list: [
        '게임프로그래밍전문가', '가정교육전문기사', '건축목재시공', '건축일반시공', '디자인프로그래밍기능장', '다중인격장애상담가1급'
    ]
},
    {letter: 'ㄹ,ㅁ,ㅂ',
    cert_list: [
        '라면조리기술사', '미용사기능장'
    ]},
    {letter: 'ㅅ,ㅇ,ㅈ',
    cert_list: [
        '사회조사분석사1급', '아동복지상담가'
    ]},
    {letter: 'ㅊ,ㅋ,ㅌ',
    cert_list: [
        '컴퓨터활용능력1급', '타이포그라피'
    ]},
    {letter: 'ㅍ,ㅎ',
    cert_list: [
        '파이썬기술사1급'
    ]},
    {letter: '기타',
    cert_list: [
        'CDAD 기술사'
    ]}
]

export default function MentorSearch() {
    const [letterIndex, setLetterIndex] = useState<number>(0);
    const [filterShown, setFilterShown] = useState<boolean>(false);

    const bar = useRef<HTMLDivElement>(null)

    const updateLetterIndex = (index:number) => setLetterIndex(index)



    useEffect(()=>{
        const inp = document.querySelectorAll('input')
        inp.forEach((value: HTMLInputElement)=>{
            if(value.name === 'cert') console.log(value);
        })
    },[])

    useEffect(()=>{
        const makingSelectedShowLabel = (inpId: string, cert: string, target: HTMLDivElement) => {
            const container = document.createElement('div');
            container.setAttribute('class', `${styles.labelContainer}`)
            container.setAttribute('id', `show_${inpId}`)
            const selectedShowLabel = document.createElement('label');
            selectedShowLabel.setAttribute('for', inpId);
            selectedShowLabel.setAttribute('class', `${styles.selected_label}`)
            selectedShowLabel.textContent = cert;
            container.appendChild(selectedShowLabel);
            target.appendChild(container)
        }
        const deleteSelectedShowLabel = (id: string, target: HTMLDivElement) => {
            const label = document.getElementById(id) as Node;
            target.removeChild(label)
        }
        const inp = document.querySelectorAll('.certCheck')
        inp.forEach((input: Element)=>{
            input.addEventListener('change', (e)=>{
                const target = e.target as HTMLInputElement
                if(target.checked) makingSelectedShowLabel(target.id, target.value, bar.current as HTMLDivElement)
                else deleteSelectedShowLabel(`show_${target.id}`, bar.current as HTMLDivElement)
            })
        })
        
    },[])

    return (
        <section className = {styles.search}>
            <SearchUpperContainer>
                <input type="checkbox" id="filterShown" hidden onChange={(e)=>{
                    setFilterShown(e.target.checked)
                }}/>
                <FilterChoiceLabel htmlFor={"filterShown"}>자격증 선택</FilterChoiceLabel>
                <SearchBox placeholder='검색어를 입력하세요'/>
            </SearchUpperContainer>
            <SearchBelowContainer $shown={filterShown}>
                <ul className = {styles.searchBelow_left}>
                    {letterListArr.map((value: LetterList, index: number)=>(
                        <li key={index}>
                            <input type="radio" name={"letterChoice"} hidden id={`letter_${index}`} onClick={()=>updateLetterIndex(index)} defaultChecked={index === 0 ? true : false}/>
                            <label htmlFor={`letter_${index}`}>{value.letter}</label>
                        </li>
                    ))}
                   
                </ul>
                {letterListArr.map((value: LetterList, index: number)=>(
                    <SearchBelow_right $index={index} $key = {letterIndex} key={index}>
                        {value.cert_list.map((cert: string, innerIndex: number)=>(
                            <div key={innerIndex}>
                                <input className = {'certCheck'}type="checkbox" id={`cert_${index}_${innerIndex}`} name={'cert'} value={cert}/>
                                <label htmlFor={`cert_${index}_${innerIndex}`}> {cert}</label>
                            </div>
                        ))}
                    </SearchBelow_right>        
                        ))}
            </SearchBelowContainer>
            <SearchSelectedShowBar ref={bar}></SearchSelectedShowBar>
        </section>
    )
}