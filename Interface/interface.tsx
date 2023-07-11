import React from 'react'

export type NestedReactComponent = {
    children?: React.ReactNode
}

export type User = {
    name: string,
    username: string,
    major: string,
    sex:string,
    birthday:string
}

export type BookInfo = {
    title: string,
    author: string,
    publisher: string,
    image_url?:string
}

export type SubmitCertReviewData = {
    cert_name: string,
    cert_code: string|number,
    username: string,
    time_taken: string,
    difficulty: number,
    recommend_book: string,
    num_attempts: number,
    content: string,
    study_method: string,
    major: string,
    sex: string,
    birthday: string
}