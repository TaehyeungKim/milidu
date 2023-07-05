'use client';

import Link from 'next/link';
import style from './style.module.scss'
import { useEffect, useSyncExternalStore, useState } from 'react';
import collector, {CertInfo, getSnapshotOfCertData, subscribe} from '@/utils/DataCollector';
import Loading from '@/components/Loading/Loading';
import CertPagination from '@/components/CertPageRelated/CertPagination';


export default function Certification() {

    
    const data = useSyncExternalStore(subscribe.bind(collector), getSnapshotOfCertData.bind(collector), getSnapshotOfCertData.bind(collector))
    const [pageIndex, setPageIndex] = useState<number>(0);

    const flipPage = (index:number) => setPageIndex(index);
    

    useEffect(()=>{
        if(!data) collector.collectCertData()
    },[])

    if(!data) return (<Loading/>)

    const shownData = data?.filter((data: CertInfo, index: number)=> index >= pageIndex*10 && index < (pageIndex+1)*10)
    collector.dataOnRange = shownData;
    

    return(
        
        <div className = {style.wrapper}>
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
                {shownData.map((info: CertInfo, index: number)=>(
                    <li key={index}>
                        <Link href={`/certification/${info.code}`}>
                            <div className={style.list}>
                                <h4 className={style.name}>{info.name}</h4>
                                <div className={style.content}>
                                    <h6>{info.majors}</h6>
                                    <h6>{((info.total_passed/info.total_taken)*100).toFixed(2)}%</h6>
                                    <h6>{info.total_taken}명</h6>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        <CertPagination pageNum={(data.length/10)+1} flipper={flipPage} curPage={pageIndex}/>
            
        </div>
    )
}