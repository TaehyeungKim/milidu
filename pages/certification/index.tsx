import styles from './index.module.scss'
import ChartComponent from '@/components/Chart/Chart'
import LectureList from '@/components/LectureList/LectureList'
import BookList from '@/components/BookList/BookList'
import ScheduleTable from '@/components/ScheduleTable/ScheduleTable'

export default function Certification() {
    return (
        <div className = {styles.wrapper}>
            <section className = {styles.cert_info}>
                <h1 className = {styles['cert_info--name']}>자격증명</h1>
                <h3 className = {styles['cert_info--desc']}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lorem neque. Donec a pharetra justo. Integer pellentesque pretium lorem ac facilisis. Nulla eu quam at nisl sagittis accumsan vitae eu nibh. Mauris rutrum lobortis ultricies. Ut non elit at metus venenatis fringilla eu et elit. Nullam blandit ac odio id convallis. Nulla facilisi. In dapibus libero ac elit interdum porta.
In non lectus quis enim dictum volutpat ut in nibh. Pellentesque viverra dolor vitae diam fermentum hendrerit ac nec dui. In dapibus sodales est, ut placerat nulla imperdiet et. Vivamus venenatis augue eget quam ultrices fringilla. Vivamus luctus a libero eu malesuada. Nulla hendrerit magna odio, eu volutpat lectus suscipit fringilla. Pellentesque sodales tristique augue quis ullamcorper. Fusce gravida at velit sed euismod.</h3>
                <h6 className = {styles['cert_info--organization']}>주관: 한국산업인력공단</h6>
            </section>
            <section className = {styles.cert_statistic}>
                <div className = {styles.representative_stat_container}>
                    <article className = {styles.representative_stat}>
                        <h5 className = {styles['representative_stat--field']}>전공명</h5>
                        <mark className = {styles['representative_stat--value']}>전기＊전자</mark>
                    </article>
                    <article className = {styles.representative_stat}>
                        <h5 className = {styles['representative_stat--field']}>합격률</h5>
                        <mark className = {styles['representative_stat--value']}>36%</mark>
                    </article>
                    <article className = {styles.representative_stat}>
                        <h5 className = {styles['representative_stat--field']}>응시자수</h5>
                        <mark className = {styles['representative_stat--value']}>345,000명</mark>
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
        </div>
    )
}