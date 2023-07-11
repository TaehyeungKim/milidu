import {useCallback, useRef, useState, useReducer, useEffect} from 'react'
import styles from './BookSearchPortal.module.scss'
import { CustomButton } from '../Global/CustomButton'
import { FetchBookAPI } from '@/utils/FetchBookAPI'
import { BookInfo } from '@/Interface/interface'
import {closeX} from '@/public/icons/icons'

type BookSearchState = {
    state: string,
    data?: BookInfo[]
}

type BookSearchAction = {
    type: string,
    data?: BookInfo[]
}

const reducer = (state: BookSearchState, action: BookSearchAction ) => {
    switch(action.type) {
        default:
            return {state: 'plain', data: []}
        case "none":
            return {state: 'none', data: [...state.data as BookInfo[]]}
        case "success":
            return {state: "success", data: [...state.data as BookInfo[], ...action.data as BookInfo[]]}
    }
}

const bookInfoArrMap = (data:BookInfo[], select:(book:BookInfo)=>void) => {
    return(
        data.map((data:BookInfo, index:number)=>(
            <li key={index} onClick={()=>select(data)}>
                <div className = {styles.bookName}>
                     {data.title}
                </div>
                <div className = {styles.bookAuthAndPub}>
                    <span>{data.author}</span> / <span>{data.publisher}</span>
                </div>
            </li>
        ))
    )
}

interface BookSearchPortalProps {
    select: (book:BookInfo|null)=>void;
}

export default function BookSearchPortal({select}:BookSearchPortalProps) {

    const inpRef = useRef<HTMLInputElement>(null)
    const searchResultRef = useRef<HTMLElement>(null)
    const [pageNum ,setPageNum] = useState<number>(1);

    const searchBtRef = useRef<HTMLButtonElement>(null)
    



    const [state, dispatch] = useReducer(reducer, {state: 'plain',data: []})


    const fetchBookInfo = useCallback((inp:string)=>{
        if(inp !== "") FetchBookAPI(pageNum, inp, '도서').then((data:BookInfo[]|null)=>{
            if(!data) return dispatch({type: 'none'});
            dispatch({type: "success", data: data})
        })
    }, [pageNum])

    useEffect(()=>{
        searchResultRef.current?.addEventListener('scroll', (e)=>{
            const target = e.currentTarget as HTMLElement
            const ul = target.firstElementChild as HTMLUListElement
            if(target.scrollTop + target.clientHeight >= ul.offsetHeight) setPageNum(page=>page+1)
        })
    },[])

    useEffect(()=>{
        if(pageNum >= 2) fetchBookInfo(inpRef.current?.value as string)
    },[pageNum])


    return(
        <div className = {styles.background}>
            
            <section className = {styles.bookSearchArea}>
                <button className = {styles.close} onClick={()=>select(null)}>{closeX()}</button>
                <header className = {styles.header}>
                    <div className = {styles.search}>
                        <input className = {styles.search_inp} type="text" ref={inpRef} placeholder="책 제목을 입력하세요"></input>
                    </div>
                    <CustomButton className = {styles.bookSearch_bt} onClick={()=>{
                        dispatch({type: 'plain'})
                        fetchBookInfo(inpRef.current?.value as string)}} ref={searchBtRef}>검색</CustomButton>
                </header>
                <main className = {styles.searchResult} ref={searchResultRef}>
                    <ul>
                    {(()=>{
                        switch(state.state) {
                            default:
                                return null
                            case "none":
                                if(state.data.length === 0) return (<li>검색 결과가 없습니다.</li>)
                                return bookInfoArrMap(state.data, select)
                            case "success":
                                return bookInfoArrMap(state.data, select)
                                
                        }
                    })()}
                    </ul>
                </main>
            </section>
        </div>
    )
}