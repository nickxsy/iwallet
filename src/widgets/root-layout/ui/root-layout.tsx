import { Outlet } from 'react-router';

import { Header } from '@/widgets/header';

import { Container } from '@/shared/ui/container';

export const RootLayout = () => {
  return (
    <div className="py-2 h-screen">
      <Container className="relative flex flex-col bg-white h-full rounded-2xl overflow-y-auto overflow-x-hidden">
        <Header />
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
      </Container>
    </div>
  );
};
