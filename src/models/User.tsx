export default interface User{
    id: number
    name: string
    surname?: string
    email: string
    password: string
    acceptNotifications: boolean
}