import { Link } from 'react-router-dom';
import { INavItemProps } from '../../types';

export const NavItem = (props: INavItemProps) => {
    const { to, children } = props;
    return <Link to={to}>{children}</Link>;
};
