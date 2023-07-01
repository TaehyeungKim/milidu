import Layout from "@/components/SignPageRelated/Layout/Layout"
import { useEffect, useRef } from "react"
import { Floating_RegisterId, Floating_RegisterPw, Floating_RegisterMajor } from "@/components/SignPageRelated/FloatingInp/FloatingInp"
import styles from './index.module.scss'


const optionRendering = (min: number, max: number) => {

    const arr = []
                        
    for(let i = min; i <= max; i++) {
        arr.push(
            <option value={`${i}`}>{i}</option>
        )
    }
    return arr
}



export default function Signup() {

   const dateSelect = useRef<HTMLSelectElement>(null)

    
   const now = new Date();

   const renderDateSelect = ()=>{
    const month = (document.getElementById('birth_month') as HTMLSelectElement).value
    const existingDateOptionNum = dateSelect.current?.childElementCount as number;

    const optionGenerator = (v: number) => {
        const option = document.createElement('option');
        option.setAttribute('value', `${v}`)
        option.textContent=`${v}`
        return option
    }

    const modifyingOption = (start: number, max: number) => {
        if(start < max) {
            for(let i = start; i < max; i++) dateSelect.current?.appendChild(optionGenerator(i+1));
        }
        else if(start > max) {
            for(let i = start; i > max; i--) {
                console.log(dateSelect.current?.lastElementChild);
                dateSelect.current?.removeChild(dateSelect.current?.lastElementChild as HTMLOptionElement);
            }
        }
    }

    const selectedYear = Number((document.getElementById('birth_year') as HTMLSelectElement).value);
    
    switch(month) {
        case '2':
            if(selectedYear%4===0) {
                if(selectedYear%100===0) {
                    if(selectedYear%400===0) {
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
        case '1':
        case '3':
        case '5':
        case '7':
        case '8':
        case '10':
        case '12':
            modifyingOption(existingDateOptionNum, 31)
            break; 
        default:
            modifyingOption(existingDateOptionNum, 30)    
            
        
    }
}


   useEffect(()=>{
        document.getElementById('birth_month')?.addEventListener('change', renderDateSelect)
        document.getElementById('birth_year')?.addEventListener('change', renderDateSelect)
   },[])

    return(
        
        <Layout>
            <Floating_RegisterId/>
            <Floating_RegisterPw/>
            <Floating_RegisterMajor/>
            <section className = {styles.genderSelect}>
                <label>성별</label>
                <div className = {styles.container}>
                    <input type="radio" name="gender" id="male" hidden/>
                    <label className = {styles.gender} htmlFor="male">남</label> 
                    <input type="radio" name="gender" id="female" hidden/>
                    <label className = {styles.gender} htmlFor="female">여</label>
                </div>
            </section>
            <section className = {styles.birthdateWrite}>
                <label>생년월일</label>
                <div className = {styles.container}>
                    <select name="birth_year" id="birth_year">
                        {optionRendering(1900, now.getFullYear())}
                    </select>
                    <label className = {styles.birthdate} htmlFor='birth_year'>년</label>
                    <select name="birth_month" id="birth_month">
                        {optionRendering(1,12)}
                    </select>
                    <label className = {styles.birthdate} htmlFor='birth_month'>월</label>
                    <select name="birth_date" id="birth_date" ref={dateSelect}>
                        {optionRendering(1,31)}
                    </select>
                    <label className = {styles.birthdate} htmlFor='birth_date'>일</label>
                    

                </div>
            </section>
        </Layout>        
    )
}