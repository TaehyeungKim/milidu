import axios from "axios"


const ageCalculator = (year: number, month:number, day:number) => {
    const now = new Date();
    const [nyear, nmonth, nday] = [now.getFullYear(), now.getMonth()+1, now.getUTCDate()]
    if(nmonth > month || (nmonth === month) && nday > day) return (nyear - year).toString();
    else return (nyear - year + 1).toString();
}

export const handleSubmit = async(username: string, password: string, context: any, callback: ()=>void, loginStateFail?: () =>void ) => {
    try {
        
        const res = await axios.post('/login', {
            username: username,
            password: password
        })
        console.log(res)
        if(res?.status === 200) {
            const birthdaySpl = res.data.birthday.split('.') as string[]

            context?.dispatch({
                name: res.data.name,
                username: res.data.username,
                major: res.data.major,
                sex: res.data.sex,
                birthday: ageCalculator(Number(birthdaySpl[0]), Number(birthdaySpl[1]), Number(birthdaySpl[2]))
            })
            return callback()
        }
    } catch(e) {
        
        if(loginStateFail) {
        
            return loginStateFail()
        }
    }

}