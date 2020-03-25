import { HttpBase } from 'src/Cores/HttpBase';
const http = new HttpBase();

export const filterStore = () => http.get<any>('store').then(
    (res: any) => res.stores
);