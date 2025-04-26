import { Outlet } from 'react-router';

import { Navbar } from '@/widgets/navbar';

import { Container } from '@/shared/ui/container';
import { ScrollArea } from '@/shared/ui/scroll-area';

export const RootLayout = () => {
  return (
    <div className="flex h-screen flex-col pt-2">
      <Container
        asChild
        className="flex-1 overflow-hidden rounded-2xl bg-white"
      >
        <ScrollArea className="h-full flex-1">
          <main className="h-full flex-1">
            <Outlet />
          </main>
        </ScrollArea>
      </Container>
      <div className="py-2.5">
        <Container asChild className="flex-none">
          <Navbar />
        </Container>
      </div>
    </div>
  );
};
