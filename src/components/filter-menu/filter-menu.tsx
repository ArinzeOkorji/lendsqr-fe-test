import { useRef } from 'react';
import './filter-menu.scss';
import { IUser } from '../../interface/user';
import { IfilterParams } from '../../interface/filter';


export function FilterOption(
    { organizationList, filterData, resetFilter }:
    { organizationList: string[], filterData: Function, resetFilter: Function }
    ) {
    const organizationFieldRef = useRef<HTMLSelectElement>(null);
    const usernameFieldRef = useRef<HTMLInputElement>(null);
    const emailFieldRef = useRef<HTMLInputElement>(null);
    const dateJoinedFieldRef = useRef<HTMLInputElement>(null);
    const phoneFieldRef = useRef<HTMLInputElement>(null);
    const statusFieldRef = useRef<HTMLSelectElement>(null);

    function filter() {

        let filterParams: IfilterParams = {};
        const organization = organizationFieldRef.current?.value;
        const username = usernameFieldRef.current?.value;
        const email = emailFieldRef.current?.value;
        const dateJoined = dateJoinedFieldRef.current?.value;
        const phone = phoneFieldRef.current?.value;
        const status = statusFieldRef.current?.value;

        if (organization) {
            filterParams.organizatin = organization
        }

        if (username) {
            filterParams['personalInformation.fullname'] = username
        }

        if (email) {
            filterParams['personalInformation.email'] = email
        }
        if (dateJoined) {
            filterParams.dateJoined = dateJoined
        }
        if (phone) {
            filterParams['personalInformation.phone'] = phone
        }
        if (status) {
            filterParams.status = status
        }

        filterData(filterParams);


    }

    function reset() {
        organizationFieldRef.current ? organizationFieldRef.current.value = '' : null;
        usernameFieldRef.current ? usernameFieldRef.current.value = '' : null;
        emailFieldRef.current ? emailFieldRef.current.value = '' : null;
        dateJoinedFieldRef.current ? dateJoinedFieldRef.current.value = '' : null;
        phoneFieldRef.current ? phoneFieldRef.current.value = '' : null;
        statusFieldRef.current ? statusFieldRef.current.value = '' : null;

        resetFilter()
    }


    return <>
        <div className="filterMenu">
            <form>
                <div className="mb-3">
                    <label htmlFor="organization" className="form-label fw-500 text-color-1 fs-14">Organization</label>
                    <select className="form-select" aria-label="Default select example" ref={organizationFieldRef}>
                        <option value=''>Select</option>
                        {
                            organizationList.map((organization, index: number) => {
                                return <option key={index} value={organization}>{organization}</option>
                            })
                        }

                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label fw-500 text-color-1 fs-14">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="User" ref={usernameFieldRef} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-500 text-color-1 fs-14">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Email" ref={emailFieldRef} />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label fw-500 text-color-1 fs-14">Date</label>
                    <input type="date" className="form-control" id="date" placeholder="Date" ref={dateJoinedFieldRef} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label fw-500 text-color-1 fs-14">Phone Number</label>
                    <input type="phone" className="form-control" id="phoneNumber" placeholder="Phone Number" ref={phoneFieldRef} />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label fw-500 text-color-1 fs-14">Status</label>
                    <select className="form-select" aria-label="Default select example" ref={statusFieldRef}>
                        <option value=''>Select</option>
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="blacklisted">Blacklisted</option>
                    </select>
                </div>

                <div>
                    <div className="d-flex align-items-center button-container">
                        <button type='button' className='button-grey-outline' onClick={reset}>Reset</button>
                        <button type='button' className='button-primary' onClick={filter}>Filter</button>
                    </div>
                </div>
            </form>
        </div>
    </>
}