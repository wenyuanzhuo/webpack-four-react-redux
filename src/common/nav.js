import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

function Loading({ error, pastDelay }) {
  return (
    <Spin
      size="large"
      spinning={pastDelay}
    >
      <div>{error}</div>
    </Spin>
 );
}

const createLoadable = component => Loadable({
  loader: () => component(),
  loading: Loading,
})

export const getNavData = [
  {
    name: '用户页',
    path: '/user',
    layout: 'UserLayout',
    component: createLoadable(() => import('layouts/UserLayout')),
    children: [
      {
        name: '账户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: createLoadable(() => import('components/User/Login')),
          },
          {
            name: '注册',
            path: 'register',
            component: createLoadable(() => import('components/User/Register')),
          }
        ]
      }
    ]   
  },
  {
    name: '首页',
    path: '/home',
    layout: 'BasicLayout',
    component: createLoadable(() => import('layouts/BasicLayout')),
    children: [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
          {
            name: '数据概览',
            icon: 'dashboard',
            path: 'overview',
            component: createLoadable(() => import('components/Overview'))
          }
        ]
      },
      {
        name: '图片上传',
        icon: 'upload',
        path: 'uploadpicture',
        component: createLoadable(() => import('components/UploadPicture'))
      },
      {
        name: '图片批量上传',
        icon: 'upload',
        path: 'uploadpictureList',
        component: createLoadable(() => import('components/UploadPictureList'))
      }
    ]
  }
]