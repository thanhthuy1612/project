import React from 'react';
import { AudioOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Input, List, Tooltip, theme } from 'antd';
import { searchChats } from '../../../../api/user';
import { urlImg } from '../../../../api/url';
import { ISearchChat } from '../../../../interface/ISearchChat';
import { useDebounce } from '../../../../ultis/useDebounce';

const SearchFriend: React.FC = () => {
  const [input, setInput] = React.useState<string>("");
  const [listSearch, setListSearch] = React.useState<ISearchChat[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

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

  const handleClick = (item: ISearchChat) => () => {
    setInput(item.username)
    console.log(item)
  }

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
      }}
      className=' cursor-pointer'
    />
  );

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
                  avatar={<Avatar src={`${urlImg}/${item?.ava}`} icon={<UserOutlined />} />}
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
          suffix={suffix}
          allowClear
          onChange={handleChange}
          onPressEnter={handleEnter}
        />
      </Tooltip>
    </div>
  )
}

export default SearchFriend