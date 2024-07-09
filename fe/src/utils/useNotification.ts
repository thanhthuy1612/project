import { IStatusCode } from '../interface/IStatusCode';
import { updateNotification } from '../lib/features/notification';
import { useAppDispatch } from '../lib/hooks';

export const useNotification = () => {
    const dispatch = useAppDispatch();
    const setNotification = (result: any, description: string, action: () => void) => {
        if (result?.statusCode === IStatusCode.SUCCESS) {
            action();
            dispatch(
                updateNotification({
                    type: 'success',
                    description: description,
                }),
            );
        }
        if (result?.statusCode === IStatusCode.ERROR) {
            dispatch(
                updateNotification({
                    type: 'fail',
                    description: result.data,
                }),
            );
        }
    };
    return { setNotification };
};
