import { Button, Tooltip } from 'antd';
import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import React from 'react';

export interface IButtonIconProps {
  textTooltip: string,
  Icon: React.ForwardRefExoticComponent<Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>,
  positionRight?: boolean,
  textButton?: string
}

const ButtonIcon: React.FC<IButtonIconProps> = ({ textTooltip, Icon, positionRight, textButton }) => {
  return (
    <Tooltip title={textTooltip}>
      <Button
        icon={<Icon />}
        className={`${positionRight ? 'ml-[10px]' : 'mr-[10px]'}`}
      >
        {textButton}
      </Button>
    </Tooltip>
  )
}

export default ButtonIcon