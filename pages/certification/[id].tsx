import styles from './[id].module.scss'

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import CertAside from '@/components/CertPageRelated/CertAside'
import { useReducer } from 'react'
import CertInfo from '@/components/CertPageRelated/CertInfo'
import CertReview from '@/components/CertPageRelated/CertReview'
import CertReviewWrite from '@/components/CertPageRelated/CertReviewWrite'
import Link from 'next/link'
import { doubleArrowLeft } from '@/public/icons/icons'

export type CertDetailInfo = {
    name: string,
    desc?: string,
    host: string,
    major: string,
    rate: number,
    taker: number
}

export type CertReview = {
    cert: string,
    avr_level: number,
    avr_trynum: number,
    avr_period: string,
    reviewArr: ReviewData[]
}

export type ReviewData = {
    user: {
        name: string,
        age: number,
        sex: string,
        major: string
    },
    trynum: number,
    period: string,
    level: number,
    studyMethod: string[],
    material: string,
    comment: string
}

type CertServerSideProps = {
    certDetailInfo: CertDetailInfo,
    reviewData: CertReview
}

export const getServerSideProps: GetServerSideProps<{ certServerSideProps: CertServerSideProps }> = async({params}) => {

    const res = await fetch(`https://milidu-backend-zqddn.run.goorm.site/cert_stats?cert_code=${params?.id}`);
    // console.log(params)
    const json = await res.json()
    console.log(json)


    const reviewArr: ReviewData[] = [
        {
            user: {
                name: 'taehyeungkim98',
                age: 21,
                sex: '남',
                major: '컴퓨터공학'
            },
            trynum: 3,
            period: '1개월',
            level: 4,
            studyMethod: ['기출풀이', '인터넷강의'],
            material: '이기적 컴퓨터활용능력1급',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec lectus vitae mauris dignissim volutpat id in turpis. Ut ut faucibus neque. Maecenas rutrum sollicitudin purus, et auctor sem tincidunt ut. Nulla ut quam vitae erat egestas ultricies vitae eget lectus. Vivamus viverra rhoncus turpis, quis sodales tortor placerat nec. Etiam convallis tincidunt scelerisque. In hac habitasse platea dictumst. Maecenas nisi felis, blandit vitae lacus sit amet, hendrerit vehicula mauris. Cras feugiat ultrices justo ac auctor.'
        },
        {
            user: {
                name: 'taehyeungkim98',
                age: 21,
                sex: '남',
                major: '컴퓨터공학'
            },
            trynum: 3,
            period: '1개월',
            level: 4,
            studyMethod: ['기출풀이', '인터넷강의'],
            material: '이기적 컴퓨터활용능력1급',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec lectus vitae mauris dignissim volutpat id in turpis. Ut ut faucibus neque. Maecenas rutrum sollicitudin purus, et auctor sem tincidunt ut. Nulla ut quam vitae erat egestas ultricies vitae eget lectus. Vivamus viverra rhoncus turpis, quis sodales tortor placerat nec. Etiam convallis tincidunt scelerisque. In hac habitasse platea dictumst. Maecenas nisi felis, blandit vitae lacus sit amet, hendrerit vehicula mauris. Cras feugiat ultrices justo ac auctor.'
        },
        {
            user: {
                name: 'taehyeungkim98',
                age: 21,
                sex: '남',
                major: '컴퓨터공학'
            },
            trynum: 3,
            period: '1개월',
            level: 4,
            studyMethod: ['기출풀이', '인터넷강의'],
            material: '이기적 컴퓨터활용능력1급',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec lectus vitae mauris dignissim volutpat id in turpis. Ut ut faucibus neque. Maecenas rutrum sollicitudin purus, et auctor sem tincidunt ut. Nulla ut quam vitae erat egestas ultricies vitae eget lectus. Vivamus viverra rhoncus turpis, quis sodales tortor placerat nec. Etiam convallis tincidunt scelerisque. In hac habitasse platea dictumst. Maecenas nisi felis, blandit vitae lacus sit amet, hendrerit vehicula mauris. Cras feugiat ultrices justo ac auctor.'
        }
    ]

    const certDetailInfo: CertDetailInfo = {
        name: (params as ParsedUrlQuery).id as string,
        desc: '산업계의 정보화가 진전되면서 영업, 재무, 생산 등의 분야에 대한 경영분석은 물론 데이터 관리가 필수적입니다. <컴퓨터활용능력> 검정은 사무자동화의 필수 프로그램인 스프레드시트(SpreadSheet), 데이터베이스(Database) 활용능력을 평가하는 국가기술자격 시험입니다.',
        host: '대한상공회의소',
        major: '사무, 회계',
        rate: 32,
        taker: 345000
    };

    const reviewData: CertReview = {
        cert: (params as ParsedUrlQuery).id as string,
        avr_level: 3.7,
        avr_trynum: 2.7,
        avr_period: '3개월',
        reviewArr: reviewArr
    }

    const certServerSideProps = {
        certDetailInfo: certDetailInfo,
        reviewData: reviewData
    }


    return { props: {certServerSideProps} }
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

export default function Certification({certServerSideProps}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [state, dispatch] = useReducer(reducer, {page: "info"})

    return (
        <>
        
        <div className = {styles.wrapper}>
            <Link className = {styles.goBack} href={'/certification'}>
                <div>{doubleArrowLeft()}</div>
            뒤로가기</Link>
            {(()=>{
                switch(state.page) {
                    case "info":
                        return(
                            <CertInfo certDetailInfo={certServerSideProps.certDetailInfo}/>
                        )
                    case "review":
                        return(
                            <CertReview reviewData={certServerSideProps.reviewData}/>
                        )
                    case "write":
                        return(
                            <CertReviewWrite cert={certServerSideProps.certDetailInfo.name}/>
                        )
                }   
            })()}
            
        </div>
        <CertAside dispatch={dispatch} state={state}/>
        </>
    )
}