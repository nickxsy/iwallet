import {
  HomeIcon,
  LogInIcon,
  LucideIcon,
  SettingsIcon,
  TractorIcon
} from 'lucide-react';
import { NavLink } from 'react-router';

import { ROUTER_PATHS, RouterPaths } from '@/shared/const';
import { cn } from '@/shared/lib';

type NavbarLinks = {
  to: RouterPaths;
  icon: LucideIcon;
};

const links: NavbarLinks[] = [
  {
    to: ROUTER_PATHS.HOME,
    icon: HomeIcon
  },
  {
    to: ROUTER_PATHS.TRANSACTION,
    icon: TractorIcon
  },
  {
    to: ROUTER_PATHS.LOGIN,
    icon: LogInIcon
  },
  {
    to: ROUTER_PATHS.SETTINGS,
    icon: SettingsIcon
  }
];

const NavbarItem = ({ Icon, to }: { Icon: LucideIcon; to: RouterPaths }) => {
  return (
    <li className="flex-1">
      <NavLink
        className="flex h-10 w-full items-center justify-center rounded-2xl transition-all duration-300 hover:bg-amber-300 aria-[current]:bg-amber-300"
        to={to}
      >
        <Icon />
      </NavLink>
    </li>
  );
};

export const Navbar = ({ className }: { className?: string }) => {
  return (
    <div className={cn('rounded-full bg-amber-200 py-3', className)}>
      <nav className="rounded-full">
        <ul className="flex text-center">
          {links.map(({ icon: Icon, to }) => (
            <NavbarItem key={to} to={to} Icon={Icon} />
          ))}
        </ul>
      </nav>
    </div>
  );
};
