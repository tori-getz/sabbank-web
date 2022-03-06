
export interface IFaqQuestion {
    question_en: string
    question_ru: string
    answer_en: string
    answer_ru: string
}

export interface IFaqTheme {
    question: Array<IFaqQuestion>
    theme_ru: string
    theme_en: string
}
