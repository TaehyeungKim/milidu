import axios from "axios"

export type CertInfo = {
    code: string|number,
    majors: string,
    name: string,
    total_passed: number,
    total_taken: number,
    year: number,
    host: string
}

interface DataCollector {
    _data: null|CertInfo[]
    _listener: Array<any>
}


class DataCollector {

    constructor() {
        this._data= null
        this._listener = []
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data
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

    


}

export function getSnapshotOfCertData(this:DataCollector) {
    return this.data
}

export function subscribe(this: DataCollector, l:any) {
    this.listener = [...this.listener, l];
    return()=>{
        this.listener = this.listener.filter((listener:any) => listener !== l)
    }
}

interface CertDataCollector extends DataCollector {
    _dataOnRange: CertInfo[]
}

class CertDataCollector extends DataCollector {
    constructor() {
        super()
        this._dataOnRange = [];
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
        this.data = data;
        console.log('finished', data);
        return data
    }

    get dataOnRange() {return this._dataOnRange}
    set dataOnRange(data) {this._dataOnRange = data }

}


const collector = new CertDataCollector();
export default collector