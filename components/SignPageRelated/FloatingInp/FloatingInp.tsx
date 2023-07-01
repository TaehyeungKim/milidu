import styles from './FloatingInp.module.scss'

function FloatingId() {
    return(
        <div className = {styles.floating}>
            <input type="text" id="userId" required></input >
            <label className = {styles.floatingLb} htmlFor='userId'>아이디를 입력해주세요</label>
        </div>
    )
}

function FloatingPw() {
    return(
        <div className = {styles.floating}>
            <input type="password" id="userPW" required></input>
            <label className = {styles.floatingLb} htmlFor='userPW'>비밀번호를 입력해주세요</label>
        </div>
    )
}

function Floating_RegisterId() {
    return(
        <section>
        <label htmlFor='reg_userId'>아이디</label>
        <div className = {styles.floating}>    
            <input type="text" id="reg_userId" required></input>
            <label className = {styles.floatingLb} htmlFor='reg_userId'>ID</label>
        </div>
        <div className = {styles.verify}>
            <button className = {styles.verifyBt}>중복확인</button>
            <span className = {styles.verifyRes}>사용할 수 있는 아이디입니다.</span>
        </div>
        </section>
    )
}

function Floating_RegisterPw() {
    return(
        <section>
        <label htmlFor='reg_userId'>비밀번호</label>
        <div className = {styles.floating}>    
            <input type="text" id="reg_userPw" required></input>
            <label className = {styles.floatingLb} htmlFor='reg_userPw'>Password</label>
        </div>
        <div className = {styles.verify}>
            <span className={styles.verifyRes}>사용할 수 있는 비밀번호입니다.</span>
        </div>
        </section>
    )
}

function Floating_RegisterMajor() {
    return(
        <section>
        <label htmlFor='reg_userMj'>전공</label>
        <div className = {styles.floating}>    
            <input type="text" id="reg_userMj" required></input>
            <label className = {styles.floatingLb} htmlFor='reg_userPw'>Major</label>
        </div>
        </section>
    )
}

export {FloatingId, FloatingPw, Floating_RegisterId, Floating_RegisterPw, Floating_RegisterMajor}