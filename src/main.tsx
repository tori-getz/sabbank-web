
//import '@store/init';

import { render } from 'react-dom';

import { AppContainer } from '@containers';

const ROOT_NODE: HTMLElement | null = document.querySelector('#root');

render(
    <AppContainer />,
    ROOT_NODE
);
