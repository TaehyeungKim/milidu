import styles from './index.module.scss'

export default function Login() {
    return(
        <div className={styles.wrapper}>
            <section className={styles.signin}>
                <header className = {styles.logo}>
                    <img src='/milidu_logo.png'/>
                </header>
                <input type="text" id="userId" placeholder='아이디'></input>
                {/* <label htmlFor='userId'>아이디</label> */}
                <input type="password" id="userPW" placeholder='비밀번호'></input>
            </section>
        </div>
    )
}