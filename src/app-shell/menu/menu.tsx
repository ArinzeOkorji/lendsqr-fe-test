import { Nav } from '../nav-link/nav-link';
import './menu.scss';

import switchOrganization from '../../assets/icons/switch organization.svg';

export function Menu() {
    const navData: {section: string, links: string[]}[] = [
        {
            section: 'Customers',
            links: ['users', 'guarantors', 'loans', 'decision models', 'savings', 'loan requests', 'whitelist', 'karma']
        },
        {
            section: 'Businesses',
            links: ['organization', 'loan products', 'savings products', 'fees and charges', 'transactions', 'services', 'service account', 'settlements', 'reports']
        },
        {
            section: 'Settings',
            links: ['preferences', 'fees and pricing', 'audit logs']
        }
    ]
    return <>
        <div className="mb-3">
            <div className="dropdown swithOrganization">
                <div className="text-color-1 dropdown-toggle border-0" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="d-inline-flex align-items-center menu-item">
                        <img src={switchOrganization} alt="" className='me-2' /> Switch Organization
                    </div>
                </div>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Lendsqr</a></li>
                    <li><a className="dropdown-item" href="#">Another Organization</a></li>
                    <li><a className="dropdown-item" href="#">Yet Another Organization</a></li>
                </ul>
            </div>

            <ul className='links'>
                <li>
                <Nav name={'dashboard'} classes={' dashboard'}/>
                </li>
            </ul>


            {
                navData.map((data, index) => {
                    return (
                    <div key={index}>
                        <div className='menu-item fw-500 text-color-2 text-uppercase fs-12 sectionTitle'>{data.section}</div>
                        <ul className='links'>
                        {
                            data.links.map((link, linkIndex) => {
                                return <li key={linkIndex}><Nav name={link} classes={''}/></li>
                            })
                        }
                        </ul>
                        
                    </div>
                    )
                        
                
                })
            }



        </div>
    </>
}