import { HttpBase } from 'src/Cores/HttpBase';
const http = new HttpBase();

export const  store = () => http.get<any>(`store/`);
export const filterStore = (value: string) => http.get<any>(`store/${value}/`);
export const getProductStore = (id: string) => http.get<any>(`store/${id}/`);
export const reporteProductoExistence = (data: any) => http.post<any, any>(`reporte/product/`, data);