import React, { CSSProperties } from 'react';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import { Collapse, CollapseProps, theme } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const Password: React.FC = () => {
  const [activeKey, setActiveKey] = React.useState<string[]>(['1'])
  const { token } = theme.useToken();

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
      key: '1',
      label: 'Change Password',
      children: <ChangePassword />,
      style: panelStyle,
    },
    {
      key: '2',
      label: 'Change Email',
      children: <ChangeEmail />,
      style: panelStyle,
    }
  ];

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const handleChange = (key: string | string[]) => {
    if (!key.length) {
      setActiveKey([])
      return
    }
    setActiveKey([key[key.length - 1]])
  }

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      items={getItems(panelStyle)}
      activeKey={activeKey}
      onChange={handleChange}
    />
  )
}

export default Password