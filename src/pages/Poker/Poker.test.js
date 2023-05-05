import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Poker from './Poker';

describe('Poker Component', () => {
    it('should render title text', () => {
        const { getByText } = render(<Poker />);
        expect(getByText('Task.')).toBeInTheDocument();
    })

    it('should set new task', () =>{
        const { getByText, getByLabelText } = render(<Poker />);

        const addButton = getByText('Cadastar Tasks');
        userEvent.click(addButton)
        const inputElement = getByLabelText('Nome do Task');
        const addButtonCreate = getByText('Cadastar Tasks');
        userEvent.type(inputElement, 'Texte de Criação de Task');
        userEvent.click(addButtonCreate)
    })
});