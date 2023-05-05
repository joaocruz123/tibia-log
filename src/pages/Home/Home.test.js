import { render } from '@testing-library/react';
import Home from './Home';
import userEvent from '@testing-library/user-event';

describe('Home Component', () => {
    it('should render welcome text', () => {
        const { getByText } = render(<Home />);
        expect(getByText('Bem-vindo ao Planning Poker!')).toBeInTheDocument();
    })

    it('should set session user name', () =>{
        const { getByText, getByLabelText } = render(<Home />);

        const inputElement = getByLabelText('Nome do usuário');
        const addButton = getByText('Salvar');

        userEvent.type(inputElement, 'JCruz')
        userEvent.click(addButton)
    })
});
