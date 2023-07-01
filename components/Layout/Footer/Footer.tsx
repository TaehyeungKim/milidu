import styles from './Footer.module.scss'

export default function Footer() {
    return (
        <footer className = {styles.footer}>
            <div className = {styles.container}>
                <ul className={styles.footer_one}>
                    <li><h5>서비스</h5></li>
                    <li>자격증</li>
                    <li>대학 군 수강</li>
                </ul>

                <ul className={styles.footer_one}>
                    <li><h5>개발자</h5></li>
                    <li>김태형 <span>(프론트엔드 리드)</span></li>
                    <li>이시윤 <span>(프론트엔드)</span></li>
                    <li>이승훈 <span>(백엔드 리드)</span></li>
                    <li>박종선 <span>(백엔드)</span></li>
                </ul>

                <ul className={styles.footer_one}>
                    <li><h5>대표자</h5></li>
                    <li>팀장 김태형</li>
                    <li>kth1837@snu.ac.kr</li>
                    <li>010-8890-1837</li>
				</ul>
            </div>
            
            <div className = {styles.copyrights}><h5 className = {styles.copyrights_ment}>2023 Mr.Impenetrable Defense. <span>All Rights Reserved.</span></h5></div>
        </footer>
        
        
    
    
    )
}