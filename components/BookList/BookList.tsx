import { useEffect, useState, useDeferredValue, useRef, useLayoutEffect} from 'react'
import styles from './BookList.module.scss'
import {booklistArrowLeft, booklistArrowRright} from '@/public/icons/icons'
type BookListData = {
    imageURL: string,
    title: string,
    author: string
}

const bookList: BookListData[] = [
    {imageURL: "https://via.placeholder.com/150/92c952",
    title: "Dancing with me",
    author: "김태형"},
    {imageURL: "https://via.placeholder.com/150/771796",
    title: "The basic of the Rhyme",
    author: "박종선"
    },
    {imageURL: "https://via.placeholder.com/150/24f355",
    title: "애니어 탐구하기",
    author: "이시윤"
    },
    {imageURL: "https://via.placeholder.com/150/d32776",
    title: "비표 받고 문 쾅",
    author: "이승훈"
    }
]

interface BookListProps {
    bookList: BookListData[]
}

export default function BookList() {

    const [shownIndex, setShownIndex] = useState<number>(1);
    const prevIndex = useDeferredValue(shownIndex)

    const rightButton = useRef<HTMLButtonElement>(null);
    const leftButton = useRef<HTMLButtonElement>(null);

    const slideContainer = useRef<HTMLDivElement>(null)

    

    

    const slideLeft = () => {
        setShownIndex(index=>index+1);
        
    }

    const slideRight = () => {
        setShownIndex(index=>index-1)   
    }

    useEffect(()=>{
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
    },[])

    

    useEffect(()=>{
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

    },[shownIndex])

    useLayoutEffect(()=>{
        const container = slideContainer.current as HTMLDivElement
        if(!(prevIndex === bookList.length + 1 && shownIndex === 1) && !(prevIndex === 0 && shownIndex === bookList.length))
        container.setAttribute('style', `transform: translateX(-${100*shownIndex}%)`)
    },[shownIndex])

    return(
        <div className = {styles.container}>
            <button className = {styles.slide} id={styles.right}>오른</button>
			<label for={styles.right}></label>
            <button className = {styles.slide} id={styles.left}>왼</button>
            <div className = {styles.slideContainer} ref={slideContainer}>
            {bookList.map((data: BookListData, index: number)=>(
                <article className = {styles.bookList} key={index}>
                <figure className = {styles.bookImage}>
                    <img src={data.imageURL}></img>
                </figure>
                <figcaption className = {styles.bookInfo}>
                    <h4>{data.title + ' / ' + data.author}</h4>
                </figcaption>
                </article>
            ))}
            </div>
        </div>
    )
}