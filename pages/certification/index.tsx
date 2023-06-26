import style from './style.module.scss'

export default function Certification() {
    return(
        <div className = {style.wrapper}>
            <div id = {style.post}>
                <h2>
                    <p id={style.point_1}>자격증의 모든 것,</p>
                    <p id={style.point_2}>당신의 궁금증을 해결하세요.</p>
                </h2>
            </div>
        
        <div id={style.sb}>
            <form>
                <fieldset>
                    <legend className={style['visually-hidden']}>검색</legend>
                    <div className={style.search_box}>
                        <input type="text" maxLength={255} tabIndex={1} />
                        <button type="submit" tabIndex={2}>
                            검색
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>

        <ul className={style.post_list}>
            <li>
                <div className={style.list}>
                    <h4 className={style.name}>컴퓨터활용능력 1급</h4>
                    <div className={style.content}>
                        <h6>IT·컴퓨터</h6>
                        <h6>3개월</h6>
                        <h6>32%</h6>
                    </div>
                </div>
            </li>
            <li>
                <div className={style.list}>
                    <h4 className={style.name}>자격증명</h4>
                    <div className={style.content}>
                        <h6>전공명</h6>
                        <h6>소요기간</h6>
                        <h6>최종합격률</h6>
                    </div>
                </div>
            </li>
            <li>
                <div className={style.list}>
                    <h4 className={style.name}>자격증명</h4>
                    <div className={style.content}>
                        <h6>전공명</h6>
                        <h6>소요기간</h6>
                        <h6>최종합격률</h6>
                    </div>
                </div>
            </li>
            <li>
                <div className={style.list}>
                    <h4 className={style.name}>자격증명</h4>
                    <div className={style.content}>
                        <h6>전공명</h6>
                        <h6>소요기간</h6>
                        <h6>최종합격률</h6>
                    </div>
                </div>
            </li>
            <li>
                <div className={style.list}>
                    <h4 className={style.name}>자격증명</h4>
                    <div className={style.content}>
                        <h6>전공명</h6>
                        <h6>소요기간</h6>
                        <h6>최종합격률</h6>
                    </div>
                </div>
            </li>
            <li>
                <div className={style.list}>
                    <h4 className={style.name}>자격증명</h4>
                    <div className={style.content}>
                        <h6>전공명</h6>
                        <h6>소요기간</h6>
                        <h6>최종합격률</h6>
                    </div>
                </div>
            </li>
            <li>
                <div className={style.list}>
                    <h4 className={style.name}>자격증명</h4>
                    <div className={style.content}>
                        <h6>전공명</h6>
                        <h6>소요기간</h6>
                        <h6>최종합격률</h6>
                    </div>
                </div>
            </li>
            <li>
                <div className={style.list}>
                    <h4 className={style.name}>자격증명</h4>
                    <div className={style.content}>
                        <h6>전공명</h6>
                        <h6>소요기간</h6>
                        <h6>최종합격률</h6>
                    </div>
                </div>
            </li>
        </ul>
        
       <div className={style.page}>
            <ul className={style.pagenation}>
                <li><a className={style.first}>처음으로</a></li>
                <li><a className={style.arrow_left}>{'<<'}</a></li>
                <li><a className={style.num}>1</a></li>
                <li><a className={style.num}>2</a></li>
                <li><a className={style.num}>3</a></li>
                <li><a className={style.num}>4</a></li>
                <li><a className={style.num}>5</a></li>
                <li><a className={style.num}>6</a></li>
                <li><a className={style.num}>7</a></li>
                <li><a className={style.num}>8</a></li>
                <li><a className={style.num}>9</a></li>
                <li><a className={style.arrow_right}>{'>>'}</a></li>
                <li><a className={style.last}>끝으로</a></li> 
            </ul>
       </div>
        </div>
    )
}