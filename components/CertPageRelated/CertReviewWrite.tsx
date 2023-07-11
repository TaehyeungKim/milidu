import styles from './CertReviewWrite.module.scss'
import { useEffect, useRef, useState, useCallback,  useContext, useMemo } from 'react'
import { textAreaResize } from '@/utils/textAreaResize'
import StarRateComponent from '@/components/StarRate/StarRateComponent'
import axios from 'axios'
import {UserContext} from '@/pages/_app'
import {CustomButton} from '@/components/Global/CustomButton'
import {ComponentPortal} from '@/utils/ComponentPortal'
import BookSearchPortal from './BookSearchPortal'
import {BookInfo} from '@/Interface/interface'
import {certReviewDataCollector} from '@/utils/DataCollector'
import {CertDetailPageAction} from '@/pages/certification/[id]'
import {Dispatch} from 'react'
import {SubmitCertReviewData} from '@/Interface/interface'


interface CertReviewWriteProps {
    cert_name: string,
    cert_code: string|number,
    dispatch: Dispatch<CertDetailPageAction>
}

const METHODS = [
    "기출문제 풀이","인터넷 강의","현장 강의","스터디 모임"
]

export default function CertReviewWrite({cert_name, cert_code, dispatch}: CertReviewWriteProps){

    const userContext = useContext(UserContext)

    const textarea = useRef<HTMLTextAreaElement>(null)
    

    const [starRate, setStarRate] = useState<number>(0);
    const [trynum, setTrynum] = useState<number>(0);
    const [methods, setMethods] = useState<Array<string>>([]);

    const [studyYear, setStudyYear] = useState<string>("")
    const [studyMonth, setStudyMonth] = useState<string>("")
    const [studyWeek, setStudyWeek] = useState<string>("")
    const [content, setContent] = useState<string>("");

    const updateStarRate = (rate:number) => setStarRate(rate);
    const updateTrynum = (num:number)=> setTrynum(num)

    const addMethod = (method: string) => setMethods(methods=>[...methods, method]);
    const deleteMethod = (method: string) => setMethods(methods=>methods.filter(m => m !== method));

    const [bookSrchVisible, setBookSrchVisible] = useState<boolean>(false);

    const toggleBookSearch = () => setBookSrchVisible(v=>!v)

    const [selectedBook, setSelectedBook] = useState<BookInfo|null>(null)

    const selectBook = (book: BookInfo|null) => {
        if(!book) return toggleBookSearch()
        setSelectedBook(book)
        toggleBookSearch()
    }

    const reviewSubmitData = useMemo(()=>{
        const data:SubmitCertReviewData = {
            cert_name:  cert_name,
            cert_code: cert_code,
            username: userContext?.user?.username as string,
            time_taken: `${studyYear}년${studyMonth}개월${studyWeek}주`,
            difficulty: starRate,
            recommend_book: JSON.stringify(selectedBook),
            num_attempts: trynum,
            content: content,
            study_method: methods.join(','),
            major: userContext?.user?.major as string,
            sex: userContext?.user?.sex as string,
            birthday: userContext?.user?.birthday as string
        }
        return data
    },[starRate, trynum, selectedBook, studyYear, studyMonth, studyWeek, content])

    const submitReview = useCallback(async(data:SubmitCertReviewData) => {
        if(data.difficulty === 0 
        || data.num_attempts === 0 
        || data.study_method === ""  
        || data.time_taken === "년개월주"
        || data.recommend_book === 'null'
        || data.content === "" ) return 401;
        
        
        const res = await axios.post('/create_cert_review', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return res.status
    },[])

    const [reviewPostingStatus, setReviewPostingStatus] = useState<string>("plain");


    useEffect(()=>{textAreaResize(textarea.current as HTMLTextAreaElement)},[])

    return(
        <>
        <h3 className = {styles.cert}>{cert_name}</h3>
        <section className={styles.text}>
            <textarea className={styles.textarea} placeholder={"자격증 합격 후기를 적어주세요."} onChange={(e)=>setContent(e.target.value)} ref={textarea}></textarea>
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
						<input className = {styles.period_inp} type="number" id="year" onChange={(e)=>setStudyYear(e.target.value)}/>
						<label className = {styles.period_label} htmlFor="year">년</label>
					</div>
					<div>
						<input className = {styles.period_inp} type="number" id="month" onChange={(e)=>setStudyMonth(e.target.value)}/>
						<label className = {styles.period_label} htmlFor="month">개월</label>
					</div>
					<div>
						<input className = {styles.period_inp} type="number" id="week" onChange={(e)=>setStudyWeek(e.target.value)}/>
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
            <div className = {styles.question} id={styles.bookSearch}>
                <div style={{display: 'flex'}}>
                <span className={styles.question_label}>
                    사용한 교재는 무엇인가요?
                </span>
                <CustomButton className={styles.bookSrchBt} onClick={toggleBookSearch}>도서검색</CustomButton>
                </div>
                {selectedBook ? 
                <div className={styles.bookSearchResult}>
                    <div>
                        <span>{selectedBook.title} / {selectedBook.author} / {selectedBook.publisher}</span>
                    </div>
                </div>
                :null}
                
                {bookSrchVisible ? <ComponentPortal component={<BookSearchPortal select={selectBook}/>}/> : null}
            </div>
        </section>
        <button className = {reviewPostingStatus === "posting" ? styles.reviewSubmit + ' ' + styles.posting : styles.reviewSubmit} onClick={()=>{
            setReviewPostingStatus("posting")
            submitReview(reviewSubmitData).then((status: number)=>{
                if(status === 200) {
                    certReviewDataCollector.collectData('/get_cert_review', "POST", 
                    {
                        category: "자격증코드",
                        keyword: `${cert_code}`
                    })
                    .then(()=>
                    dispatch({to: "review"}))
                }
                if(status=== 401) return setReviewPostingStatus("plain")
            })
        }}>{reviewPostingStatus === "posting" ? "제출중..." : "제출하기"}</button>
        </>
    )
}