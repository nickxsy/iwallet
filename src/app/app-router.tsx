import { RouterProvider, createBrowserRouter } from 'react-router';

import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { SettingsPage } from '@/pages/settings';
import { TransactionPage } from '@/pages/transaction';

import { RootLayout } from '@/widgets/root-layout';

import { ROUTER_PATHS } from '@/shared/const';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: ROUTER_PATHS.TRANSACTION,
        element: <TransactionPage />
      },
      {
        path: ROUTER_PATHS.SETTINGS,
        element: <SettingsPage />
      },
      {
        path: ROUTER_PATHS.LOGIN,
        element: <LoginPage />
      },
      {
        path: ROUTER_PATHS.NOT_FOUND,
        element: <div>404</div>
      }
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
