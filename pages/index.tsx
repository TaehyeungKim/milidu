import { useEffect } from "react"
import collector from "@/utils/DataCollector"

export default function App() {

    useEffect(()=>{
        collector.collectCertData();
    },[])

    return(
        <h1>Landing Page</h1>
    )
}
