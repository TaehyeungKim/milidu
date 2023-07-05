import styles from './index.module.scss'
import { useEffect, useReducer, useRef, useSyncExternalStore} from 'react'
import UnivList from '@/components/UnivList/UnivList';
import BackgroundList from '@/components/UnivList/BackgroundList';
import UnivDetail from '@/components/UnivDetail/UnivDetail';
import escapeRegexp from 'lodash'
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

const patternYield = (character: string) => {
    //한글 유니코드: 초성자음*588 + 중성모음*28 + 종성자음 + '가'.charcode
    const offset = '가'.charCodeAt(0);
    if(/[가-힣]/.test(character)) {
        const code = character.charCodeAt(0) - offset;
        if(code%28 > 0) return code;

        const ptBegin = Math.floor(code/28) * 28 + offset;
        const ptEnd = ptBegin + 27;
        return `[\\u${ptBegin.toString(16)}-\\u${ptEnd.toString(16)}]`;
    }

    if(/[ㄱ-ㅎ]/.test(character)) {
        const formerSyl:{[key: string]: number} = {
            'ㄱ': '가'.charCodeAt(0),
            'ㄲ': '까'.charCodeAt(0),
            'ㄴ': '나'.charCodeAt(0),
            'ㄷ': '다'.charCodeAt(0),
            'ㄸ': '따'.charCodeAt(0),
            'ㄹ': '라'.charCodeAt(0),
            'ㅁ': '마'.charCodeAt(0),
            'ㅂ': '바'.charCodeAt(0),
            'ㅃ': '빠'.charCodeAt(0),
            'ㅅ': '사'.charCodeAt(0),
          };
        
        const begin = formerSyl[character] || ((character.charCodeAt(0) - '사'.charCodeAt(0))*588 + '사'.charCodeAt(0));
        const end = begin + 587;  
        return `[${character}\\u${begin.toString(16)}-\\u${end.toString(16)}]`
    }

    return escapeRegexp(character);
}

const createFuzzyMatcher = (character: string) => {
    const pattern = character.split('').map(patternYield).join('.*?');
    return new RegExp(pattern);
  }


export default function University() {

    

    const data = useSyncExternalStore(subscribe.bind(univDataCollector), getSnapshotOfData.bind(univDataCollector), getSnapshotOfData.bind(univDataCollector))

    useEffect(()=>{
        if(!data) univDataCollector.collectUnivData();
    },[])

    if(!data) return (<Loading/>)    

    // const [univListVisible, setUnivListVisible] = useState<boolean>(false);
    // const showUnivList = () => setUnivListVisible(true)
    const [state, dispatch] = useReducer(reducer, {pageState: 1})
    const inpRef = useRef<HTMLInputElement>(null);
    const showUnivList = () => dispatch({type: "finishedSearchTyping"}) 


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