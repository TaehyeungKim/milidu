import { useEffect } from "react"
import {certDataCollector, univDataCollector} from "@/utils/DataCollector"

export default function App() {

    useEffect(()=>{
        certDataCollector.collectCertData();
        univDataCollector.collectUnivData();
    },[])

    return(
        <h1>Landing Page</h1>
    )
}
