import styles from './CertReview.module.scss';
import StarRateComponent from '@/components/StarRate/StarRateComponent';
import { CertReview, ReviewData } from './[id]';


interface CertReviewArticleProps {
    reviewArr: ReviewData[]
}


function CertReviewArticle({reviewArr}: CertReviewArticleProps) {
    return(
        <section className = {styles.reviewArea}>
            {reviewArr.map((data: ReviewData, index: number)=>(
                 <article className={styles.review} key={index}>
                 <header className={styles.review_writer}>
                     <em>{data.trynum}수 합격</em>/<em>{data.period}</em><br/>
                      <span>{data.user.age}세</span>/<span>{data.user.sex}</span>/<span>{data.user.major}</span> 
                 </header>
                 <div className = {styles.below_header}>
                     <div className = {styles.level}>
                         <span className = {styles.label}>체감난이도: </span>
                         <StarRateComponent size={16} disabled={true} value={data.level}/>
                     </div>
                     <div className = {styles.study}>
                        <span className = {styles.label}>공부방법: </span>
                        {data.studyMethod.map((method: string, index: number, arr: string[])=>(
                            <span key={index}>{method}</span>
                        ))}
                     </div>
                     <div className = {styles.studyMaterial}>
                         <span className={styles.label}>교재: </span><span>{data.material}</span>
                     </div>
                 </div>
                 <div className={styles.text}>
                 {data.comment}
                 </div>
 
             </article>
            ))}
           
        </section>
    )
}

interface CertReviewProps {
    reviewData: CertReview
}


export default function CertReview({reviewData}:CertReviewProps) {
    return(
        <>
        <h3 className = {styles.cert}>{reviewData.cert}</h3>
        <section className={styles.summaryArea}>
            <div className = {styles.sum_container}>
                <h3 className = {styles.sum_label}>난이도</h3>
                <StarRateComponent size={20} disabled={true} value={reviewData.avr_level}/>
            </div>
            <div className = {styles.sum_container}>
                <h3 className = {styles.sum_label}>소요기간</h3>
                <span className = {styles.value}>{reviewData.avr_period}</span>
            </div>
            <div className = {styles.sum_container}>
                <h3 className = {styles.sum_label}>시험 횟수</h3>
                <span className = {styles.value}>{reviewData.avr_trynum}수</span>
            </div>
        </section>
        <CertReviewArticle reviewArr={reviewData.reviewArr}/>
        </>
    )
}