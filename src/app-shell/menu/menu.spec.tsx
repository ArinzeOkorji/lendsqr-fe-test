import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { Menu } from "./menu";
import {BrowserRouter as Router} from 'react-router-dom';


describe('menu', () => {
    test('it should render Menu component', () => {
        render(<Router>
             <Menu/>
         </Router>)
     
         const element = screen.getByText('Switch Organization')
         expect(element).toBeInTheDocument()
     })
     
     test('it should render Customers nav section components', () => {
        const component = render(<Router>
             <Menu/>
         </Router>)
     
         const element = component.getByText('Customers');
         expect(element).toBeInTheDocument();
     })
     test('it should render Businesses nav section components', () => {
        const component = render(<Router>
             <Menu/>
         </Router>)
     
         const element = component.getByText('Businesses');
         expect(element).toBeInTheDocument();
     })
     test('it should render Settings nav section components', () => {
        const component = render(<Router>
             <Menu/>
         </Router>)
     
         const element = component.getByText('Settings');
         expect(element).toBeInTheDocument();
     })
})