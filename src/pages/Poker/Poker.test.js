import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Poker from './Poker';

describe('Poker Component', async () => {
    it('should render title text', () => {
        const { getByText } = render(<Poker />);
        expect(getByText('Tasks')).toBeInTheDocument();
    })

    it('should set new task', async () =>{
        const { getByText, getByLabelText } = render(<Poker />);

        const addButton = getByText('Cadastar Tasks');
        userEvent.click(addButton)
        const inputElement = getByLabelText('Nome do Task');
        const addButtonCreate = getByText('Cadastar Tasks');
        userEvent.type(inputElement, 'Texte de Criação de Task');
        userEvent.click(addButtonCreate)
    })

    it('should delete selected task', () =>{
        const { getByText } = render(<Poker />);

        const addButton = getByText('Apagar');
        userEvent.click(addButton)
        const addButtoConfirme = getByText('Sim');
        userEvent.click(addButtoConfirme)
    })
});