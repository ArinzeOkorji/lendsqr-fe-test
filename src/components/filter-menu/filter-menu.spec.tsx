import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import { FilterOption } from './filter-menu';

const filterMethod = () => {

}
const resetFilterMethod = () => {
    
}

const organizationList = [
    'Lendsqr'
]

describe('Filter Menu', () => {
    it('should render the filter menu component', () => {
        const {getByLabelText} = render(
            <FilterOption 
            resetFilterMethodRef={resetFilterMethod} 
            filterMethodRef={filterMethod} 
            organizationList={organizationList}/>
        )

        const organizationLabel = getByLabelText('Organization');
        const usernameLabel = getByLabelText('Username');
        const emailLabel = getByLabelText('Email');
        const dateLabel = getByLabelText('Date');
        const phoneNumberLabel = getByLabelText('Phone Number');
        const statusLabel = getByLabelText('Status');

        expect(organizationLabel).toBeTruthy();
        expect(usernameLabel).toBeTruthy();
        expect(emailLabel).toBeTruthy();
        expect(dateLabel).toBeTruthy();
        expect(phoneNumberLabel).toBeTruthy();
        expect(statusLabel).toBeTruthy();
    })


    it('should reset input fields when clicked', () => {
        const {getByTestId} = render(
            <FilterOption 
            resetFilterMethodRef={resetFilterMethod} 
            filterMethodRef={filterMethod} 
            organizationList={organizationList}/>
        )

        const organizationSelect = screen.getByLabelText<HTMLSelectElement>('Organization');
        const usernameInput = screen.getByPlaceholderText<HTMLInputElement>('User');
        const emailInput = screen.getByPlaceholderText<HTMLInputElement>('Email');
        const dateInput = screen.getByPlaceholderText<HTMLInputElement>('Date');
        const phoneNumberInput = screen.getByPlaceholderText<HTMLInputElement>('Phone Number');
        const statusSelect = screen.getByLabelText<HTMLSelectElement>('Status');
        const resetBtn = getByTestId('reset');

        fireEvent.click(resetBtn)

        expect(organizationSelect.value).toEqual('');
        expect(usernameInput.value).toEqual('');
        expect(emailInput.value).toEqual('');
        expect(dateInput.value).toEqual('');
        expect(phoneNumberInput.value).toEqual('');
        expect(statusSelect.value).toEqual('');
    })
})