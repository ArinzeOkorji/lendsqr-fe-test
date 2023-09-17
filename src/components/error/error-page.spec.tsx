import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import { ErrorPage } from './error-page';

describe('Error Page', () => {
    it('should render error page', () => {
        const {getByText} = render(
            <ErrorPage />
        )

        const element = getByText('Uh-Oh!');

        expect(element).toBeTruthy();

    })
})