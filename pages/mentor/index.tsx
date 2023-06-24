import styles from './index.module.scss'
import MentorSearch from '@/components/MentorSearch/MentorSearch'
import MentorList from '@/components/MentorList/MentorList'


export default function Mentor() {

    
    
    return(
        <div className = {styles.wrapper}>
            <MentorSearch/>
            <MentorList/>
        </div>
    )
}