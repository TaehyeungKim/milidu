import styles from './index.module.scss'
import { useEffect, useReducer, useRef, useSyncExternalStore} from 'react'
import UnivList from '@/components/UnivList/UnivList';
import BackgroundList from '@/components/UnivList/BackgroundList';
import UnivDetail from '@/components/UnivDetail/UnivDetail';

import {subscribe, getSnapshotOfData, univDataCollector} from '@/utils/DataCollector'
import Loading from '@/components/Loading/Loading';

export type univReducerState = {
    pageState: number,
    selected?: HTMLElement 
}

export type univReducerAction = {
    type: string,
    selected?: HTMLElement
}

function reducer(state: univReducerState, action: univReducerAction): univReducerState {
    switch(action.type) {
        case "finishedSearchTyping":
            return {pageState: 2}
        case "selectedUnivFromList":
            return {pageState: 3, selected: action.selected}
        case "showDetailedInfo":
            return {pageState: 4, selected: action.selected}
        default:
            return {pageState: 1}
    }
}




export default function University() {

    

    const data = useSyncExternalStore(subscribe.bind(univDataCollector), getSnapshotOfData.bind(univDataCollector), getSnapshotOfData.bind(univDataCollector))

    const [state, dispatch] = useReducer(reducer, {pageState: 1})
    const inpRef = useRef<HTMLInputElement>(null);
    const showUnivList = () => dispatch({type: "finishedSearchTyping"}) 

    useEffect(()=>{
        if(!data) univDataCollector.collectUnivData();
    },[])

    if(!data) return (<Loading/>)    

    // const [univListVisible, setUnivListVisible] = useState<boolean>(false);
    // const showUnivList = () => setUnivListVisible(true)
   


    return(
        <div className={styles.wrapper}>

        
        <section className={styles.univ_search} id={'searchSection'}>
            <input className = {styles.searchBox} placeholder={"대학교를 입력하세요"} onChange={(e)=>{
                showUnivList()
                const target = e.target as HTMLInputElement;
            }} ref={inpRef}></input>
            {state.pageState === 2 || state.pageState === 3 ? <UnivList dispatch={dispatch} state={state}/>:null}
            {state.pageState >= 3 ? <BackgroundList state={state}/> : null}
            {state.pageState === 4 ? <UnivDetail state={state}/>:null}
        </section>
        </div>
    )
}