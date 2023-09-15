import { useEffect, useState } from 'react';
import './user-details.scss';
import { IUser } from '../../interface/user';
import { ErrorPage } from '../error/error-page';
import { useNavigate } from 'react-router-dom';

export function UserDetails() {
    const [user, setUser] = useState<IUser>()
    const navigator = useNavigate();

    useEffect(() => {
        const user: IUser = JSON.parse(localStorage.getItem('user') || '')

        if (user) {
            setUser(user);
        }
    }, [])

    function goBack() {
        navigator(-1);
    }

    return <>
        <div>
            <div className="d-flex align-items-center back" onClick={goBack}>
                <img src="/src/assets/icons/back-arrow.svg" alt="" />
                <div className='text-color-2'>Back to Users</div>
            </div>

            <div className="d-flex align-items-center justify-content-between title-container">
                <div>
                    <h3 className='fs-24 fw-500 text-color-1 m-0'>User Details</h3>
                </div>

                <div className="button-container d-flex align-items-center">
                    <button className='button-red-outline'>Blacklist User</button>
                    <button className='button-primary-outline'>Activate User</button>
                </div>
            </div>

            <div className='tabs-container rounded bg-white'>
                <div className="d-flex flex-column justify-content-center justify-content-md-start flex-md-row align-items-center">
                    <div className="avatar-container rounded-circle d-flex align-items-center justify-content-center">
                        <img src="/src/assets/icons/avatar-icon.svg" alt="" />
                    </div>
                    <div className="account-info d-flex flex-column justify-content-center flex-md-row align-items-md-center">
                        <div className="d-flex flex-column h-100 justify-content-center align-items-center align-items-md-start">
                            <div className='text-color-1 fw-500 fs-22'>{user?.personalInformation.fullname}</div>
                            <div className='text-color-2 fs-14'>{user?.guid.slice(0, 11)}</div>
                        </div>
                        <div className="d-flex flex-md-column h-100 justify-content-center align-items-center align-items-md-start mt-3 mt-md-0">
                            <div className='text-color-1 fw-500 fs-14'>User's Tier</div>
                            <div className="d-flex align-items-center tier-container">
                                {
                                    Array.from(Array(3).keys()).map((_key: number, index: number) => {
                                        return <div key={index}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill='none' className={`${user?.tier && user?.tier >= index + 1 ? 'd-none' : ''}`}>
                                                <g clipPath="url(#clip0_5530_1562)">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.98439 0.959992C7.85189 0.966867 7.73688 1.05437 7.69563 1.18062L6.08939 5.99998H0.945073V6.0006C0.806948 6.0006 0.684449 6.08935 0.641953 6.2206C0.598828 6.35185 0.645078 6.49561 0.755703 6.5781L4.93442 9.63379L3.32818 14.6213V14.6207C3.28506 14.7532 3.33256 14.8976 3.44506 14.9788C3.55756 15.0607 3.70943 15.0601 3.82131 14.9782L8.00003 11.9225L12.1788 14.9782C12.2906 15.0601 12.4425 15.0607 12.555 14.9788C12.6675 14.8976 12.715 14.7532 12.6719 14.6207L11.0656 9.63316L15.2444 6.57748V6.5781C15.355 6.49561 15.4012 6.35185 15.3581 6.2206C15.3156 6.08935 15.1931 6.0006 15.055 6.0006H9.91068L8.30444 1.18124V1.18062C8.26006 1.04374 8.1288 0.953112 7.98444 0.959992H7.98439ZM8.00001 2.29374L9.37564 6.41998V6.4206C9.41814 6.55185 9.54127 6.64122 9.68001 6.6406H14.0738L10.4987 9.255V9.25563C10.3875 9.33688 10.3406 9.48062 10.3831 9.61251L11.7587 13.8807L8.1893 11.2712H8.18867C8.07617 11.1887 7.92368 11.1887 7.81117 11.2712L4.24173 13.8807L5.61736 9.61251H5.61673C5.65923 9.48063 5.61236 9.33687 5.50111 9.25563L1.92607 6.64123H6.31983V6.6406C6.45858 6.64123 6.5817 6.55185 6.6242 6.4206L7.99983 2.29436L8.00001 2.29374Z" fill="#E9B200" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_5530_1562">
                                                        <rect width="16" height="16" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className={`${user?.tier && user?.tier >= index + 1 ? '' : 'd-none'}`}>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M7.98572 1.28751C7.85197 1.29314 7.73572 1.38126 7.69447 1.50876L6.18759 6.17996L1.28071 6.16996C1.14196 6.16996 1.01821 6.25934 0.975716 6.39121C0.932591 6.52371 0.980091 6.66809 1.09259 6.74996L5.06891 9.62676L3.54203 14.293C3.49891 14.4249 3.54578 14.5699 3.65828 14.6511C3.77016 14.733 3.92265 14.733 4.03454 14.6511L7.9995 11.758L11.9657 14.6511C12.0776 14.733 12.2301 14.733 12.342 14.6511C12.4545 14.5699 12.5014 14.4249 12.4582 14.293L10.9314 9.62676L14.9077 6.74996C15.0202 6.66809 15.0677 6.52371 15.0246 6.39121C14.9814 6.25933 14.8583 6.16996 14.7196 6.17059L9.81269 6.18059L8.30393 1.50939V1.50876C8.25956 1.37188 8.12957 1.28188 7.98581 1.28751L7.98572 1.28751Z" fill="#E9B200" />
                                            </svg>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="d-flex flex-column h-100 justify-content-center align-items-center align-items-md-start mt-3 mt-md-0">
                            <div className='text-color-1 fw-500 fs-22'>₦{user?.loan}</div>
                            <div className='text-color-2 fs-14'>{user?.bankDetails.accountNunber}/{user?.bankDetails.bank}</div>
                        </div>
                    </div>
                </div>

                <div className='nav-tabs-container'>
                    <ul className="nav  mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <div className="nav-link active" id="pills-general-details-tab" data-bs-toggle="pill" data-bs-target="#pills-general-details" role="tab" aria-controls="pills-general-details" aria-selected="true">General Details</div>
                        </li>
                        <li className="nav-item" role="presentation">
                            <div className="nav-link" id="pills-documents-tab" data-bs-toggle="pill" data-bs-target="#pills-documents" role="tab" aria-controls="pills-documents" aria-selected="false">Documents</div>
                        </li>
                        <li className="nav-item" role="presentation">
                            <div className="nav-link" id="pills-bank-details-tab" data-bs-toggle="pill" data-bs-target="#pills-bank-details" role="tab" aria-controls="pills-bank-details" aria-selected="false">Bank Details</div>
                        </li>
                        <li className="nav-item" role="presentation">
                            <div className="nav-link" id="pills-loans-tab" data-bs-toggle="pill" data-bs-target="#pills-loans" role="tab" aria-controls="pills-loans" aria-selected="false">Loans</div>
                        </li>
                        <li className="nav-item" role="presentation">
                            <div className="nav-link" id="pills-savings-tab" data-bs-toggle="pill" data-bs-target="#pills-savings" role="tab" aria-controls="pills-savings" aria-selected="false">Savings</div>
                        </li>
                        <li className="nav-item" role="presentation">
                            <div className="nav-link" id="pills-app-and-system-tab" data-bs-toggle="pill" data-bs-target="#pills-app-and-system" role="tab" aria-controls="pills-app-and-system" aria-selected="false">App and System</div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="tabs-container panels rounded bg-white">

                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-general-details" role="tabpanel" aria-labelledby="pills-general-details-tab" tab-index="0">
                        <div className='panel-sectiom'>
                            <div className='m-0 fw-500 text-color-1'>Personal Information</div>

                            <div>
                                <ul>
                                    <li>
                                        <label className='text-color-2 fs-12'>Full Name</label>
                                        <div className='fw-500 text-color-2'>{user?.personalInformation.fullname}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>Phone Number</label>
                                        <div className='fw-500 text-color-2'>{user?.personalInformation.phone}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>Email Address</label>
                                        <div className='fw-500 text-color-2'>{user?.personalInformation.email}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>Bvn</label>
                                        <div className='fw-500 text-color-2'>{user?.bankDetails.bvn}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>Gender</label>
                                        <div className='fw-500 text-color-2'>{user?.personalInformation.gender}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>Marital status</label>
                                        <div className='fw-500 text-color-2'>{user?.personalInformation.maritalStatus}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>Children</label>
                                        <div className='fw-500 text-color-2'>{user?.personalInformation.numberOfChildren}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>Type of residence</label>
                                        <div className='fw-500 text-color-2'>{user?.personalInformation.residenceType}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='panel-sectiom'>
                            <div className='m-0 fw-500 text-color-1'>Education and Employment</div>

                            <div>
                                <ul>
                                    <li>
                                        <label className='text-color-2 fs-12'>Level Of Education</label>
                                        <div className='fw-500 text-color-2'>{user?.educationAndEmployment.educationLevel}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>Employment Status</label>
                                        <div className='fw-500 text-color-2'>{user?.educationAndEmployment.employmentStatus}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>sector of employment</label>
                                        <div className='fw-500 text-color-2'>{user?.educationAndEmployment.sectionOfEmployment}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>Duration of employment</label>
                                        <div className='fw-500 text-color-2'>{user?.educationAndEmployment.employmentDuration}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>office email</label>
                                        <div className='fw-500 text-color-2'>{user?.educationAndEmployment.officialEmail}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>Monthly income</label>
                                        <div className='fw-500 text-color-2'>{user?.educationAndEmployment.monthlyIncome}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>loan repayment</label>
                                        <div className='fw-500 text-color-2'>{user?.educationAndEmployment.loanAmount}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='panel-sectiom'>
                            <div className='m-0 fw-500 text-color-1'>Socials</div>

                            <div>
                                <ul>
                                    <li>
                                        <label className='text-color-2 fs-12'>Twitter</label>
                                        <div className='fw-500 text-color-2'>{user?.personalInformation.fullname}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>Facebook</label>
                                        <div className='fw-500 text-color-2'>{user?.personalInformation.fullname}</div>
                                    </li>
                                    <li>
                                        <label className='text-color-2 fs-12'>Instagram</label>
                                        <div className='fw-500 text-color-2'>{user?.personalInformation.fullname}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='panel-sectiom'>
                            <div className='m-0 fw-500 text-color-1'>Guarantor</div>

                            {
                                user?.guarantors.map((guarantor, indexKey: number) => {
                                    return <div key={indexKey}>
                                        <ul>
                                            <li>
                                                <label className='text-color-2 fs-12'>Full Name</label>
                                                <div className='fw-500 text-color-2'>{guarantor.fullname}</div>
                                            </li>
                                            <li>
                                                <label className='text-color-2 fs-12'>Phone Number</label>
                                                <div className='fw-500 text-color-2'>{guarantor.phone}</div>
                                            </li>
                                            <li>
                                                <label className='text-color-2 fs-12'>Email Address</label>
                                                <div className='fw-500 text-color-2'>{guarantor.email}</div>
                                            </li>
                                            <li>
                                                <label className='text-color-2 fs-12'>Relationship</label>
                                                <div className='fw-500 text-color-2'>{guarantor.relationship}</div>
                                            </li>
                                        </ul>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="tab-pane fade" id="pills-documents" role="tabpanel" aria-labelledby="pills-documents-tab" tab-index="0"><ErrorPage message='General Details'/></div>
                    <div className="tab-pane fade" id="pills-bank-details" role="tabpanel" aria-labelledby="pills-bank-details-tab" tab-index="0"><ErrorPage message='General Details'/></div>
                    <div className="tab-pane fade" id="pills-loans" role="tabpanel" aria-labelledby="pills-loans-tab" tab-index="0"><ErrorPage message='General Details'/></div>
                    <div className="tab-pane fade" id="pills-savings" role="tabpanel" aria-labelledby="pills-savings-tab" tab-index="0"><ErrorPage message='General Details'/></div>
                    <div className="tab-pane fade" id="pills-app-and-system" role="tabpanel" aria-labelledby="pills-app-and-system-tab" tab-index="0"><ErrorPage message='General Details'/></div>
                </div>
            </div>
        </div>
    </>
}