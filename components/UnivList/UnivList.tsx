import styles from './UnivList.module.scss'
import { univReducerAction, univReducerState } from '@/pages/university'
import { useRef, useEffect } from 'react'

interface UnivListProps {
    dispatch: (value: univReducerAction)=>void,
    state: univReducerState
}


export default function UnivList({dispatch, state}: UnivListProps) {

    const list = ['서울대학교', '연세대학교', '고려대학교', '가천대학교']
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


    return( 
            <div className = {styles.univ_list} id = {'listContainer'} ref={listContainer}>
                {list.map((elm: string, index: number)=>(
                    <article key={index} className = {styles.univ + ' ' + 'univ'} onClick={(e)=>{
                        e.stopPropagation()
                        dispatch({
                        type: 'selectedUnivFromList',
                        selected: e.currentTarget as HTMLElement})
                        const elm = e.currentTarget as HTMLElement;
                        elm.setAttribute('style', 'opacity: 0')
                        }}>
                        <img className={styles.univ_logo} src={'univlogo/snu.png'}></img>
                        <h6 className = {styles.univ_name}>서울대학교</h6>
                    </article>
                ))}
            </div>
    )
}