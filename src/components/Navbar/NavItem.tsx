import { Link, LinkProps } from "react-router-dom"
export type INavItemProps = LinkProps & React.RefAttributes<HTMLAnchorElement>

export const NavItem = (props: INavItemProps) => {
    const { to, children } = props;
    return <Link to={to}>
        {children}
    </Link>
}