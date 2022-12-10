import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import AppProvider from '../context/Provider';

describe('Testando o componente Login', () => (
  test(
    'Testando os Inputs',
    async () => {
      const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
      act(() => history.push('./meals/52771/in-progress'));
      const favorite = await screen.findByTestId('favorite-btn');
      userEvent.click(favorite);
      userEvent.click(favorite);

      const share = await screen.findByTestId('share-btn');
      userEvent.click(share);

      const checkList = await screen.findAllByRole('checkbox');
      checkList.forEach((e) => userEvent.click(e));
      const finishBtn = await screen.findByTestId('finish-recipe-btn');
      userEvent.click(finishBtn);

      act(() => history.push('./meals/52771/in-progress'));

      userEvent.click(finishBtn);
    },
    test('Testando os Inputs', async () => {
      const { history } = renderWithRouter(<AppProvider><App /></AppProvider>);
      act(() => history.push('./drinks/178319/in-progress'));
      const favorite = await screen.findByTestId('favorite-btn');
      userEvent.click(favorite);
      userEvent.click(favorite);

      const checkList = await screen.findAllByRole('checkbox');
      checkList.forEach((e) => userEvent.click(e));

      const share = await screen.findByTestId('share-btn');
      userEvent.click(share);

      const finishBtn = await screen.findByTestId('finish-recipe-btn');
      userEvent.click(finishBtn);

      act(() => history.push('./drinks/178319/in-progress'));

      userEvent.click(finishBtn);
      userEvent.click(share);
      userEvent.click(favorite);
      userEvent.click(favorite);
    }),
  )));
