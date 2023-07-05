import styles from './[id].module.scss'

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import CertAside from '@/components/CertPageRelated/CertAside'
import { useReducer, useSyncExternalStore, useEffect, useState } from 'react'
import CertInfoComponent from '@/components/CertPageRelated/CertInfo'
import CertReview from '@/components/CertPageRelated/CertReview'
import CertReviewWrite from '@/components/CertPageRelated/CertReviewWrite'
import Link from 'next/link'
import { doubleArrowLeft } from '@/public/icons/icons'
import {certDataCollector} from '@/utils/DataCollector'
import { CertInfo } from '@/utils/DataCollector'
import { useRouter } from 'next/router'
import { subscribe, getSnapshotOfData } from '@/utils/DataCollector'
import Loading from '@/components/Loading/Loading'


export type CertDetailInfo = {
    name: string,
    description: string,
    name_eng: string,
    host: string,
    ministry: string
}

export type CertStats = {
    pass_rate: number,
    test_passed: number,
    test_taken: number,
    year: number
}

export type CertInfoAndStats = {
    cert_info: CertDetailInfo,
    data: CertStats[]
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
    certInfoAndStats: CertInfoAndStats,
    reviewData: CertReview
}

export const getServerSideProps: GetServerSideProps<{ certServerSideProps: CertServerSideProps }> = async({params}) => {

    const certInfoAndStatsRes = await fetch(`https://milidu-backend-ykzlu.run.goorm.site/cert_stats?cert_code=${params?.id}`);
    console.log(certInfoAndStatsRes)
    const certInfoAndStats = await certInfoAndStatsRes.json()
    console.log(certInfoAndStats)
   


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


    const reviewData: CertReview = {
        cert: (params as ParsedUrlQuery).id as string,
        avr_level: 3.7,
        avr_trynum: 2.7,
        avr_period: '3개월',
        reviewArr: reviewArr
    }

    const certServerSideProps = {
        certInfoAndStats: certInfoAndStats,
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

    const data = useSyncExternalStore(subscribe.bind(certDataCollector), getSnapshotOfData.bind(certDataCollector), getSnapshotOfData.bind(certDataCollector))
    const router = useRouter();

    const [detailData, setDetailData] = useState<CertInfo>(certDataCollector.dataOnRange.filter((data:CertInfo)=>data.code == router.query.id)[0]);

    const [state, dispatch] = useReducer(reducer, {page: "info"})
    

    

    useEffect(()=>{
        if(!data) certDataCollector.collectCertData()
    },[])

    useEffect(()=>{
        if(data) {
            certDataCollector.dataOnRange = data.filter((data:CertInfo)=>data.code === router.query.id)
            setDetailData(certDataCollector.dataOnRange[0]);
        }
    },[data])
    
    if(!data ||!detailData) return (<Loading/>)

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
                            <CertInfoComponent certInfoAndStats={certServerSideProps.certInfoAndStats} certInfo={detailData}/>
                        )
                    case "review":
                        return(
                            <CertReview reviewData={certServerSideProps.reviewData}/>
                        )
                    case "write":
                        return(
                            <CertReviewWrite cert={certServerSideProps.certInfoAndStats.cert_info.name}/>
                        )
                }   
            })()}
            
        </div>
        <CertAside dispatch={dispatch} state={state}/>
        </>
    )
}