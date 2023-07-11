import styles from "./CertInfo.module.scss"
import ChartComponent from '@/components/Chart/Chart'
import LectureList from '@/components/LectureList/LectureList'
import BookList from '@/components/BookList/BookList'
import ScheduleTable from '@/components/ScheduleTable/ScheduleTable'
import {CertInfoAndStats} from '@/pages/certification/[id]';
import {CertInfo} from '@/utils/DataCollector';
import { useEffect } from "react"


interface CertInfoProps {
    certInfoAndStats: CertInfoAndStats,
    certInfo: CertInfo
}

export default function CertInfo({certInfoAndStats, certInfo}: CertInfoProps) {

    useEffect(()=>{
        console.log(certInfoAndStats)
    },[])

    return(
        <>
            <section className = {styles.cert_info}>
                <h1 className = {styles['cert_info--name']}>{certInfoAndStats.cert_info.name}</h1>
                <h3 className = {styles['cert_info--desc']}>{certInfoAndStats.cert_info.description}</h3>
                <h6 className = {styles['cert_info--organization']}>주관: {certInfoAndStats.cert_info.host}</h6>
            </section>
            <section className = {styles.cert_statistic}>
                <div className = {styles.representative_stat_container}>
                    <article className = {styles.representative_stat}>
                        <h5 className = {styles['representative_stat--field']} >전공명</h5>
                        <mark className = {styles['representative_stat--value']}>{certInfo.majors}</mark>
                    </article>
                    <article className = {styles.representative_stat}>
                        <h5 className = {styles['representative_stat--field']}>합격률</h5>
                        <mark className = {styles['representative_stat--value']}>{((certInfo.total_passed/certInfo.total_taken)*100).toFixed(2)}%</mark>
                    </article>
                    <article className = {styles.representative_stat}>
                        <h5 className = {styles['representative_stat--field']}>응시자수</h5>
                        <mark className = {styles['representative_stat--value']}>{certInfo.total_taken}명</mark>
                    </article>
                    
                </div>
                <div className = {styles.graph_container}>
                    <ChartComponent stats_data={certInfoAndStats.data}/>
                </div>
            </section>
            <section className = {styles.cert_studyMaterial}>
                <h3 className = {styles.field}>무료강의</h3>
                <h3 className = {styles.field}>도서추천</h3>
                <LectureList lecture_data={certInfoAndStats.lecture_info}/>
                <BookList recommend_book={certInfoAndStats.recommend_book}/>
            </section>
            <section className = {styles.cert_schedule}>
                <ScheduleTable/>
            </section>
        </>
    )
}

