import styles from './Loading.module.scss';
import { favicion } from '@/public/icons/icons';

export default function Loading() {

    const ELMREPEAT = 20

    const fillerGenerator = () => {
        return (<div className = {styles.filler_elm}></div>)
    }

    return(
        <div className = {styles.wrapper}>
            <div className = {styles.container}>
                <div className = {styles.logo}>
                    {favicion()}
                </div>
                
                <div className = {styles.loadingSlider}>
                    <div className = {styles.filler} style={{gridTemplateColumns: `repeat(${ELMREPEAT},1fr)`}}>
                        {(()=>{
                            let arr:any = [];
                            for(let i = 0; i < ELMREPEAT; i++) arr = [...arr, fillerGenerator()]
                            return arr;
                        })()}
                    </div>
                </div>
                <h3>데이터를 로딩중입니다.</h3>
            </div>
        </div>
    )
}