import { Collapse, Descriptions, DescriptionsProps, theme } from 'antd';
import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { dateFormat } from '../../utils/useTime';
import { DateFormatType } from '../../enum/IDateType';

export interface IProfileInfoProps {
  username?: string,
  email?: string,
  timeJoin?: Date,
  gender?: string,
  bio?: string,
  phone?: string,
  prefix?: string
}

const ProfileInfo: React.FC<IProfileInfoProps> = (
  { username, email, timeJoin, gender, bio, phone, prefix }
) => {
  const [activeKey, setActiveKey] = React.useState<string[]>(['1'])

  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    // marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'UserName',
      children: username,
    },
    {
      key: '2',
      label: 'Email',
      children: email,
    },
    {
      key: '3',
      label: 'Time Join',
      children: timeJoin && dateFormat(timeJoin, DateFormatType.FullDate),
    },
    {
      key: '4',
      label: 'Gender',
      children: gender,
    },
    {
      key: '5',
      label: 'Bio',
      children: bio,
    },
    {
      key: '6',
      label: 'Phone',
      children: phone && `${prefix} ${phone}`,
    },
  ];

  const handleChange = (key: string | string[]) => {
    if (!key.length) {
      setActiveKey([])
      return
    }
    setActiveKey([key[key.length - 1]])
  }

  const renderDescription = () => (
    <Descriptions
      items={items}
      bordered
      layout='horizontal'
      column={1}
    />
  )

  return (
    <Collapse
      bordered
      className='shadow-md'
      activeKey={activeKey}
      onChange={handleChange}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      items={[
        {
          key: '1',
          label: "User Info",
          children: renderDescription(),
          style: panelStyle,
        },
        {
          key: '2',
          label: "Friends",
          children: renderDescription(),
          style: panelStyle,
        },
      ]}
    />
  );
}

export default ProfileInfo