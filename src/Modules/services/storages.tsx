import { HttpBase } from 'src/Cores/HttpBase';
const http = new HttpBase();

export const filterStore = (value: string) => http.get<any>(`store/${value}`).then(
    (res: any) => res.stores
);