import styles from './UnivList.module.scss'
import { univReducerAction, univReducerState } from '@/pages/university'
import { useRef, useEffect, useSyncExternalStore } from 'react'
import {UnivObject} from '@/utils/DataCollector'
import Loading from '../Loading/Loading'
import { UnivLogoMap } from '@/utils/UnivLogoMap';



interface UnivListProps {
    dispatch: (value: univReducerAction)=>void,
    state: univReducerState,
    data: UnivObject[]
}



export default function UnivList({dispatch, state, data}: UnivListProps) {

    // const list = ['서울대학교', '연세대학교', '고려대학교', '가천대학교']
    

    const listContainer = useRef<HTMLDivElement>(null)


    useEffect(()=>{
        if(state.pageState === 3) {
            listContainer.current?.classList.add(styles['univ_list--transition'])
        }
        return(()=>{listContainer.current?.classList.remove(styles['univ_list--transition'])})
    },[state.pageState])



    useEffect(()=>{
        const changeToPageState4 = () => dispatch({type: "showDetailedInfo", selected: state.selected})
        listContainer.current?.addEventListener('transitionend', changeToPageState4 )
    },[])

    if(!data) return (<Loading/>)


    return( 
            <div className = {styles.univ_list} id = {'listContainer'} ref={listContainer}>
                {data.map((elm: UnivObject, index: number)=>(
                    <article key={elm.school_id} className = {styles.univ + ' ' + 'univ'} onClick={(e)=>{
                        e.stopPropagation()
                        dispatch({
                        type: 'selectedUnivFromList',
                        selected: e.currentTarget as HTMLElement,
                        univName: elm.school_name})
                        const elmement = e.currentTarget as HTMLElement;
                        elmement.setAttribute('style', 'opacity: 0')

                        }}>
                        <img className={styles.univ_logo} src={UnivLogoMap[elm.school_name] ? `/univlogo/${UnivLogoMap[elm.school_name]}` : `/univlogo/${UnivLogoMap["서울대학교"]}`}></img>
                        <h6 className = {styles.univ_name}>{elm.school_name}</h6>
                    </article>
                ))}
            </div>
    )
}