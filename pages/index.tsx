import { useEffect } from "react"
import {certDataCollector, univDataCollector} from "@/utils/DataCollector"
import styles from './landing.module.scss'
import { addressCard, graduationCap } from "@/public/icons/icons"
// import {landingImg} from "@/public/icons/icons"
import { ReactSVG } from "react-svg"
import Link from "next/link"

export default function App() {

    useEffect(()=>{
        certDataCollector.collectCertData();
        univDataCollector.collectUnivData();
    },[])

    return(
        <>
        <div className={styles.container}>
        <div className={styles.main_ment}>
                <div className={styles.milidu_ment}><h1 className={styles.milidu_info}>육·해·공 모든 장병에게 전해주는,<br/>당신의 교육을 책임질 밀리듀</h1></div>
				<div className={styles.landingimg}><ReactSVG src={'/univ_landing.svg'}/></div>
				
        </div>

        <div className={styles.item_box}>
            <div className={styles.cert_item}>
				<div className={styles.menubar}>
					<div className={styles.menu}>
						{/* <h1></h1> */}
						{addressCard()}
					</div>
					<div className={styles.menu_name}>
						<h3>자격증</h3>
					</div>
				</div>
                <div className={styles.ment_part}>
                    <p className={styles.ment}>500여 개의 자격증을 분석하여<br/>내게 알맞은 자격증을 찾아보세요!</p>
                </div>
                <Link href='/certification'>
                    <div className={styles.button_div}>
                        <button className={styles.button}>자격증 찾아보기</button>
                    </div>
                </Link>
                <div className={styles.ment_part}>
                    <p className={styles.ment}>자격증별 무료 강의와 도서 추천까지.<br/>합격후기를 통해 전우에게 도움을 줄 수 있어요.</p>
                </div>
            </div>

            <div className={styles.cert_item}>
                <div className={styles.main_img}>
                    <img src={"/cert_info.png"} className={styles.cert_img}/>
                    <div className={styles.sub_img}>
                        <img src={"/cert_list.png"} className={styles.cert_sub_img}/>
                    </div>
                </div>
            </div>
        </div>

        <div className={styles.item_box_two}>
            <div className={styles.cert_item}>
                <div className={styles.main_img}>
                    <img src="/univ_sub.png" className={styles.univ_img}/>
                    <div className={styles.sub_img}>
                        <img src="/univ_main.png" className={styles.univ_sub_img}/>
                    </div>
                </div>
            </div>  
            <div className={styles.cert_item}>
				<div className={styles.menubar}>
					<div className={styles.menu}>
						{graduationCap()}
						{/* <h1></h1> */}
					</div>
					<div className={styles.menu_name}>
						<h3>대학 군 수강</h3>
					</div>
				</div>
                <div className={styles.ment_part}>
                    <p className={styles.ment}>군대에서도 여러분의<br/>학업 공백을 빈틈없이 채워보세요.</p>
                </div>
                <Link href='/university'>
                    <div className={styles.button_div}>
                        <button className={styles.button}>군 수강 알아보기</button>
                    </div>
                </Link>
                <div className={styles.ment_part}>
                    <p className={styles.ment}>각 대학별 강의 정보와 수강 후기를<br/>한눈에 살펴보세요.</p>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}
