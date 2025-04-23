import { Link } from 'react-router';

import { ROUTER_PATHS } from '@/shared/const';

export const Header = () => {
  return (
    <header className="py-4">
      <nav className="flex gap-3">
        <Link to={ROUTER_PATHS.HOME}>Home</Link>
        <Link to={ROUTER_PATHS.SETTINGS}>Settings</Link>
        <Link to={ROUTER_PATHS.LOGIN}>Sign in</Link>
      </nav>
      <div className="text-center flex flex-col items-center">
        <h1 className="text-2xl">wallet+</h1>
        <p className="text-sm mt-2 max-w-[300px]">
          Это приложение для отслеживания доходов и расходов
        </p>
      </div>
    </header>
  );
};
