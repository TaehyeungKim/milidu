import styles from "./CertInfo.module.scss"
import ChartComponent from '@/components/Chart/Chart'
import LectureList from '@/components/LectureList/LectureList'
import BookList from '@/components/BookList/BookList'
import ScheduleTable from '@/components/ScheduleTable/ScheduleTable'
import { CertDetailInfo } from "./[id]"

interface CertInfoProps {
    certDetailInfo: CertDetailInfo
}

export default function CertInfo({certDetailInfo}: CertInfoProps) {
    return(
        <>
            <section className = {styles.cert_info}>
                <h1 className = {styles['cert_info--name']}>{certDetailInfo.name}</h1>
                <h3 className = {styles['cert_info--desc']}>{certDetailInfo.desc}</h3>
                <h6 className = {styles['cert_info--organization']}>주관: {certDetailInfo.host}</h6>
            </section>
            <section className = {styles.cert_statistic}>
                <div className = {styles.representative_stat_container}>
                    <article className = {styles.representative_stat}>
                        <h5 className = {styles['representative_stat--field']}>전공명</h5>
                        <mark className = {styles['representative_stat--value']}>{certDetailInfo.major}</mark>
                    </article>
                    <article className = {styles.representative_stat}>
                        <h5 className = {styles['representative_stat--field']}>합격률</h5>
                        <mark className = {styles['representative_stat--value']}>{certDetailInfo.rate}%</mark>
                    </article>
                    <article className = {styles.representative_stat}>
                        <h5 className = {styles['representative_stat--field']}>응시자수</h5>
                        <mark className = {styles['representative_stat--value']}>{certDetailInfo.taker}명</mark>
                    </article>
                    
                </div>
                <div className = {styles.graph_container}>
                    <ChartComponent/>
                </div>
            </section>
            <section className = {styles.cert_studyMaterial}>
                <h3 className = {styles.field}>무료강의</h3>
                <h3 className = {styles.field}>도서추천</h3>
                <LectureList/>
                <BookList/>
            </section>
            <section className = {styles.cert_schedule}>
                <ScheduleTable/>
            </section>
        </>
    )
}

