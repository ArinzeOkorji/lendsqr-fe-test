import { useEffect, useState } from 'react';
import { Card, cardData } from '../card/card';
import './users.scss';

import axios from 'axios';
import { IUser, IUsersSummary } from '../../interface/user';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { FilterOption  } from '../filter-menu/filter-menu';
import { IfilterParams } from '../../interface/filter';

import kebab from '../../assets/icons/kebab.svg';
import eye from '../../assets/icons/eye.svg';
import blacklistUser from '../../assets/images/blacklist-user.png';
import activateUser from '../../assets/images/activate-user.png';
import caretLeft from '../../assets/icons/caret-left.svg';
import caretRight from '../../assets/icons/caret-right.svg';

export function Users() {
    let itemOffset = 0;
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [usersDataSet, setUsersDataSet] = useState<IUser[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [currentItems, setCurrentItems] = useState<IUser[]>([]);
    const [organizations, setOrganizations] = useState<string[]>([])
    const navigator = useNavigate();
    // let usersDataSet: IUser[] = [];

    function viewDetails(user: IUser) {
        localStorage.setItem('user', JSON.stringify(user));
        navigator('/app/users/details')
    }

    function sortCurrentData(payload: { data?: IUser[], itemsPerPage: number, itemOffset?: number }) {
        // const {data, itemsPerPage = itemsPerPage, itemOffset} = payload;

        let endOffset: number = itemOffset + itemsPerPage;

        setPageCount(payload.data ? Math.ceil(payload.data.length / payload.itemsPerPage || itemsPerPage) : Math.ceil(usersDataSet.length / payload.itemsPerPage || itemsPerPage));
        setCurrentItems(payload.data ? payload.data.slice(payload.itemOffset || itemOffset, endOffset) : usersDataSet.slice(payload.itemOffset || itemOffset, endOffset));

    }

    const [cardData, setCardData] = useState<cardData[]>([
        {
            icon: 'users-pink',
            title: 'Users',
            color: 'bg-pink-1',
            value: 0
        },
        {
            icon: 'active users-purple',
            title: 'Active Users',
            color: 'bg-purple-1',
            value: 0
        },
        {
            icon: 'users with loan-orange',
            title: 'Users with Loans',
            color: 'bg-orange-1',
            value: 0
        },
        {
            icon: 'users with savings-red',
            title: 'Users with Savings',
            color: 'bg-red-1',
            value: 0
        },
    ])

    async function fetchAllUsersData() {
        // setUsersDataSet([])
        const url = 'https://demo0007135.mockable.io/';
        try {
            const { data }: { data: IUser[] } = await axios.get(url);

            const organizationsList = new Set<string>()

            data.forEach((item) => {
                organizationsList.add(item.organizatin);
            })

            setOrganizations([...organizationsList]);

            setUsersDataSet(data);

            sortCurrentData({ data, itemsPerPage });

        } catch (error) {

        }
    }

    async function fetchUsersSummaryData() {
        // setUsersDataSet([])
        const url = 'http://demo0007135.mockable.io/users-summary';
        try {
            const { data }: { data: IUsersSummary } = await axios.get(url);

            cardData.forEach((card, index: number) => {
                card.value = Object.values(data)[index];
            })

            setCardData(cardData)

        } catch (error) {

        }
    }


    useEffect(() => {


        fetchAllUsersData();
        fetchUsersSummaryData();
        // return () => {true}

    }, [])

    // Invoke when user click to request another page.
    const handlePageClick = (event: { selected: number; }) => {
        itemOffset = (event.selected * itemsPerPage) % usersDataSet.length;
        sortCurrentData({ itemsPerPage, itemOffset });
    };

    function updateItemsPerPage(e: any) {
        const newItemsPerPage = parseInt(e.target.value)
        itemOffset = 0;
        setItemsPerPage(newItemsPerPage);

        sortCurrentData({ itemsPerPage: newItemsPerPage, itemOffset });
    }

    function filterData(filterParams: IfilterParams) {
        let filteredUserData: IUser[] = JSON.parse(JSON.stringify(usersDataSet));

        for (const item in filterParams) {

            filteredUserData = filteredUserData.filter((data) => {
                if (!item.includes('.')) {
                    return data[item as keyof IUser] === filterParams[item as keyof IfilterParams]
                } else {
                    const value = item.split('.').reduce(function (prev: any, key: any) {
                        return prev[key];
                    }, data)

                    return value.toLowerCase().includes(filterParams[item as keyof IfilterParams]?.toLowerCase())
                }
            })
        }


        itemOffset = 0;
        setItemsPerPage(10);
        sortCurrentData({ data: filteredUserData, itemOffset, itemsPerPage });
    }

    function resetFilter() {
        itemOffset = 0;
        setItemsPerPage(10);
        sortCurrentData({ itemOffset, itemsPerPage });
    }
    return <>
        <div>
            <div className=''>
                <h2 className='text-color-1 fw-500'>Users</h2>
            </div>

            <div className="card-row">
                {
                    cardData.map((data, index) => {
                        return <Card key={index} data={data} />
                    })
                }
            </div>


            <div className="table-container bg-white">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" className="text-uppercase text-color-1 fw-600 fs-12"><div className="d-flex align-items-center">Organization

                                    <div className="dropdown-center">
                                        <div className="" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="/src//assets/icons/filter.svg" alt="" />
                                        </div>
                                        <ul className="dropdown-menu options-container pt-0">
                                            <FilterOption resetFilter={resetFilter}  filterData={filterData} organizationList={organizations} />
                                        </ul>
                                    </div>

                                </div></th>
                                <th scope="col" className="text-uppercase text-color-1 fw-600 fs-12"> <div className="d-flex align-items-center">Username
                                    <div className="dropdown-center">
                                        <div className="" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="/src//assets/icons/filter.svg" alt="" />
                                        </div>
                                        <ul className="dropdown-menu options-container pt-0">
                                            <FilterOption resetFilter={resetFilter}  filterData={filterData} organizationList={organizations} />
                                        </ul>
                                    </div>
                                </div></th>
                                <th scope="col" className="text-uppercase text-color-1 fw-600 fs-12"> <div className="d-flex align-items-center">Email
                                    <div className="dropdown-center">
                                        <div className="" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="/src//assets/icons/filter.svg" alt="" />
                                        </div>
                                        <ul className="dropdown-menu options-container pt-0">
                                            <FilterOption resetFilter={resetFilter}  filterData={filterData} organizationList={organizations} />
                                        </ul>
                                    </div></div></th>
                                <th scope="col" className="text-uppercase text-color-1 fw-600 fs-12"> <div className="d-flex align-items-center">Phone number
                                    <div className="dropdown-center">
                                        <div className="" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="/src//assets/icons/filter.svg" alt="" />
                                        </div>
                                        <ul className="dropdown-menu options-container pt-0">
                                            <FilterOption resetFilter={resetFilter}  filterData={filterData} organizationList={organizations} />
                                        </ul>
                                    </div></div></th>
                                <th scope="col" className="text-uppercase text-color-1 fw-600 fs-12"> <div className="d-flex align-items-center">Date joined
                                    <div className="dropdown-center">
                                        <div className="" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="/src//assets/icons/filter.svg" alt="" />
                                        </div>
                                        <ul className="dropdown-menu options-container pt-0">
                                            <FilterOption resetFilter={resetFilter}  filterData={filterData} organizationList={organizations} />
                                        </ul>
                                    </div></div></th>
                                <th scope="col" className="text-uppercase text-color-1 fw-600 fs-12"> <div className="d-flex align-items-center">Status
                                    <div className="dropdown-center">
                                        <div className="" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="/src//assets/icons/filter.svg" alt="" />
                                        </div>
                                        <ul className="dropdown-menu options-container pt-0">
                                            <FilterOption resetFilter={resetFilter}  filterData={filterData} organizationList={organizations} />
                                        </ul>
                                    </div></div></th>
                                <th scope="col" className="text-uppercase text-color-1 fw-600 fs-12"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentItems.map((user: IUser, index: number) => {
                                    return <tr key={index}>
                                        <td>
                                            <div className='fs-14'>{user.organizatin}</div>
                                        </td>
                                        <td><div className='fs-14'>{user.personalInformation.fullname}</div></td>
                                        <td><div className='fs-14'>{user.personalInformation.email}</div></td>
                                        <td><div className='fs-14'>{user.personalInformation.phone}</div></td>
                                        <td><div className='fs-14'>{new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(user.dateJoined.toString().split(' ')[0]))}</div></td>
                                        <td>
                                            <div className='fs-14 status'><div className={`d-flex align-items-center justify-content-center rounded-pill fs-14 text-capitalize ${user.status === 'blacklisted' ? 'text-red bg-red-2' : ''} ${user.status === 'active' ? 'text-green bg-green-1' : ''} ${user.status === 'pending' ? 'text-yellow bg-yellow-1' : ''} ${user.status === 'inactive' ? 'text-color-2 bg-blue-1' : ''}`}>{user.status}</div></div>
                                        </td>
                                        <td>
                                            <div className='fs-14'>
                                                <div className="dropdown">
                                                    <div className="" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <img src={kebab} alt="" />
                                                    </div>
                                                    <ul className="dropdown-menu options-container">
                                                        <li><div className="dropdown-item" onClick={() => viewDetails(user)}>
                                                            <div className="d-flex align-items-center justify-content-around options fw-500 fs-14 text-color-2">
                                                                <img src={eye} alt="" />
                                                                View Details
                                                            </div>
                                                        </div></li>
                                                        <li><div className="dropdown-item">
                                                            <div className="d-flex align-items-center justify-content-around options fw-500 fs-14 text-color-2">
                                                                <img src={blacklistUser} alt="" />
                                                                Blacklist User
                                                            </div>
                                                        </div></li>
                                                        <li><div className="dropdown-item">
                                                            <div className="d-flex align-items-center justify-content-around options fw-500 fs-14 text-color-2">
                                                                <img src={activateUser} alt="" />
                                                                Activate User
                                                            </div>
                                                        </div></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div>

            </div>
                <div className="d-flex flex-column flex-xl-row align-items-center justify-content-between paginator-container">
                    <div className='d-flex text-color-2 mb-3 mb-xl-0 align-items-center pageLengthController'>
                        <div>Showing</div>
                        <div>
                            <select className="form-select text-color-1 bg-blue-1 fw-500" aria-label="Default select example" onChange={(e) => updateItemsPerPage(e)} value={itemsPerPage}>
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                        </div>
                        <div>out of {usersDataSet.length}</div>
                    </div>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel={<img src={caretRight} alt=''/>}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel={<img src={caretLeft} alt=''/>}
                        renderOnZeroPageCount={null}
                    />
                </div>
        </div>
    </>
}
