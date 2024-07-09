import React from 'react';
import ErrorAuthorized from '../error/ErrorAuthorized';
import DefaultLayout from './DefaultLayout';


export interface ICustomRouteProps {
  element: JSX.Element;
  isPrivate: boolean;
}

const CustomLayout: React.FC<ICustomRouteProps> = ({ element, isPrivate }) => {
  const accessToken = localStorage.getItem('token');
  return !accessToken && isPrivate ? (
    <DefaultLayout><ErrorAuthorized /></DefaultLayout>
  ) : (
    element
  );
};

export default CustomLayout;