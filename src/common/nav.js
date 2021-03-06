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
      },
      {
        name: 'rxjs',
        icon: 'dashboard',
        path: 'rxjs',
        children: [
          {
            name: '学习1',
            icon: 'dashboard',
            path: 'studyone',
            component: createLoadable(() => import('components/RxStudy/One'))
          }
        ]
      },
      {
        name: 'react-spring',
        icon: 'dashboard',
        path: 'spring',
        children: [
          {
            name: 'demo',
            icon: '',
            path: 'one',
            component: createLoadable(() => import('components/Spring/demo'))
          }
        ]
      },
      {
        name: '性能优化',
        icon: 'dashboard',
        path: 'data',
        children: [
          {
            name: '数据渲染(时间分片)',
            icon: '',
            path: 'dateSiding',
            component: createLoadable(() => import('components/Data/DateSiding'))
          },
          {
            name: '数据渲染(虚拟列表)',
            icon: '',
            path: 'virtualList',
            component: createLoadable(() => import('components/Data/VirtualList'))
          }
        ]
      },
    ]
  }
]