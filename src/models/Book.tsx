export default interface Book{
    id: number
    title: string
    author: string
    description?: string
    opinion: string
    published?: string
    idCreator: number
    idGenre?: number | null
}