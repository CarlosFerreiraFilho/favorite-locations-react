export default interface UserBodyModel {
    id: number,
    name: string,
    email: string,
    password: string,
    logado: boolean,
    created_at: Date,
    updated_at: Date
}