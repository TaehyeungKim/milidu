import styles from './CertPagination.module.scss'
import {useState, useEffect, useDeferredValue} from 'react';
import {useMediaQuery} from 'react-responsive'
import {arrowRight, arrowLeft} from '@/public/icons/icons'


interface CertPagination {
    pageNum: number,
    flipper: (index:number)=>void;
    curPage: number
}

export default function CertPagination({pageNum, flipper, curPage}:CertPagination) {

    const isSmallSize = useMediaQuery({query: '(max-width: 500px'});
    const deferredMedia = useDeferredValue(isSmallSize)

    let PAGEPERBLOCK = 10;

    if(isSmallSize) PAGEPERBLOCK = 5;

    const [pageBlockIndex, setPageBlockIndex] = useState<number>(0);

    const toPrevBlock = () => {
        if(pageBlockIndex >  0) setPageBlockIndex(block=>block-1)
    }
    const toNextBlock = () => {
        if(pageBlockIndex < pageNum/10 - 1) setPageBlockIndex(block=>block+1)
    }

    const liGenerator = (index: number) => {
        return (<li className = {styles.container} value={index} key={index}>
                    <input type="radio" hidden name="index" id={`page_${index}`} onChange={(e)=>{
                        if(e.currentTarget.checked) flipper(index-1)}}/>
                    <label htmlFor={`page_${index}`} className={styles.index}>{index}</label>
               </li>)
    }


    useEffect(()=>{
        if(isSmallSize === deferredMedia) {
            document.getElementById(`page_${pageBlockIndex*PAGEPERBLOCK+1}`)?.setAttribute('checked', 'true')
            flipper(pageBlockIndex*PAGEPERBLOCK)
        }
        else document.getElementById(`page_${curPage+1}`)?.setAttribute('checked', 'true')
        
        
        return(()=>document.getElementById('pageBlank')?.setAttribute('checked', 'true'))
    },[pageBlockIndex])

    useEffect(()=>{
        setPageBlockIndex(Math.floor(curPage/PAGEPERBLOCK))
    },[isSmallSize])

    return(
        <div className={styles.pagination}>
            <ul className = {styles.paginationList}>
                <li className ={styles.container} onClick={toPrevBlock}>{arrowLeft()}</li>
                {(()=>{
                    let arr:any = []
                    for(let i = pageBlockIndex*PAGEPERBLOCK + 1; i <= (pageBlockIndex+1)*PAGEPERBLOCK
                    ; i++) {
                        if(i > pageNum) break;
                        arr = [...arr, liGenerator(i)];
                    }
                    return arr
                })()}
                <li className = {styles.container} onClick={toNextBlock}>{arrowRight()}</li>
                <input type='radio' name='index' hidden id='pageBlank'/>
            </ul>
        </div>
    )
}