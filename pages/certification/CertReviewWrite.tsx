import styles from './CertReviewWrite.module.scss'
import { useEffect, useRef } from 'react'
import { textAreaResize } from '@/utils/textAreaResize'
import StarRateComponent from '@/components/StarRate/StarRateComponent'

interface CertReviewWriteProps {
    cert: string
}

export default function CertReviewWrite({cert}: CertReviewWriteProps){

    const textarea = useRef<HTMLTextAreaElement>(null)

    useEffect(()=>{textAreaResize(textarea.current as HTMLTextAreaElement)},[])

    return(
        <>
        <h3 className = {styles.cert}>{cert}</h3>
        <section className={styles.text}>
            <textarea className={styles.textarea} placeholder={"자격증 합격 후기를 적어주세요."} ref={textarea}></textarea>
        </section>
        <section className = {styles.questionaire}>
            <div className={styles.question}>
                <span className={styles.question_label}>
                    체감 난이도는 어느정도인가요?
                </span>
                <div className = {styles.star_inline}>
                    <StarRateComponent size={30} disabled={false}/>
                </div>
            </div>
            <div className={styles.question}>
                <span className={styles.question_label}>
                    몇 회만에 합격하셨나요?
                </span>
				<div>
					<input type="radio" name="trynum" id='trynum_1' hidden/>
					<label className = {styles.trynum} htmlFor='trynum_1'>1회</label>
					<input type="radio" name="trynum" id='trynum_2' hidden/>
					<label className = {styles.trynum} htmlFor='trynum_2'>2회</label>
					<input type="radio" name="trynum" id='trynum_3' hidden/>
					<label className = {styles.trynum} htmlFor='trynum_3'>3회</label>
					<input  type="radio" name="trynum" id='trynum_4' hidden/>
					<label className = {styles.trynum} htmlFor='trynum_4'>4회</label>
					<input type="radio" name="trynum" id='trynum_5over' hidden/>
					<label className = {styles.trynum} htmlFor='trynum_5over'>5회 이상</label>
				</div>
            </div>
            <div className={styles.question}>
                <span className={styles.question_label}>
                    얼마나 공부하셨나요?
                </span>
				<div className= {styles.period}>
					<div>
						<input className = {styles.period_inp} type="number" id="year"/>
						<label className = {styles.period_label} htmlFor="year">년</label>
					</div>
					<div>
						<input className = {styles.period_inp} type="number" id="month"/>
						<label className = {styles.period_label} htmlFor="month">개월</label>
					</div>
					<div>
						<input className = {styles.period_inp} type="number" id="week"/>
						<label className = {styles.period_label} htmlFor="week">주</label>
					</div>
				</div>
            </div>
            <div className = {styles.question}>
                <span className={styles.question_label}>
                    주요 공부 방법은 무엇인가요?
                </span>
				<div>
					<input type="checkbox" name = "method" hidden id="method_1"/>
					<label htmlFor='method_1' className = {styles.method}>기출문제 풀이</label>
					<input type="checkbox" name = "method" hidden id="method_2"/>
					<label htmlFor='method_2' className = {styles.method}>인터넷 강의</label>
					<input type="checkbox" name = "method" hidden id="method_3"/>
					<label htmlFor='method_3' className = {styles.method}>현장 강의</label>
					<input type="checkbox" name = "method" hidden id="method_4"/>
					<label htmlFor='method_4' className = {styles.method}>스터디 모임</label>
				</div>
            </div>
            <div className = {styles.question}>
                <span className={styles.question_label}>
                    사용한 교재는 무엇인가요?
                </span>
                <input type="text" className = {styles.material}/>
            </div>
        </section>
        <button className = {styles.reviewSubmit}>제출하기</button>
        </>
    )
}