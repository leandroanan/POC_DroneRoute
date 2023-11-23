import { notification } from 'antd';

const notificationFactory = {
    success: (description) => {
        notification.success({
            message: 'Success',
            description: description,
            placement: 'bottomRight',
        });
    },

    warning: (description) => {
        notification.warning({
            message: 'Warning',
            description: description,
            placement: 'bottomRight',
        });
    },

    error: (description) => {
        notification.error({
            message: 'Error',
            description: description,
            placement: 'bottomRight',
        });
    },
};

export default notificationFactory;
