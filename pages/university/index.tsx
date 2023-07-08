import styles from './index.module.scss'
import { useEffect, useReducer, useRef, useSyncExternalStore, useState, useMemo} from 'react'
import UnivList from '@/components/UnivList/UnivList';
import BackgroundList from '@/components/UnivList/BackgroundList';
import UnivDetail from '@/components/UnivDetail/UnivDetail';

import {subscribe, getSnapshotOfData, univDataCollector, UnivObject} from '@/utils/DataCollector'
import Loading from '@/components/Loading/Loading';
import { createFuzzyMatcher } from '@/utils/FuzzyMatcher';
import { addressCard, graduationCap } from "@/public/icons/icons"


export type univReducerState = {
    pageState: number,
    selected?: HTMLElement ,
    univName?: string
}

export type univReducerAction = {
    type: string,
    selected?: HTMLElement,
    univName?: string
}

function reducer(state: univReducerState, action: univReducerAction): univReducerState {
    switch(action.type) {
        case "finishedSearchTyping":
            return {pageState: 2}
        case "selectedUnivFromList":
            return {pageState: 3, selected: action.selected, univName: action.univName}
        case "showDetailedInfo":
            return {...state, pageState: 4, selected: action.selected}
        default:
            return {pageState: 1}
    }
}




export default function University() {

    

    const data = useSyncExternalStore(subscribe.bind(univDataCollector), getSnapshotOfData.bind(univDataCollector), getSnapshotOfData.bind(univDataCollector)) as UnivObject[]

    const [searchInp, setSearchInp] = useState<string>("");

    const updateSearchInp = (inp: string) => setSearchInp(inp)

    const filteredUnivList = useMemo(()=>data?.filter((data:UnivObject)=>createFuzzyMatcher(searchInp).test(data.school_name)),[searchInp, data])

    const [state, dispatch] = useReducer(reducer, {pageState: 1})
    const inpRef = useRef<HTMLInputElement>(null);
    const showUnivList = () => dispatch({type: "finishedSearchTyping"}) 

    useEffect(()=>{
        if(!data) univDataCollector.collectUnivData();
    },[])

    if(!data) return (<Loading/>)    


   


    return(
        <div className={styles.wrapper}>

        <section className={styles.univ_list_ment}>
			<div className={styles.menubar}>
				<div className={styles.menu}>
					{graduationCap()}
					{/* <h1></h1> */}
				</div>
				<div className={styles.menu_name}>
					<h3>대학 군 수강</h3>
				</div>
			</div>
			<div className={styles.list_welcome}>
				<h3 className={styles.ment}>기회는 일어나는 것이 아닌, 만들어내는 것이다.</h3>
				<h4>-크리스 크로서</h4>
			</div>
		</section>
        <section className={styles.univ_search} id={'searchSection'}>
            <input className = {styles.searchBox} placeholder={"대학교를 입력하세요"} onChange={(e)=>{
                showUnivList()
                
                const target = e.target as HTMLInputElement;
                const specialCharPatt =  /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g
                if(specialCharPatt.test(target.value)) {
                    target.value = ""
                    return ;
                }
                updateSearchInp(target.value)
            }} ref={inpRef}></input>
            {state.pageState === 2 || state.pageState === 3 ? <UnivList dispatch={dispatch} state={state} data={searchInp === "" ? data : filteredUnivList}/>:null}
            {state.pageState >= 3 ? <BackgroundList state={state}/> : null}
            {state.pageState === 4 ? <UnivDetail state={state}/>:null}
        </section>
        </div>
    )
}