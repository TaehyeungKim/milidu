import styles from './index.module.scss'
import { useReducer } from 'react'
import UnivList from '@/components/UnivList/UnivList';
import BackgroundList from '@/components/UnivList/BackgroundList';
import UnivDetail from '@/components/UnivDetail/UnivDetail';

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

    const [state, dispatch] = useReducer(reducer, {pageState: 1})

 

    // const [univListVisible, setUnivListVisible] = useState<boolean>(false);
    // const showUnivList = () => setUnivListVisible(true)
    const showUnivList = () => dispatch({type: "finishedSearchTyping"}) 

    return(
        <div className={styles.wrapper}>

        
        <section className={styles.univ_search} id={'searchSection'}>
            <input className = {styles.searchBox} placeholder={"대학교를 입력하세요"} onChange={showUnivList}></input>
            {state.pageState === 2 || state.pageState === 3 ? <UnivList dispatch={dispatch} state={state}/>:null}
            {state.pageState >= 3 ? <BackgroundList state={state}/> : null}
            {state.pageState === 4 ? <UnivDetail state={state}/>:null}
        </section>
        </div>
    )
}