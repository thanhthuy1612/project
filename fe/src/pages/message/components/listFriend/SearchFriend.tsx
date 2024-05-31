import React from 'react';
import { AudioOutlined } from '@ant-design/icons'
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input;

const SearchFriend: React.FC = () => {
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
      }}
    />
  );
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
  }

  return (
    <div className=' h-[50px] px-[16px] flex items-center bg-primaryWhite'>
      <Search
        placeholder="Search message"
        size="large"
        suffix={suffix}
        onSearch={onSearch}
        allowClear
      />
    </div>
  )
}

export default SearchFriend