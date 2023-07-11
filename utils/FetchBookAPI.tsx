"use client"

import axios from 'axios'
import { BookInfo } from '@/Interface/interface'

const ACCESSKEY = '5a81c0dd85cf7215d30463853b623b2078af8fd45ae7f2de7dc4fbbd372e29a5'

export const FetchBookAPI = async(pageNum: number, keyword: string, category: string) => {
    const url = `/bookSearch?key=${ACCESSKEY}&kwd=${keyword}&category=${category}&pageNum=${pageNum}`

    try {
        const res = await axios.get(url);
    

        const parser = new DOMParser()
    
        const xmlDoc = parser.parseFromString(res.data, "text/xml");
        
        const srchResults = xmlDoc.getElementsByTagName("result").item(0) as Element;
        if(!srchResults) return null;
    
        if(srchResults.childElementCount === 0 && pageNum === 1) return null;
        
        let arr:Element[] = []
        for(let i = 0; i < srchResults.childElementCount; i++) arr = [...arr, srchResults.children[i]]
        
        const returnedArr: BookInfo[] = []
        arr.forEach((value: Element)=>{
            const title = value.getElementsByTagName('title_info').item(0)?.textContent as string
            const author = value.getElementsByTagName('author_info').item(0)?.textContent as string
            const imageUrl = value.getElementsByTagName('image_url').item(0)?.textContent as string
            const publisher = value.getElementsByTagName('pub_info').item(0)?.textContent as string
            returnedArr.push({title: title, author: author, image_url: imageUrl, publisher: publisher})
        })
    
    
        return returnedArr;
    } catch(e) {
        return null;
    }

}