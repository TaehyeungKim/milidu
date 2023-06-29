import { toRem } from "./toRem";

export const textAreaResize = (target: HTMLElement) => {
    target.addEventListener('input', (e)=>{
        const target = e.target as HTMLTextAreaElement;
        
        target.setAttribute('style', 'height: auto')
        if(target.scrollHeight !== target.clientHeight) {
            target.setAttribute('style', `height: ${toRem(target.scrollHeight)}rem`)}
    })
}