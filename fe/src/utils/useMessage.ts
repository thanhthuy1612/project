import { getListChat, getMessage } from '../api/chat';
import { IStatusCode } from '../interface/IStatusCode';
import {
    updateIsLoadingListFriendMessage,
    updateIsLoadingListMessage,
    updateListFriendMessage,
    updateListMessage,
    updateListUserInMessageSelected,
    updatePageNumberListFriendMessage,
    updatePageNumberListMessage,
    updateTotalListFriendMessage,
    updateTotalListMessage,
} from '../lib/features/message';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { defaultPageSize } from './utils';

export const useMessage = () => {
    const dispatch = useAppDispatch();
    const {
        isLoadingListMessage,
        pageNumberListFriendMessage,
        isLoadingListFriendMessage,
        selectedMessage,
        pageNumberListMessage,
    } = useAppSelector((state) => state.message);
    const { id } = useAppSelector((state) => state.user);

    const loadMoreDataListMessage = async (isFirst = false) => {
        if (isLoadingListMessage) {
            return;
        }
        dispatch(updateIsLoadingListMessage(true));
        if (selectedMessage?.id && id) {
            const result = await getMessage({
                idChat: selectedMessage?.id,
                idUser: id,
                pageNumber: isFirst ? 1 : pageNumberListMessage,
                pageSize: defaultPageSize,
            });
            if (result.statusCode === IStatusCode.SUCCESS) {
                dispatch(updateListMessage(result.data?.message));
                dispatch(updateListUserInMessageSelected(result.data?.listUser))
                dispatch(updateTotalListMessage(result.data.total));
                dispatch(updatePageNumberListMessage(pageNumberListMessage + 1));
                dispatch(updateIsLoadingListMessage(false));
            }
        }
    };

    const loadMoreDataListFriendMessage = async (isFirst = false) => {
        if (isLoadingListFriendMessage) {
            return;
        }
        dispatch(updateIsLoadingListFriendMessage(true));
        const result = await getListChat({
            id: id ?? '',
            pageNumber: isFirst ? 1 : pageNumberListFriendMessage,
            pageSize: defaultPageSize,
        });
        if (result.statusCode === IStatusCode.SUCCESS) {
            dispatch(updateListFriendMessage(result.data.listMessage));
            dispatch(updateTotalListFriendMessage(result.data.totalLength));
            dispatch(updatePageNumberListFriendMessage(pageNumberListFriendMessage + 1));
        }
        dispatch(updateIsLoadingListFriendMessage(false));
    };
    return { loadMoreDataListMessage, loadMoreDataListFriendMessage };
};
