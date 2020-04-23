import { HttpBase } from 'src/Cores/HttpBase';
const http = new HttpBase();

export const storeRanquit = (data:any) => http.post(`store/raiting/`,data);

export const filterStore = (value: string) => http.http.post(`store/query/`, { name: value });
export const getProductStore = (id: string) => http.get<any>(`store/${id}/`);
export const getProduct = () => http.get<any>(`/products/`);
export const reporteProduct = (data: any) => http.post<any, any>(`report/store/`, data);
export const reporteAlzadePrecio = (data: any) => http.post<any, any>(`report/product/`, data);
export const storeGeolocation = (latitude: any, longitude: any, data: any) => http.http.post(`store/${latitude}/${longitude}/`, data);
export const unit = () => http.get(`unit/`);
export const store = (id: any) => http.get(`store/${id}/`);

export const storesGeo = (latitude: any, longitude: any,)=>http.get<any>(`store/${latitude}/${longitude}/5`)
