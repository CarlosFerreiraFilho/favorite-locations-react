export default interface LocationBodyModel {
    id: number | string,
    name: string,
    latitude: string,
    longitude: string,
    markerColor: string,
    user_uid: number | string,
    created_at: Date,
    updated_at: Date
}