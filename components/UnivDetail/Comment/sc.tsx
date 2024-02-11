import styled from "styled-components"
import { toRem } from "@/utils/toRem"

export const CommentList = styled.ul`
    all: unset;
    width: 90%;
    list-style: none;
    
    display: block;
    margin: 0 auto 0;
`
export const Comment = styled.li`
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
export const CommentSection = styled.section`
    width: 100%;
    box-sizing: border-box;
    display: block;
`
export const LectureInfoSection = styled(CommentSection)`
    position: relative;
    display: flex;
    align-items: flex-end;
	@media screen and (max-width: 405px) {
        display:block;
    }
`
export const CommentData = styled(CommentSection)`
    font-size: ${toRem(17)}rem;
    @media screen and (max-width: 553px) {
        font-size: ${toRem(12)}rem;
    }
`
export const Info = styled.span`
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
export const Wrapper = styled.footer`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${toRem(10)}rem;
    box-sizing: border-box;
`
export const PageButton = styled.button`
    all: unset;
    width: ${toRem(30)}rem;
    display: flex;
    box-sizing; border-box;

    &:hover {
        cursor: pointer;
    }
`
export const LeftButton = styled(PageButton)<{$index:number}>`
    opacity: ${props=>props.$index === 0 ? 0.4 : 1}
`
export const RightButton = styled(PageButton)<{$index:number, $dataLength: number, $MAX: number}>`
    opacity: ${props=>(props.$index+1) * props.$MAX >= props.$dataLength  ? 0.4 : 1}
`

export const LabelForStarBox = styled.span`
    font-size: ${toRem(16)}rem;
    font-family: '--main-kr';
    display: inline-block;
    font-weight: 400;
	margin:auto;
    @media screen and (max-width: 553px) {
        font-size: ${toRem(11)}rem;
    }
`

export const SelectContainer = styled.div`
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
export const SelectUl = styled.ul<{$visible:boolean}>`
    display: ${props=>props.$visible ? 'block':'none'};
    background-color: white;
    position: absolute;
    width: 100%;
    top: 0;
    transform: translateY(-100%);
    
`

export const Selected = styled.span`
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
export const RadioLabel = styled.label`
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

export const RegisterButton = styled.button<{$commentPosting: boolean}>`
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
    opacity: ${props=>props.$commentPosting ? 0.4 : 1};
`

export const CommentTextArea = styled.textarea`
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