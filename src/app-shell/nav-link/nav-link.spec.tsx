import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { Nav } from "./nav-link";
import {BrowserRouter as Router} from 'react-router-dom';


describe('nav link', () => {
    test('it should render Nav component', () => {
        render(<Router>
            <Nav name='User' classes=''/>
        </Router>)
    
        const element = screen.getByText('User');
    
        expect(element).toBeInTheDocument();
    })
})