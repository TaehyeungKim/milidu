import styles from './[id].module.scss'
import axios from 'axios'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import CertAside from '@/components/CertPageRelated/CertAside'
import { useReducer, useSyncExternalStore, useEffect, useState, createContext } from 'react'
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
    year: number,
    military_taken: number,
    military_passed: number
}

export type CertLecture = {
    lecture_name: string,
    teacher: string,
    url: string
}

export type CertInfoAndStats = {
    cert_info: CertDetailInfo,
    data: CertStats[],
    lecture_info: CertLecture[]
}

export type CertReview = {
    average_difficulty: number,
    average_num_attempts: number,
    average_time_taken: number
    ReviewList: ReviewData[]
}

export type ReviewData = {

    // user: {
    //     name: string,
    //     age: number,
    //     sex: string,
    //     major: string
    // },
    username: string
    cert_code: string|number,
    cert_name: string,
    content: string,
    created_at: string,
    num_attempts: number,
    time_taken: string,
    difficulty: number,
    study_method: string,
    recommend_book: string,
    num_likes: number,
    updated_at: string,
    id: number
}

type CertServerSideProps = {
    certInfoAndStats: CertInfoAndStats,
    reviewData: CertReview
}

export type CertTestSchedule = {
    "실기시작": string,
    "실기원서접수시작": string,
    "실기원서접수종료": string,
    "실기종료": string,
    "자격서류제출시작": string,
    "자격서류제출종료": string,
    "종목명": string,
    "필기시작": string,
    "필기원서접수시작":string,
    "필기원서접수종료": string,
    "필기종료":string 
    "필기합격발표": string,
    "합격발표시작":string,
    "합격발표종료":string,
    "회차":string
}

export const ScheduleContext = createContext<CertTestSchedule[]|null>(null)

export const getServerSideProps: GetServerSideProps<{ certServerSideProps: CertServerSideProps }> = async({params}) => {

    //selfserver
    //const certInfoAndStatsRes = await axios.get(`https://milidu-selfserver.run.goorm.site/cert_stats?cert_code=${params?.id}`)

    //real backend
    const certInfoAndStatsRes = await axios.get(`https://milidu-backend-ykzlu.run.goorm.site/cert_stats?cert_code=${params?.id}`)
    

    const certInfoAndStats: CertInfoAndStats = await certInfoAndStatsRes.data

    const certReviewRes = await axios.post("https://milidu-backend-ykzlu.run.goorm.site/get_cert_review",
    {
        category: "자격증코드",
        keyword: `${params?.id}`
    },
    {headers: {
        "Content-Type": "application/json"
    }})

    const certReview:CertReview = await certReviewRes.data


    const certServerSideProps = {
        certInfoAndStats: certInfoAndStats,
        reviewData: certReview
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

    const data = useSyncExternalStore(subscribe.bind(certDataCollector), getSnapshotOfData.bind(certDataCollector), getSnapshotOfData.bind(certDataCollector)) as CertInfo[]
    const router = useRouter();

    const [detailData, setDetailData] = useState<CertInfo>(certDataCollector.dataOnRange.filter((data:CertInfo)=>data.code == router.query.id)[0]);

    const [state, dispatch] = useReducer(reducer, {page: "info"})

    const [schedule, setSchedule] = useState<CertTestSchedule[]|null>(null)
    

    

    useEffect(()=>{
        if(!data) certDataCollector.collectCertData()

    },[])

    useEffect(()=>{
        if(data) {
            certDataCollector.dataOnRange = data.filter((data:CertInfo)=>data.code === router.query.id)
            setDetailData(certDataCollector.dataOnRange[0]);
        }
    },[data])

    useEffect(()=>{
        const fetchSchedule = async() => {
            const res = await axios.post('/cert_test_schedule', {
                cert_code: router.query.id
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setSchedule(res.data)
        }
        fetchSchedule()

    },[detailData])
    
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
                            <ScheduleContext.Provider value={schedule}>
                                <CertInfoComponent certInfoAndStats={certServerSideProps.certInfoAndStats} certInfo={detailData}/>
                            </ScheduleContext.Provider>
                        )
                    case "review":
                        return(
                            <CertReview reviewData={certServerSideProps.reviewData} certInfo={detailData}/>
                        )
                    case "write":
                        return(
                            <CertReviewWrite cert_name={certServerSideProps.certInfoAndStats.cert_info.name} cert_code={detailData.code}/>
                        )
                }   
            })()}
            
        </div>
        <CertAside dispatch={dispatch} state={state}/>
        </>
    )
}