import styles from './MentorList.module.scss'

type MentorRoom = {
    name: string,
    cert: string[],
    mentee: number,
    img: string
}

const mentorRommArr: MentorRoom[] = [
    {
        name: '우리들의블루스',
        cert: ['정보처리기사'],
        mentee: 320000,
        img: "https://i.namu.wiki/i/YwvKoJGvapD0l5Tg7zeWwSZza79XLp_C_1O2SIGZgqQcAovGGdD-ohyGs_Vx01infaOZHf7FBXYdWy5tVBaQwg.webp"
    },
    {
        name: '갯마을차차차',
        cert: ['워드프로세서1급'],
        mentee: 270000,
        img: "https://i.namu.wiki/i/NQH5X4Er5Zqfexpi6n6LJ4otKT7Oa8TG5gREXFa8_HfL17gKEfwZRrPJvJZbvCrmUQ9hKFRmdSbVcs8dt2w82g.webp"
    },
    {
        name: '미스터션샤인',
        cert: ['게임프로그래밍전문가'],
        mentee: 420000,
        img: "https://i.namu.wiki/i/cFOK7jxWuR9su4dA-VC-TeTqcnNhXUwZf-CTvNa0PLPfNxnu-xMq6P5aq_Rl6z1YarYqssnQznQtF9rwvFAIZg.webp"
    },
    {
        name: '하트시그널4',
        cert: ['비서1급'],
        mentee: 50000,
        img: "https://i.namu.wiki/i/7CVtyT-O9e6XVrj3RVawMkH_0PC3PHiNBrJefb-gzKayVpV-KDlfyhq-d60jj4jw3nnljgqDAn44JovGWllkRg.webp"
    },
    {
        name: '혜미리예채파',
        cert: ['채원탐구1급'],
        mentee: 7000000,
        img: "https://i.namu.wiki/i/2Usvfh8MVU_VEHYPeBYbVVl2wROnutf5rYCnt3pYmGiAVJyu5tN3eFuz2pECKPpPZ4z5FAGECFDUpFUna0PSlg.webp"
    },
]

export default function MentorList() {
    return(
        <section className = {styles.mentorList_wrapper}>
        <header className = {styles.sectionName}>멘토방 목록</header>
        <div className = {styles.mentorList}>
            {mentorRommArr.map((room: MentorRoom, index: number)=>(
                <article className = {styles.mentorRoom} key={index}>
                    <figure className = {styles.mentor_thumb}>
                        <img style={{backgroundImage: `url(${room.img})`}}/>
                    </figure>
                    <div className = {styles.mentor_info}>
                        <span><mark>{room.name}</mark></span>
                        <span>{room.cert.map((cert: string)=>cert)}</span>
                        <span>{room.mentee}명</span>
                    </div>
                </article>
            ))}
            
        </div>
        </section>
    )
}