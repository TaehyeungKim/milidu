import styles from './CertReview.module.scss';
import StarRateComponent from '@/components/StarRate/StarRateComponent';
import { CertReview, ReviewData } from '@/pages/certification/[id]';
import { CertInfo } from '@/utils/DataCollector';


interface CertReviewArticleProps {
    reviewArr: ReviewData[]
}


function CertReviewArticle({reviewArr}: CertReviewArticleProps) {
    return(
        <section className = {styles.reviewArea}>
            {reviewArr.map((data: ReviewData, index: number)=>(
                 <article className={styles.review} key={index}>
                 <header className={styles.review_writer}>
                     <em>{data.num_attempts}수 합격</em>/<em>{data.time_taken}</em><br/>
                    <span>{data.birthday}세</span>/<span>{data.sex}</span>/<span>{data.major}</span><br/>
                    <span>{data.username}</span>
                 </header>
                 <div className = {styles.below_header}>
                     <div className = {styles.level}>
                         <span className = {styles.label}>체감난이도: </span>
                         <StarRateComponent size={16} disabled={true} value={data.difficulty}/>
                     </div>
                     <div className = {styles.study}>
                        <span className = {styles.label}>공부방법: </span>
                        {data.study_method.split(',').map((method: string, index: number)=>(
                            <span key={index}>{method}</span>
                        ))}
                     </div>
                     <div className = {styles.studyMaterial}>
                         <span className={styles.label}>교재: </span><span>{data.recommend_book}</span>
                     </div>
                 </div>
                 <div className={styles.text}>
                 {data.content}
                 </div>
 
             </article>
            ))}
           
        </section>
    )
}

interface CertReviewProps {
    reviewData: CertReview,
    certInfo: CertInfo
}


export default function CertReview({reviewData, certInfo}:CertReviewProps) {
    return(
        <>
        <h3 className = {styles.cert}>{certInfo.name}</h3>
        <section className={styles.summaryArea}>
            <div className = {styles.sum_container}>
                <h3 className = {styles.sum_label}>난이도</h3>
                <StarRateComponent size={20} disabled={true} value={reviewData.average_difficulty}/>
            </div>
            <div className = {styles.sum_container}>
                <h3 className = {styles.sum_label}>소요기간</h3>
                <span className = {styles.value}>{reviewData.average_time_taken}개월</span>
            </div>
            <div className = {styles.sum_container}>
                <h3 className = {styles.sum_label}>시험 횟수</h3>
                <span className = {styles.value}>{reviewData.average_num_attempts}수</span>
            </div>
        </section>
        {reviewData.ReviewList.length > 0 ? <CertReviewArticle reviewArr={reviewData.ReviewList}/>:<h3>아직 등록된 리뷰가 없습니다.</h3>}
        
        </>
    )
}