import styles from './CertReviewWrite.module.scss'
import { useEffect, useRef, useState, useCallback } from 'react'
import { textAreaResize } from '@/utils/textAreaResize'
import StarRateComponent from '@/components/StarRate/StarRateComponent'
import axios from 'axios'


interface CertReviewWriteProps {
    cert_name: string,
    cert_code: string|number
}

const METHODS = [
    "기출문제 풀이","인터넷 강의","현장 강의","스터디 모임"
]

export default function CertReviewWrite({cert_name, cert_code}: CertReviewWriteProps){

    const textarea = useRef<HTMLTextAreaElement>(null)
    const [studyYear, studyMonth, studyWeek] = [useRef<HTMLInputElement>(null),useRef<HTMLInputElement>(null),useRef<HTMLInputElement>(null)]
    const bookRef = useRef<HTMLInputElement>(null);

    const [starRate, setStarRate] = useState<number>(0);
    const [trynum, setTrynum] = useState<number>(0);
    const [methods, setMethods] = useState<Array<string>>([]);

    const updateStarRate = (rate:number) => setStarRate(rate);
    const updateTrynum = (num:number)=> setTrynum(num)

    const addMethod = (method: string) => setMethods(methods=>[...methods, method]);
    const deleteMethod = (method: string) => setMethods(methods=>methods.filter(m => m !== method));

    const submitReview = useCallback(async() => {

        if(starRate === 0 
        || trynum === 0 
        || methods.length === 0 
        || bookRef.current?.value === (undefined||"") 
        || studyMonth.current?.value === (undefined||"") 
        || studyYear.current?.value === (undefined||"") 
        || studyWeek.current?.value === (undefined||"") ) return ;

        const data = {
            cert_name:  cert_name,
            cert_code: cert_code,
            username: 'taehyeungkim98',
            time_taken: `${studyYear.current?.value}년${studyMonth.current?.value}개월${studyMonth.current?.value}주`,
            difficulty: starRate,
            recommend_book: bookRef.current?.value,
            num_attempts: trynum,
            content: textarea.current?.value,
            study_method: methods.join(',')
        }
        
        
        console.log(data)
        await axios.post('/create_cert_review', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log('posted')

    },[starRate, trynum, methods])



    useEffect(()=>{textAreaResize(textarea.current as HTMLTextAreaElement)},[])

    return(
        <>
        <h3 className = {styles.cert}>{cert_name}</h3>
        <section className={styles.text}>
            <textarea className={styles.textarea} placeholder={"자격증 합격 후기를 적어주세요."} ref={textarea}></textarea>
        </section>
        <section className = {styles.questionaire}>
            <div className={styles.question}>
                <span className={styles.question_label}>
                    체감 난이도는 어느정도인가요?
                </span>
                <div className = {styles.star_inline}>
                    <StarRateComponent size={30} disabled={false} updater={updateStarRate}/>
                </div>
            </div>
            <div className={styles.question}>
                <span className={styles.question_label}>
                    몇 회만에 합격하셨나요?
                </span>
				<div>
                    {(()=>{
                        let arr:any = [];
                        for(let i = 1; i <= 5; i++) arr = [...arr,
                        <> 
                        <input key={`trynum_${i}_inp`} type="radio" name="trynum" id={`trynum_${i}`} hidden onChange={()=>updateTrynum(i)}></input>
                        <label key={`trynum_${i}_lab`} className = {styles.trynum} htmlFor={`trynum_${i}`}>{i === 5 ? '5회 이상': `${i}회`}</label>
                        </>
                        ]
                        return arr
                    })()}
				</div>
            </div>
            <div className={styles.question}>
                <span className={styles.question_label}>
                    얼마나 공부하셨나요?
                </span>
				<div className= {styles.period}>
					<div>
						<input className = {styles.period_inp} type="number" id="year" ref={studyYear}/>
						<label className = {styles.period_label} htmlFor="year">년</label>
					</div>
					<div>
						<input className = {styles.period_inp} type="number" id="month" ref={studyMonth}/>
						<label className = {styles.period_label} htmlFor="month">개월</label>
					</div>
					<div>
						<input className = {styles.period_inp} type="number" id="week" ref={studyWeek}/>
						<label className = {styles.period_label} htmlFor="week">주</label>
					</div>
				</div>
            </div>
            <div className = {styles.question}>
                <span className={styles.question_label}>
                    주요 공부 방법은 무엇인가요?
                </span>
				<div>
                    {METHODS.map((method: string, index:number)=>(
                        <>  
                        <input type="checkbox" name="method" hidden id={`method_${index}`} key={`method_inp_${index}`} onChange={(e)=>{
                            const target = e.target as HTMLInputElement;
                            if(target.checked) addMethod(method);
                            else deleteMethod(method)
                        }}></input>
                        <label htmlFor={`method_${index}`} className = {styles.method}>{method}</label>
                        </>
                    ))}
				</div>
            </div>
            <div className = {styles.question}>
                <span className={styles.question_label}>
                    사용한 교재는 무엇인가요?
                </span>
                <input type="text" className = {styles.material} ref={bookRef}/>
            </div>
        </section>
        <button className = {styles.reviewSubmit} onClick={submitReview}>제출하기</button>
        </>
    )
}