'use client';

import Link from 'next/link';
import style from './style.module.scss'
import { useEffect, useSyncExternalStore } from 'react';
import collector, {CertInfo} from '@/utils/DataCollector';


// type CertInfo = {
//     name: string,
//     major: string,
//     period: string,
//     rate: number
// }


// export const getStaticProps: GetStaticProps<{certInfoArr: CertInfo[]}> = async() => {

//     const res = await fetch('https://milidu-backend-zqddn.run.goorm.site/certs')
//     const json = await res.json()
//     console.log(json)


//     // const certInfoArr = [
//     //     {
//     //         name: "컴퓨터활용능력1급",
//     //         major: "IT·컴퓨터",
//     //         period: "3개월",
//     //         rate: 32
//     //     },
//     //     {
//     //         name: "컴퓨터활용능력1급",
//     //         major: "IT·컴퓨터",
//     //         period: "3개월",
//     //         rate: 32
//     //     }, 
//     //     {
//     //         name: "컴퓨터활용능력1급",
//     //         major: "IT·컴퓨터",
//     //         period: "3개월",
//     //         rate: 32
//     //     }, 
//     //     {
//     //         name: "컴퓨터활용능력1급",
//     //         major: "IT·컴퓨터",
//     //         period: "3개월",
//     //         rate: 32
//     //     }, 
//     //     {
//     //         name: "컴퓨터활용능력1급",
//     //         major: "IT·컴퓨터",
//     //         period: "3개월",
//     //         rate: 32
//     //     },
//     //     {
//     //         name: "컴퓨터활용능력1급",
//     //         major: "IT·컴퓨터",
//     //         period: "3개월",
//     //         rate: 32
//     //     },
//     //     {
//     //         name: "컴퓨터활용능력1급",
//     //         major: "IT·컴퓨터",
//     //         period: "3개월",
//     //         rate: 32
//     //     },
//     //     {
//     //         name: "컴퓨터활용능력1급",
//     //         major: "IT·컴퓨터",
//     //         period: "3개월",
//     //         rate: 32
//     //     }
//     // ]


//     // return { props : {certInfoArr} }
//     return { props: {certInfoArr: json}}
// }

export default function Certification() {

    
    const data = useSyncExternalStore(collector.subscribe.bind(collector), collector.getSnapshotOfCertData.bind(collector), collector.getSnapshotOfCertData.bind(collector))

    useEffect(()=>{
        if(!data) collector.collectCertData()
    },[])

    return(
        
        <div className = {style.wrapper}>
            {! data ? <h1>Loading...</h1>
            :
            <>
            <div id = {style.post}>
                <h2>
                    <p id={style.point_1}>자격증의 모든 것,</p>
                    <p id={style.point_2}>당신의 궁금증을 해결하세요.</p>
                </h2>
            </div>
        
            <div id={style.sb}>
                <form>
                    <fieldset>
                        <legend className={style['visually-hidden']}>검색</legend>
                        <div className={style.search_box}>
                            <input type="text" maxLength={255} tabIndex={1} />
                            <button type="submit" tabIndex={2}>
                                검색
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>

            <ul className={style.post_list}>
                {data.map((info: CertInfo, index: number)=>(
                    <li key={index}>
                        <Link href={`/certification/${info.code}`}>
                            <div className={style.list}>
                                <h4 className={style.name}>{info.name}</h4>
                                <div className={style.content}>
                                    <h6>{info.majors}</h6>
                                    <h6>{(info.total_passed/info.total_taken)*100}%</h6>
                                    <h6>{info.total_taken}명</h6>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            
        
		{/* <div className={style.page}>
            <ul className={style.pagenation}>
                <li><a className={style.first}>처음으로</a></li>
                <li><a className={style.arrow_left}>{'<<'}</a></li>
                <li><a className={style.num}>1</a></li>
                <li><a className={style.num}>2</a></li>
                <li><a className={style.num}>3</a></li>
                <li><a className={style.num}>4</a></li>
                <li><a className={style.num}>5</a></li>
                <li><a className={style.num}>6</a></li>
                <li><a className={style.num}>7</a></li>
                <li><a className={style.num}>8</a></li>
                <li><a className={style.num}>9</a></li>
                <li><a className={style.arrow_right}>{'>>'}</a></li>
                <li><a className={style.last}>끝으로</a></li> 
            </ul>
       </div>*/}
       </>
            }
            
        </div>
    )
}