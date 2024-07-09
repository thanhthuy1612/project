import { AudioOutlined, SearchOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Avatar, Input, List, Tooltip, theme } from 'antd';
import React from 'react';
import { searchFriendChats } from '../../../../api/chat';
import { urlImg } from '../../../../api/url';
import { searchChats } from '../../../../api/user';
import { ISearchChat } from '../../../../interface/ISearchChat';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';
import { useDebounce } from '../../../../utils/useDebounce';
import { IStatusCode } from '../../../../interface/IStatusCode';
import { updateListFriendMessage, updateSelectedMessage } from '../../../../lib/features/message';

const SearchFriend: React.FC = () => {
  const [input, setInput] = React.useState<string>("");
  const [listSearch, setListSearch] = React.useState<ISearchChat[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingSearch, setLoadingSearch] = React.useState<boolean>(false);


  const { id } = useAppSelector(state => state.user);
  const { listFriendMessage } = useAppSelector(state => state.message);

  const dispatch = useAppDispatch();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    if (!e.target.value) {
      setListSearch([])
    }
    setInput(value)
  };

  const fetchSearch = async (item = input) => {
    if (item) {
      setLoading(true);
      const result = await searchChats(item);
      setListSearch(result.data);
      setLoading(false);
    }
  };
  useDebounce(fetchSearch, [input], 500);
  const handleEnter = async () => {
    await fetchSearch();
  };

  const handleClick = (item: ISearchChat) => async () => {
    if (item.id && id) {
      setLoadingSearch(true)
      setInput(item.username);
      const result = await searchFriendChats({ id, idSearch: item.id })
      if (result.statusCode === IStatusCode.SUCCESS) {
        const checkListFriendMessage = listFriendMessage.filter(item => item.id === result.data.id)
        if (!checkListFriendMessage.length) {
          dispatch(updateListFriendMessage([result.data, ...listFriendMessage]))
        }
        dispatch(updateSelectedMessage(result.data))
      }
      setInput('');
      setLoadingSearch(false)
    }
  }

  const renderSuffix = () => {
    if (loadingSearch) {
      return <LoadingOutlined
        style={{
          fontSize: 16,
        }}
      />
    }
    return <AudioOutlined
      style={{
        fontSize: 16,
      }}
      className=' cursor-pointer'
    />
  }

  return (
    <div className=' h-[50px] px-[16px] flex items-center bg-primaryWhite'>
      <Tooltip
        fresh
        title={
          <List
            loading={loading}
            className=' max-h-[300px] overflow-auto'
            dataSource={listSearch}
            renderItem={(item: ISearchChat) => (
              <List.Item
                onClick={handleClick(item)}
                className=' hover:bg-hoverBlue'
                key={item?.email}
                style={{ paddingLeft: '16px', paddingRight: '16px', cursor: 'pointer' }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      className=' bg-primaryWhite text-primaryBlueDark ring-primaryBlueDark ring-offset-2 ring-[1px]'
                      src={`${urlImg}${item?.ava}`}
                      icon={<UserOutlined />}
                    />
                  }
                  title={item.username}
                  description={item.email}
                />
              </List.Item>
            )}
          />
        }
        placement="bottomLeft"
        overlayStyle={{ minWidth: '320px' }}
        showArrow
        color={colorBgContainer}
        mouseLeaveDelay={0.3}
      >
        <Input
          value={input}
          placeholder="Search message"
          size="large"
          suffix={renderSuffix()}
          allowClear={!loadingSearch}
          onChange={handleChange}
          onPressEnter={handleEnter}
          prefix={<SearchOutlined />}
        />
      </Tooltip>
    </div>
  )
}

export default SearchFriend