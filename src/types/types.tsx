export interface IOrder {
    name: string,
    country: string,
    region: string,
    city: string,
    street: string,
    index: string,
    house: string,
    appartment?: string,
    phone: string,
    email: string,
    variant: string,
    quant: number,
    status: string,
    _id: string,
    createdAt: string
}