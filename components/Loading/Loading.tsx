import styles from './Loading.module.scss';
import { favicion } from '@/public/icons/icons';


export default function Loading() {

    // const ELMREPEAT = 20

    // const fillerGenerator = () => {
    //     return (<div className = {styles.filler_elm}></div>)
    // }

    return(
        <div className = {styles.wrapper}>
            <div className = {styles.container}>
                
                <img className = {styles.loadingbookimg} src='/loading.gif'></img>
                <div className = {styles.loadingSlider}>
                </div>
				<div className= {styles.loadingtext}>
					<h3>
						<span>M</span>
						<span>i</span>
						<span>l</span>
						<span>i</span>
						<span>D</span>
						<span>u</span>
					</h3>
				</div>
            </div>
        </div>
    )
}

// <div className = {styles.filler} style={{gridTemplateColumns: `repeat(${ELMREPEAT},1fr)`}}>
//                         {(()=>{
//                             let arr:any = [];
//                             for(let i = 0; i < ELMREPEAT; i++) arr = [...arr, fillerGenerator()]
//                             return arr;
//                         })()}
//                     </div>