import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '@/layouts/full/shared/loadable/Loadable';

const FullLayout = Loadable(lazy(() => import('@/layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('@/layouts/blank/BlankLayout')));

const Dashboard = Loadable(lazy(() => import('@/views/dashboard/Dashboard')));
const SamplePage = Loadable(lazy(() => import('@/views/sample-page/SamplePage')));
const Icons = Loadable(lazy(() => import('@/views/icons/Icons')));
const TypographyPage = Loadable(lazy(() => import('@/views/utilities/TypographyPage')));
const Shadow = Loadable(lazy(() => import('@/views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('@/views/authentication/Error')));
const Register = Loadable(lazy(() => import('@/views/authentication/Register')));
const Login = Loadable(lazy(() => import('@/views/authentication/Login')));
const UserManagementPage = Loadable(lazy(() => import('@/views/user-management/UserManagementPage')));
const MissionList = Loadable(lazy(() => import('@/components/mission-management/MissionList')));
const CommentList = Loadable(lazy(() => import('@/components/comment-management/CommentList')));
const MyProfile = Loadable(lazy(() => import('@/views/profile-page/MyProfile')));
const MyTasks = Loadable(lazy(() => import('@/views/profile-page/MyTasks')));
const NotificationProvider = Loadable(lazy(() => import('@/context/NotificationContext')));
const NotificationPage = Loadable(lazy(() => import('@/components/notification-management/NotificationPage')));

const RouterConfig = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/authentication/login" /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/sample-page', element: <SamplePage /> },
      { path: '/icons', element: <Icons /> },
      { path: '/ui/typography', element: <TypographyPage /> },
      { path: '/ui/shadow', element: <Shadow /> },
      // { path: '/user/register', element: <Register /> },  
      // { path: '/authentication/login', element: <Login /> },  
      { path: '/usermanagement', element: <UserManagementPage /> },
      { path: '/mission-management', element: <MissionList /> },
      { path: '/comment-management', element: <CommentList /> },
      { path: '/myprofile', element: <MyProfile /> },
      { path: '/mytasks', element: <MyTasks /> },
      { path: '/notify-management', element: <NotificationPage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      // { path: '/authentication/login', element: <Login /> },  
      // { path: '/user/register', element: <Register /> },  
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },


  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/authentication/login', element: <Login /> },
      { path: '/user/register', element: <Register /> },
    ],
  },



];

export default RouterConfig;
