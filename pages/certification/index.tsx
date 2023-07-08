'use client';

import Link from 'next/link';
import style from './style.module.scss'
import { useEffect, useSyncExternalStore, useState, useMemo, useCallback } from 'react';
import {certDataCollector, CertInfo, getSnapshotOfData, subscribe} from '@/utils/DataCollector';
import Loading from '@/components/Loading/Loading';
import CertPagination from '@/components/CertPageRelated/CertPagination';
import { createFuzzyMatcher } from '@/utils/FuzzyMatcher';

const ROWPERPAGE = 10

const renderPagination = (data:CertInfo[]|null, flipper: (index:number)=>void, curPage:number, searchedData:CertInfo[]|undefined) => {

    if(searchedData) return(<CertPagination pageNum={(searchedData.length/ROWPERPAGE)+1} flipper={flipper} curPage={curPage}/>)

    if(data) return(<CertPagination pageNum={(data.length/ROWPERPAGE)+1} flipper={flipper} curPage={curPage}/>)
}


export default function Certification() {

    
    const data = useSyncExternalStore(subscribe.bind(certDataCollector), getSnapshotOfData.bind(certDataCollector), getSnapshotOfData.bind(certDataCollector)) as CertInfo[]


    const [pageIndex, setPageIndex] = useState<number>(0);

    const flipPage = (index:number) => setPageIndex(index);

    const [searchInput, setSearchInput] = useState<string>("");
    const updateSearchInput = (inp: string) => setSearchInput(inp)
    const filterWithInputChange = useCallback(()=>{
        if(searchInput !== "") {
            const filtered = data?.filter((data:CertInfo)=> createFuzzyMatcher(searchInput).test(data.name))
            
            return filtered
        }
        return data as CertInfo[]
    },[searchInput, pageIndex, data])

    const searchedData = useMemo(()=>filterWithInputChange(),[searchInput, data])
    
    


    const Pagination = useMemo(()=>renderPagination(data, flipPage, pageIndex, searchedData),[data, searchedData])
    
    // const [shownData, setShownData] = useState<Array<CertInfo>|null>(null)
    const shownData = useMemo(()=>{
        // if(searchInput === "") return data?.filter((data: CertInfo, index: number)=> index >= pageIndex*10 && index < (pageIndex+1)*10)
        // return searchedData?.filter((data: CertInfo, index: number)=> index >= pageIndex*10 && index < (pageIndex+1)*10)
        return searchedData?.filter((data: CertInfo, index: number)=> index >= pageIndex*10 && index < (pageIndex+1)*10)
    },[pageIndex, data, searchInput])
    

    

    useEffect(()=>{
        if(!data) certDataCollector.collectCertData()
    },[])

    useEffect(()=>{
        flipPage(0);
    },[searchedData])

    useEffect(()=>{
        console.log(pageIndex)
    },[pageIndex])

    if(!data) return (<Loading/>)

    
    certDataCollector.dataOnRange = shownData as CertInfo[];
    

    return(
        
        <div className = {style.wrapper}>
            <div id = {style.post}>
                <h2>
                    <p id={style.point_1}>자격증의 모든 것,</p>
                    <p id={style.point_2}>당신의 궁금증을 해결하세요.</p>
                </h2>
            </div>
        
            <div id={style.sb}>
                   
                <div className={style.search_box}>
                    <input type="text" maxLength={255} tabIndex={1} onChange={(e)=>{
                        const target = e.target as HTMLInputElement;
                        const specialCharPatt =  /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g
                        if(specialCharPatt.test(target.value)) {
                            target.value = ""
                        return ;
                        }
                        updateSearchInput(target.value)
                    }} />
                    <button type="submit" tabIndex={2}>
                        검색
                    </button>
                </div>
                
            </div>

            <ul className={style.post_list}>
                {shownData?.map((info: CertInfo)=>(
                    <li key={info.id}>
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
            {Pagination}
            
        </div>
    )
}