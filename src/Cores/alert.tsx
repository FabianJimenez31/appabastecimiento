import { Modal } from 'antd';
// eslint-disable-next-line no-unused-vars
import { ModalFuncProps } from 'antd/lib/modal';

export class Alert {

  success(config: ModalFuncProps): Promise<boolean> {

    return new Promise((resolve, reject) => {
      Modal.success({
        title: 'Proceso exitoso!',
        centered: true,
        onOk() { resolve(true); },
        onCancel() { reject(false); },
        ...config
      });
    });
  }

  info(config: ModalFuncProps): Promise<boolean> {

    return new Promise((resolve, reject) => {
      Modal.info({
        title: 'Información!',
        okType: 'default',
        centered: true,
        onOk() { resolve(true); },
        onCancel() { reject(false); },
        ...config
      });
    });
  }

  warning(config: ModalFuncProps): Promise<boolean> {

    return new Promise((resolve, reject) => {
      Modal.warning({
        title: 'Advertencia!',
        centered: true,
        okType: 'default',
        onOk() { resolve(true); },
        onCancel() { reject(false); },
        ...config
      });
    });
  }

  error(config: ModalFuncProps): Promise<boolean> {

    return new Promise((resolve, reject) => {
      Modal.error({
        title: 'Algo no salió bien!',
        centered: true,
        okType: 'danger',
        onOk() { resolve(true); },
        onCancel() { reject(false); },
        ...config
      });
    });
  }

  confirm_save(config: ModalFuncProps): Promise<boolean> {

    return new Promise((resolve, reject) => {
      Modal.confirm({
        title: 'Guardar la información?',
        cancelText: 'Cancelar',
        okText: 'Guardar',
        centered: true,
        onOk() { resolve(true); },
        onCancel() { reject(false); },
        ...config
      });
    });
  }

  confirm_delete(config: ModalFuncProps): Promise<boolean> {

    return new Promise((resolve, reject) => {
      Modal.confirm({
        title: 'Eliminar registro?',
        cancelText: 'Cancelar',
        okText: 'Eliminar',
        okType: 'danger',
        centered: true,
        onOk() { resolve(true); },
        onCancel() { reject(false); },
        ...config
      });
    });
  }
}