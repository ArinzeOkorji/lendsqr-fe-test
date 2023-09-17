import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { Card, cardData } from './card';

const cardData: cardData = {
    icon: 'users-pink',
    title: 'Users',
    color: 'bg-pink-1',
    value: 0
}

describe('Card', () => {
    it('should render card component', () => {
        render(<Card data={cardData}/>);

        const element = screen.getByText(cardData.title);

        expect(element).toBeInTheDocument();
    })
})