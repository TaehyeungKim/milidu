import styles from './[id].module.scss'

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import CertAside from './CertAside'
import { useReducer } from 'react'
import CertInfo from './CertInfo'
import CertReview from './CertReview'

export type CertDetailInfo = {
    name: string,
    desc?: string,
    host: string,
    major: string,
    rate: number,
    taker: number
}

export const getServerSideProps: GetServerSideProps<{ certDetailInfo: CertDetailInfo }> = async({params}) => {


    const certDetailInfo: CertDetailInfo = {
        name: (params as ParsedUrlQuery).id as string,
        desc: '산업계의 정보화가 진전되면서 영업, 재무, 생산 등의 분야에 대한 경영분석은 물론 데이터 관리가 필수적입니다. <컴퓨터활용능력> 검정은 사무자동화의 필수 프로그램인 스프레드시트(SpreadSheet), 데이터베이스(Database) 활용능력을 평가하는 국가기술자격 시험입니다.',
        host: '대한상공회의소',
        major: '사무, 회계',
        rate: 32,
        taker: 345000
    };

    return { props: {certDetailInfo} }
}

export type CertDetailPageState = {
    page: string
} 

export type CertDetailPageAction = {
    to: string
}

const reducer = (state: CertDetailPageState, action: CertDetailPageAction) => { 
    return { page: action.to }
}

export default function Certification({certDetailInfo}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [state, dispatch] = useReducer(reducer, {page: "info"})

    return (
        <>
        
        <div className = {styles.wrapper}>
            {(()=>{
                switch(state.page) {
                    case "info":
                        return(
                            <CertInfo certDetailInfo={certDetailInfo}/>
                        )
                    case "review":
                        return(
                            <CertReview/>
                        )
                }   
            })()}
            
        </div>
        <CertAside dispatch={dispatch}/>
        </>
    )
}