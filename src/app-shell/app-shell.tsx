import { Outlet, useNavigate } from 'react-router-dom';
import './app-shell.scss';
import { Menu } from './menu/menu';

export function AppShell() {
    const navigator = useNavigate();

    function logout() {
        localStorage.clear();
        navigator('/login');
    }

    return <>
        <div>
            <div className="header-tab">
                <div className="navbar justify-content-start logo align-content-end align-content-md-center d-flex ">
                    <span className="navbar-toggler-icon d-lg-none ms-3 me-4" data-bs-toggle="offcanvas" data-bs-target="#menu" aria-controls="menu"></span> <img src="/src/assets/logo.svg" alt="" />
                </div>

                <div className='search d-flex align-items-center justify-content-around justify-content-lg-start'>
                    <div className='d-flex'>
                        <input type="text" className='border-grey rounded-start border-end-0' placeholder='Search for anything' />
                        <button className='button-primary rounded-start-0'>
                            <img src="/src/assets/icons/search.svg" alt="" />
                        </button>
                    </div>
                </div>

                <div className="d-flex flex-column flex-md-row align-items-center justify-content-md-end justify-content-between profile text-color-1">
                    <div className="d-flex notification-container align-items-end justify-content-between">
                        <div className='text-color-1 text-decoration-underline docs-text'>
                            Docs
                        </div>
                        <div>
                            <img src="/src/assets/icons/notification.svg" alt="" />
                        </div>
                    </div>
                    <div>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle py-0 py-lg-2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <div className="d-inline-flex align-items-center">
                                        <div className="avatar">
                                            <img src="/src/assets/images/avatar.png" className='rounded-circle w-100' alt="" />
                                        </div>
                                        <span className="ms-2 fw-500">Adedeji</span>
                                    </div>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className='px-2' onClick={logout}>Logout</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="main">
                <div className="menu-list d-none d-lg-block">

                    <Menu />
                </div>
                <div className="offcanvas offcanvas-start d-lg-none" tab-index="-1" id="menu" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header">
                        <img src="/src/assets/logo.svg" alt="" />
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body ps-0">
                        <div>
                            <Menu data-bs-dismiss="offcanvas" />
                        </div>
                    </div>
                </div>

                <div className="content">
                    <Outlet />
                </div>
            </div>
        </div>
    </>
}