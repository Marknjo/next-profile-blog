import { GenericProps } from '../../types';
import MainNav from './MainNav';

function MainLayout({ children }: GenericProps) {
  return (
    <>
      <MainNav />
      <main>{children}</main>
    </>
  );
}

export default MainLayout;
