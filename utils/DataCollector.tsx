import axios, { AxiosResponse } from "axios"
import { CertReview } from "@/pages/certification/[id]"
import { LectureComment } from "@/components/UnivDetail/UniveLectureList"

export type CertInfo = {
    code: string|number,
    majors: string,
    name: string,
    total_passed: number,
    total_taken: number,
    year: number,
    host: string,
    id: number
}

export type UnivObject = {
    school_id: number,
    school_name: string
}

interface DataCollector {
    _data: null|CertInfo[]|UnivObject[]|CertReview|LectureComment[]
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

    async collectData(url: string, method: string, body?: any) {
        const initconfig = {
            url: url,
            method: method,
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
          }
        
          let res: AxiosResponse

        switch(method) {
            //GET
            default:
                res = await axios.get(url, initconfig)
                break;
            case "POST":
                res = await axios.post(url, body, initconfig);
                break;
        }
        
        const data = res.data

        this.data = data;
        return data
    }

    


}

export function getSnapshotOfData(this:DataCollector) {
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


    get dataOnRange() {return this._dataOnRange}
    set dataOnRange(data) {this._dataOnRange = data }

}

class UnivDataCollector extends DataCollector {
    constructor() {
        super()
    }
}

class CertReviewDataCollector extends DataCollector {
    constructor() {
        super()
    }
}

class UnivLectureReviewDataCollector extends DataCollector {
    constructor() {
        super()
    }
}

export {UnivLectureReviewDataCollector}


const certDataCollector = new CertDataCollector();
const univDataCollector = new UnivDataCollector();
const certReviewDataCollector = new CertReviewDataCollector()


export {certDataCollector, univDataCollector, certReviewDataCollector}