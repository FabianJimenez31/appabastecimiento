import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import { Alert, Notification } from 'src/Cores';
import { ModalFuncProps } from "antd/lib/modal";

export class HttpBase {
    http: any;
    //http: AxiosInstance;
    alert = new Alert();
    notification = new Notification;

    constructor(private endpoint: string = 'https://abastecernosapi.humc.co/api/') {

        const config: AxiosRequestConfig = {
            baseURL: endpoint,
            /* headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }, */
            validateStatus: this.valid_status.bind(this)
        }
        this.http = Axios.create(config);
        this.http.interceptors.request.use(
            (config: AxiosRequestConfig): AxiosRequestConfig => {
                return config;
            }, (error: Error): Promise<Error> => {
                return Promise.reject(error);
            }
        );

    }

    async post<P, T>(path: string, payload: P, alertConfig?: ModalFuncProps, config?: AxiosRequestConfig): Promise<T> {

        await this.alert.confirm_save({
            title: 'Guardar nuevo registro!',
            content: 'Esta seguro de guardar este nuevo registro?',
            ...alertConfig
        });

        return this.http.post(path, payload, config)
            .then(this.extract_data);
    }

    async put<P, T>(path: string, payload: P, alertConfig?: ModalFuncProps, config?: AxiosRequestConfig): Promise<T> {

        await this.alert.confirm_save({
            title: 'Actualizar registro!',
            content: 'Esta seguro de guardar los cambios de este registro?',
            ...alertConfig
        });
        return this.http.put(path, payload, config)
            .then(this.extract_data);
    }

    get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {


        return this.http.get(path, config)
            .then(this.extract_data);
    }


    private valid_status(status: number): boolean {


        switch (status) {
            case 200:
                return true;

            case 201:
                this.notification.success('Se ha creado un nuevo recurso con éxito.', 'Información guardada!');
                return true;

            case 204:
                this.notification.success('Se ha aplicado con éxito la actualización al recurso existente.', 'Información actualizada!');
                return true;

            case 400:
            case 401:
            case 404:
            case 405:
            case 415:
            case 422:
                this.alert.warning({
                    title: 'No se pudo completar la acción.',
                    content: 'Por favor verifíque la información e intente de nuevamente o más tarde. Sí el error continúa póngase en contacto con soporte técnico.'
                });
                return false;

            default:
                this.alert.error({
                    title: 'ERROR DEL SERVIDOR',
                    content: 'Por favor intente de nuevo más tarde o póngase en contacto con soporte técnico.'
                });
                return false;
        }
    }

    private extract_data(response: AxiosResponse<any>): Promise<any> {
        const { data } = response;
        return data;
    }
}