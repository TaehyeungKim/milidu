import styles from './GenderSection.module.scss'
import { RegisterInpProps } from '@/components/SignPageRelated/FloatingInp/FloatingInp'
import { MouseEventHandler, useCallback } from 'react'

export default function GenderSection({dispatch, state}:RegisterInpProps) {

    const genderSelect = useCallback<MouseEventHandler<HTMLLabelElement>>((e)=>{
        const target = e.target as HTMLLabelElement;
        dispatch({field: "gender", status: true, data: target.id, message: "성별 선택 완료"})
    },[])

    return(
        <section className = {styles.genderSelect}>
                <label>성별</label>
                <div className = {styles.container}>
                    <input type="radio" name="gender" id="male" hidden/>
                    <label className = {styles.gender} htmlFor="male" id="남" onClick={genderSelect}>남</label> 
                    <input type="radio" name="gender" id="female" hidden/>
                    <label className = {styles.gender} htmlFor="female" id="여" onClick={genderSelect}>여</label>
                </div>
            </section>
    )
}