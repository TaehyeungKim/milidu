import { useEffect, useState, useDeferredValue, useRef, useLayoutEffect} from 'react'
import styles from './BookList.module.scss'
import {booklistArrowLeft, booklistArrowRight} from '@/public/icons/icons'




interface BookListProps {
    recommend_book: string[]
}

export default function BookList({recommend_book}:BookListProps) {

    const bookList = recommend_book.filter((book: string)=>book !== 'null')

    const [shownIndex, setShownIndex] = useState<number>(1);
    const prevIndex = useDeferredValue(shownIndex)


    const slideContainer = useRef<HTMLDivElement>(null)


    const slideLeft = () => {
        setShownIndex(index=>index+1);
        
    }

    const slideRight = () => {
        setShownIndex(index=>index-1)   
    }


    useEffect(()=>{
        if(bookList.length > 1) {
            const list = document.querySelectorAll('.'+ styles.bookList);
            const container = slideContainer.current as HTMLDivElement

            const [first, last] = [list[list.length-1].cloneNode(true), list[0].cloneNode(true)]

            container.prepend(first);
            container.append(last);

            const [leftButton, rightButton] = [document.getElementById(styles.left) as HTMLButtonElement, document.getElementById(styles.right) as HTMLButtonElement]

            container.setAttribute('style', `transform: translateX(-${100 * shownIndex}%)`)
            leftButton.addEventListener('click', slideRight)
            rightButton.addEventListener('click', slideLeft)
            container.addEventListener('transitionstart', ()=>{
            leftButton.removeEventListener('click', slideRight);
            rightButton.removeEventListener('click', slideLeft)
            })
            container.addEventListener('transitionend', ()=>{
                leftButton.addEventListener('click', slideRight);
                rightButton.addEventListener('click', slideLeft)
            })
        }
        
    },[])

    

    useEffect(()=>{
        if(bookList.length > 1) {
            const container = slideContainer.current as HTMLDivElement
            const adjustingAfterTransition = () => {
                container.classList.add(styles.transitionRemoved);
                if(shownIndex === 0 && prevIndex === 1) {
                    container.setAttribute('style', `transform: translateX(-${100*bookList.length}%)`);
                    setShownIndex(bookList.length)
                }
                else if(shownIndex === bookList.length + 1 && prevIndex === bookList.length) {
                    container.setAttribute('style', 'transform: translateX(-100%)')
                    setShownIndex(1)
                } 
                    
            }
            container.addEventListener('transitionend', adjustingAfterTransition)
            return(()=>{
                container.classList.remove(styles.transitionRemoved)
                container.removeEventListener('transitionend', adjustingAfterTransition)})
        }
        

    },[shownIndex])

    useLayoutEffect(()=>{
        if(bookList.length > 1) {
            const container = slideContainer.current as HTMLDivElement
            if(!(prevIndex === bookList.length + 1 && shownIndex === 1) && !(prevIndex === 0 && shownIndex === bookList.length))
            container.setAttribute('style', `transform: translateX(-${100*shownIndex}%)`)
        }   
        
    },[shownIndex])

    if(bookList.length === 0) return(
        <div className = {styles.container}>
            <div className = {styles.slideContainer}>
                <article className = {styles.bookList} style={{textAlign: 'center'}}>
                    등록된 추천 도서가 없습니다. <br/>
                    리뷰를 작성해서 추천도서를 등록해주세요!
                </article>
            
            </div>

        </div>
    )

    return(
        <div className = {styles.container}>
            {bookList.length > 1 ? 
            <>
            <button className = {styles.slide} id={styles.right}>{booklistArrowRight()}</button>
            <button className = {styles.slide} id={styles.left}>{booklistArrowLeft()}</button>
            </>
            :
            null    
            }
            
            <div className = {styles.slideContainer} ref={slideContainer}>
            {bookList.map((data: string, index: number)=>(
                data === "null" ? null :  
                <article className = {styles.bookList} key={index}>
                <figure className = {styles.bookImage}>
                    <img src={JSON.parse(data).image_url} onError={(e)=>{
                        const target = e.target as HTMLImageElement;
                        target.src = '/univlogo/200.png'
                    }}></img>
                </figure>
                <figcaption className = {styles.bookInfo}>
                    <h4>{JSON.parse(data).title + ' / ' + JSON.parse(data).author}</h4>
                </figcaption>
                </article>
            ))}
            </div>
        </div>
    )
}