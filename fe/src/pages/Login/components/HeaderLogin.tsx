import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

export interface IHeader {
  title: string;
  Component: React.ForwardRefExoticComponent<Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>
}

const HeaderLogin: React.FC<IHeader> = (props) => {
  const { title, Component } = props
  return (
    <div className='mb-[50px] flex items-center'>
      <Component className='text-primaryBlueDark border-primaryBlueDark border-[2px] p-[10px] rounded-[50%]' style={{ fontSize: '20px' }} />
      <div className='text-[40px] mx-[20px] text-primaryBlueDark'>{title}</div>
    </div>
  )
}

export default HeaderLogin