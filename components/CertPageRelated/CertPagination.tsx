import styles from './CertPagination.module.scss'
import {useState, useEffect} from 'react';

interface CertPagination {
    pageNum: number,
    flipper: (index:number)=>void;
}

export default function CertPagination({pageNum, flipper}:CertPagination) {

    const [pageBlockIndex, setPageBlockIndex] = useState<number>(0);

    const toPrevBlock = () => {
        if(pageBlockIndex >  0) setPageBlockIndex(page=>page-1)
    }
    const toNextBlock = () => {
        if(pageBlockIndex < pageNum/10-1) setPageBlockIndex(page=>page+1)
    }

    const liGenerator = (index: number) => {
        return (<li className = {styles.container} value={index} key={index}>
                    <input type="radio" hidden name="index" id={`page_${index}`} onChange={(e)=>{
                        if(e.currentTarget.checked) flipper(index-1)}}/>
                    <label htmlFor={`page_${index}`} className={styles.index}>{index}</label>
               </li>)
    }

    useEffect(()=>{
        document.getElementById(`page_${pageBlockIndex*10+1}`)?.setAttribute('checked', 'true')
        flipper(pageBlockIndex*10)
        return(()=>document.getElementById('pageBlank')?.setAttribute('checked', 'true'))
    },[pageBlockIndex])

    return(
        <div className={styles.pagination}>
            <ul className = {styles.paginationList}>
                <li className ={styles.container} onClick={toPrevBlock}>{'<<'}</li>
                {(()=>{
                    let arr:any = []
                    for(let i = pageBlockIndex*10 + 1; i <= (pageBlockIndex+1)*10; i++) {
                        if(i > pageNum) break;
                        arr = [...arr, liGenerator(i)];
                    }
                    return arr
                })()}
                <li className = {styles.container} onClick={toNextBlock}>{'>>'}</li>
                <input type='radio' name='index' hidden id='pageBlank'/>
            </ul>
        </div>
    )
}