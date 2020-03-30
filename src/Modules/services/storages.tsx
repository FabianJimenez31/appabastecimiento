import { HttpBase } from 'src/Cores/HttpBase';
const http = new HttpBase();

export const store = () => http.get<any>(`store/`);
export const filterStore = (value: string) => http.http.post(`store/query/`, { name: value });
export const getProductStore = (id: string) => http.get<any>(`store/${id}/`);
export const getProduct = () => http.get<any>(`/products/`);
export const reporteProductoExistence = (data: any) => http.post<any, any>(`report/stock/product/`, data);
export const reporteAlzadePrecio = (data: any) => http.post<any, any>(`report/product/`, data);
export const storeGeolocation = (latitude: any, longitude: any, data: any) => http.http.post(`store/${latitude}/${longitude}/`, data);
export const unit = () => http.get(`unit/`);
export const createStore = (payload: any) => http.post('store/', payload);
