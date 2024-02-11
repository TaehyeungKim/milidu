import styled from "styled-components";
import { toRem } from "@/utils/toRem";
import { useEffect, useRef } from "react";


const StarRateBox = styled.div<{$size: number}>`
        width: ${props => toRem(props.$size)*5}rem;
        height: fit-content;
        font-size: ${props => toRem(props.$size)}rem;
        position: relative;
        box-sizing: content-box;
        
`

const TransparentInput = styled.input<{$disabled: boolean}>`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0;    
        margin: 0;
        height: 100%;
        z-index: 10;
        &:hover {
            cursor: ${props => props.$disabled ? 'initial' : 'pointer'  };
        }
`

const StarRate = styled.div<{$size: number}>`
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        font-size: ${props => toRem(props.$size)}rem;
        background-clip: text;
        -webkit-background-clip: text;
        background-color: tomato;
        color: rgba(0, 0, 0, 0.2);        
        transition: width 0.2s ease-in-out;
`

interface StarRateComponentProps {
    size: number,
    disabled: boolean,
    value?: number,
    updater?:(rate:number)=>void
}

export default function StarRateComponent({size, disabled, value, updater}:StarRateComponentProps) {
    const [starRateBox, starRate] = [useRef<HTMLDivElement>(null),useRef<HTMLDivElement>(null)];
    const transparentInput = useRef<HTMLInputElement>(null);
    useEffect(()=>{
        const heightOfTheStar = starRate.current?.offsetHeight
        starRateBox.current?.setAttribute('style', `height: ${heightOfTheStar}px`)

        transparentInput.current?.addEventListener('change', (e)=>{
            const target = e.target as HTMLInputElement
            starRate.current?.setAttribute('style', `width: ${target.valueAsNumber * 10}%`)
            
        })
    },[])

    useEffect(()=>{
        if(typeof value === 'number') starRate.current?.setAttribute('style', `width: ${value * 10}%`)
    },[value])
    return(
        <StarRateBox $size={size}ref={starRateBox}>
                <TransparentInput type="range" min={0} max={10} step={1} ref={transparentInput} disabled={disabled} $disabled={disabled} value={value} onChange={(e)=>{
                    if(updater) {
                        const target = e.target as HTMLInputElement;
                        updater(parseInt(target.value as string))
                    }
                    }}/>
                <StarRate $size = {size} ref={starRate}>★★★★★</StarRate>
        </StarRateBox>
    )
}