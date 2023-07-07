import { useState, useEffect } from "react"

export const useSessionStorage = (key:string) => {
    const [sessionValue, setSessionValue] = useState<any>(null);

    useEffect(()=>{
        setSessionValue(sessionStorage.getItem(key))
    },[])

    return sessionValue
}