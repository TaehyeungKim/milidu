import escapeRegexp from 'lodash'

const patternYield = (character: string) => {
    //한글 유니코드: 초성자음*588 + 중성모음*28 + 종성자음 + '가'.charcode
    const offset = '가'.charCodeAt(0);
    if(/[가-힣]/.test(character)) {
        const code = character.charCodeAt(0) - offset;
        if(code%28 > 0) return character;

        const ptBegin = Math.floor(code/28) * 28 + offset;
        const ptEnd = ptBegin + 27;
        return `[\\u${ptBegin.toString(16)}-\\u${ptEnd.toString(16)}]`;
    }

    if(/[ㄱ-ㅎ]/.test(character)) {
        const formerSyl:{[key: string]: number} = {
            'ㄱ': '가'.charCodeAt(0),
            'ㄲ': '까'.charCodeAt(0),
            'ㄴ': '나'.charCodeAt(0),
            'ㄷ': '다'.charCodeAt(0),
            'ㄸ': '따'.charCodeAt(0),
            'ㄹ': '라'.charCodeAt(0),
            'ㅁ': '마'.charCodeAt(0),
            'ㅂ': '바'.charCodeAt(0),
            'ㅃ': '빠'.charCodeAt(0),
            'ㅅ': '사'.charCodeAt(0),
          };
        
        const begin = formerSyl[character] || ((character.charCodeAt(0) - 'ㅅ'.charCodeAt(0))*588 + '사'.charCodeAt(0));
        const end = begin + 587;  
        return `[${character}\\u${begin.toString(16)}-\\u${end.toString(16)}]`
    }

    return escapeRegexp(character);
}

export const createFuzzyMatcher = (character: string) => {
    const pattern = character.split('').map(patternYield).join('.*?');
    return new RegExp(pattern);
    
}