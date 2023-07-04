import axios, { AxiosRequestConfig, RawAxiosRequestConfig } from "axios"

export type CertInfo = {
    code: string|number,
    majors: string,
    name: string,
    total_passed: number,
    total_taken: number,
    year: number
}

interface DataCollector {
    _certData: null|CertInfo[]
    _listener: Array<any>
}


class DataCollector {

    constructor() {
        this._certData = null
        this._listener = []
    }

    get certData() {
        return this._certData;
    }

    set certData(data) {
        this._certData = data
        this.emitChange()
    }

    get listener() {
        return this._listener
    }

    set listener(listener) {
        this._listener = listener
        
    }

    

    emitChange() {
        for(const l of this.listener) {
            l()
        }
    }

    async collectCertData() {
        const initconfig = {
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
          }
        const res = await axios.get('/certs', initconfig)
        const data = await res.data
        // const json = await res.json();
        this.certData = data;
        console.log('finished');
    }

    getSnapshotOfCertData(this:any) {
        return this.certData
    }

    subscribe(this: any, l:any) {
        this.listener = [...this.listener, l];
        return()=>{
            this.listener = this.listener.filter((listener:any) => listener !== l)
        }
    }

}


const collector = new DataCollector();
export default collector