import notificationFactory from "../utils/notificationFactory";
import { notification } from 'antd';

jest.mock('antd', () => {
    const originalModule = jest.requireActual('antd');

    // Mocking notification part of antd
    return {
        ...originalModule,
        notification: {
            success: jest.fn(),
            warning: jest.fn(),
            error: jest.fn(),
        },
    };
});

describe('notificationFactory', () => {
    it('calls success notification with correct arguments', () => {
        notificationFactory.success('Success message');
        expect(notification.success).toHaveBeenCalledWith({
            message: 'Success',
            description: 'Success message',
            placement: 'bottomRight',
        });
    });

    it('calls warning notification with correct arguments', () => {
        notificationFactory.warning('Warning message');
        expect(notification.warning).toHaveBeenCalledWith({
            message: 'Warning',
            description: 'Warning message',
            placement: 'bottomRight',
        });
    });

    it('calls error notification with correct arguments', () => {
        notificationFactory.error('Error message');
        expect(notification.error).toHaveBeenCalledWith({
            message: 'Error',
            description: 'Error message',
            placement: 'bottomRight',
        });
    });
});
