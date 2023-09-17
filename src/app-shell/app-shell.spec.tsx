import '@testing-library/jest-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import { AppShell } from './app-shell';


describe('app shell', () => {
    test('it should render AppShell component', () => {
        // const mockFunction = jest.fn();
        render(<Router>
            <AppShell />
        </Router>)
    
        const element = screen.getByPlaceholderText('Search for anything');
    
        expect(element).toBeInTheDocument();
    })

    test('it should search field with type text', () => {
        // const mockFunction = jest.fn();
        render(<Router>
            <AppShell />
        </Router>)
    
        const element = screen.getByPlaceholderText('Search for anything');
    
        expect(element).toHaveAttribute('type', 'text');
    })

    test('it should clear local storage when logout is clicked', () => {
        // const mockFunction = jest.fn();
        const {getByTestId} = render(<Router>
            <AppShell />
        </Router>)

        localStorage.setItem('user', 'test');
    
        const logoutButton = getByTestId('logout');

        fireEvent.click(logoutButton);

        expect(localStorage.getItem('user')).toBe(null);
    })
})