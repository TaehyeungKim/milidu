import BirthDateSelect from "./BirthDateSelect"
import styles from './BirthDateSection.module.scss'
import { useEffect, useRef, useReducer, useCallback, MouseEventHandler, Dispatch }  from "react"

import {BirthSelectState, BirthSelectAction} from '@/pages/signup/index'


interface BirthDateSelectionProps {
    state: BirthSelectState,
    dispatch: Dispatch<BirthSelectAction>
}

export default function BirthDateSection({state, dispatch}: BirthDateSelectionProps) {

    const now = new Date()

    
    const SELECTED = '#efefef'


   const dateSelect = useRef<HTMLUListElement>(null)

   const dateEventFunc = useCallback((e:Event)=>{
        const target = e.target as HTMLLIElement;
        const selected = Number(target.getAttribute('value'))
        target.setAttribute('style', `background-color: ${SELECTED}`)
        dispatch({area: 'date', selected: selected})
   },[]) 


    const renderDateSelect = (year:number, month:number)=>{

        const existingDateOptionNum = dateSelect.current?.childElementCount as number;

        const optionGenerator = (v: number) => {
            const option = document.createElement('li');
            option.setAttribute('value', `${v}`)
            option.addEventListener('click', dateEventFunc)
            option.textContent=`${v}`
            return option
        }

        const modifyingOption = (start: number, max: number) => {
            if(start < max) {
                for(let i = start; i < max; i++) dateSelect.current?.appendChild(optionGenerator(i+1));
            }
            else if(start > max) {
                for(let i = start; i > max; i--) dateSelect.current?.removeChild(dateSelect.current?.lastElementChild as HTMLOptionElement);
                
            }
        }


    
        switch(month) {
            case 2:
                if(year%4===0) {
                    if(year%100===0) {
                        if(year%400===0) {
                            console.log(1)
                            return modifyingOption(existingDateOptionNum,29)
                        }
                        console.log(2)
                        return modifyingOption(existingDateOptionNum, 28)
                    }
                    console.log(3)
                    return modifyingOption(existingDateOptionNum, 29)
                } else {
                    console.log(4)
                    return modifyingOption(existingDateOptionNum, 28);
                }
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                modifyingOption(existingDateOptionNum, 31)
                break; 
            default:
                modifyingOption(existingDateOptionNum, 30)    
                
            
        }
    }

    const optionRendering = (min: number, max: number, cur: number, label: string) => {

        const arr = []

        for(let i = min; i <= max; i++) {
            arr.push(
                <li aria-label={label} value={`${i}`} style={i === cur  ? {backgroundColor: `${SELECTED}`}:undefined} onClick={birthSelectFunc}>{i}</li>
            )
        }
        return arr
    }

    const birthSelectFunc = useCallback<MouseEventHandler<HTMLLIElement>>((e)=>{
        const target = e.target as HTMLLIElement
        const selected = Number(target.getAttribute('value'))
        target.setAttribute('style', `background-color: ${SELECTED}`)
        const label = target.ariaLabel as string;
        switch(label) {
            case "year":
                renderDateSelect(target.value, state.month);
                break;
            case "month":
                renderDateSelect(state.month, target.value);
                break;
            case "date":
                renderDateSelect(state.month, state.date);
                break;
            default:
        }
        dispatch({area: target.ariaLabel as string, selected: selected})
   },[state])

   if(!state) return (<></>)

    return(
        <section className = {styles.birthdateWrite}>
                <label>생년월일</label>
                <div className = {styles.container}>
                    <BirthDateSelect curSelect={state.year} label='년'>
                        <ul className = {styles.select_year + ' select_year'} id = "birth_year">
                            {optionRendering(1900, now.getFullYear(), state.year, 'year')}
                        </ul>
                    </BirthDateSelect>
                    <BirthDateSelect curSelect={state.month} label='월'>
                        <ul className = {styles.select_year + ' select_month'} id = "birth_month">
                            {optionRendering(1,12, state.month, 'month')}
                        </ul>
                    </BirthDateSelect>
                    <BirthDateSelect curSelect={state.date} label='일'>
                        <ul className = {styles.select_year + ' select_date'} id="birth_date" ref={dateSelect}>
                            {optionRendering(1,31, state.date, 'date')}
                        </ul>
                    </BirthDateSelect>
                    
                </div>
            </section>
    )
}