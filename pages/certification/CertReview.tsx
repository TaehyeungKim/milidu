import styles from './CertReview.module.scss';
import StarRateComponent from '@/components/StarRate/StarRateComponent';

export default function CertReview() {
    return(
        <>
        <section className={styles.summaryArea}>
            <div className = {styles.sum_container}>
                <h3 className = {styles.sum_label}>난이도</h3>
                <StarRateComponent size={20} disabled={true} value={3.5}/>
            </div>
            <div className = {styles.sum_container}>
                <h3 className = {styles.sum_label}>소요기간</h3>
                <span className = {styles.value}>3개월</span>
            </div>
            <div className = {styles.sum_container}>
                <h3 className = {styles.sum_label}>시험 횟수</h3>
                <span className = {styles.value}>2.4수</span>
            </div>
        </section>
        <section className = {styles.reviewArea}>
            <article className={styles.review}>
                <header className={styles.review_writer}>
                     <span>나이</span><span>성별</span><span>전공</span><br/>
                     <span>7수 합격</span><span>1개월</span>
                </header>

            </article>
        </section>
        </>
    )
}