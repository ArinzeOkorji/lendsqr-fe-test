import { NavLink } from 'react-router-dom';
import './nav-link.scss';

interface props {
    name: string,
    classes: string
}
export function Nav(prop: props) {
    const { name, classes } = prop
    return <>
        <NavLink to={`/${name}`} 
        className={({ isActive, isPending }: { isActive: boolean, isPending: boolean }): string => {
            return `${classes} d-inline-flex align-items-center menu-item text-color-1 text-capitalize w-100 ${isActive
                ? "active"
                : isPending
                    ? ""
                    : "opacity-60"}`
        }}
        >

            <div>
                <img src={`/src/assets/icons/${name}.svg`} alt="" className='me-2' /> {name}
            </div>
        </NavLink>

    </>
}