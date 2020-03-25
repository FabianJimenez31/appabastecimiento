import { notification } from 'antd';
// eslint-disable-next-line no-unused-vars
import { ReactNode } from 'react';

type TpNotification = string | ReactNode;

export class Notification {

  default(description: TpNotification, message: TpNotification = 'Notificación!') {
    notification.open({ message, description });
  }

  success(description: TpNotification, message: TpNotification = 'El proceso fué exitoso!') {
    notification.success({ message, description });
  }

  warning(description: TpNotification, message: TpNotification = 'Advertencia!') {
    notification.warning({ message, description });
  }

  info(description: TpNotification, message: TpNotification = 'Información!') {
    notification.info({ message, description });
  }

  error(description: TpNotification, message: TpNotification = 'Algo no salió bien!') {
    notification.error({ message, description });
  }

}