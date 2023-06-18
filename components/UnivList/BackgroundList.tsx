import styles from './BackgroundList.module.scss'
import styles_origin from './UnivList.module.scss'
import { useEffect, useRef } from 'react'
import { univReducerState } from '@/pages/university'

interface BackgroundListProps {
    state: univReducerState
}

export default function BackgroundList({state}: BackgroundListProps) {

    const backgroundListContainer = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        
        const {offsetWidth, offsetHeight} = document.getElementById('listContainer') as HTMLDivElement
        const {y} = document.getElementById('listContainer')?.getBoundingClientRect() as DOMRect
        const wrapperY = (document.getElementById('searchSection')?.getBoundingClientRect() as DOMRect).y
       
        backgroundListContainer.current?.setAttribute('style', `
            width: ${offsetWidth}px;
            height: ${offsetHeight}px;
            top: ${y - wrapperY}px;
        `)
    },[])

    useEffect(()=>{
        const { top, left } = backgroundListContainer.current?.getBoundingClientRect() as DOMRect;
        const {x, y} = state.selected?.getBoundingClientRect() as DOMRect;
        const backArticle = document.createElement('article');
        backArticle.setAttribute('class', styles_origin.univ)
        backArticle.setAttribute('style', `
            position: absolute;
            left: ${x - left}px;
            top: ${y - top}px;
            width: ${state.selected?.offsetWidth}px;
            box-sizing: border-box;
        `)
        backArticle.classList.add(styles.back_selected)
        backArticle.setAttribute('id', 'selectedItem')

    
        
        for(let i = 0; i < (state.selected?.children.length as number); i++) {
            const cloned = state.selected?.children[i].cloneNode(true) as Node;
            backArticle.appendChild(cloned)
        }
        backgroundListContainer.current?.appendChild(backArticle);
    },[])

    useEffect(()=>{
        if(state.pageState === 4) {
            backgroundListContainer.current?.classList.remove(styles.backgroundList)
            backgroundListContainer.current?.removeAttribute('style')
            backgroundListContainer.current?.classList.add(styles_origin.univ_list)
            backgroundListContainer.current?.classList.add(styles['backgroundList--afterTransition'])
            document.getElementById('selectedItem')?.removeAttribute('style')
        }
    },[state.pageState])

    return(
        <div className = {styles.backgroundList} ref={backgroundListContainer}></div>
    )
}