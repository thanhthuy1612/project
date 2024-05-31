import React from 'react';
import ListItemFriend from './components/listFriend/ListItemFriend';
import SearchFriend from './components/listFriend/SearchFriend';

const ListFriend: React.FC = () => {

  return (
    <div className=' h-[100%]'>
      <SearchFriend />
      <ListItemFriend />
    </div>
  )
}

export default ListFriend