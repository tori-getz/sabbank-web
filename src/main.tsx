
//import '@store/init';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'ui-neumorphism/dist/index.css'

import './vendor/bootstrap/bootstrap.scss';
import './styles/app.sass';

import { render } from 'react-dom';

import { AppContainer } from '@containers';

const ROOT_NODE: HTMLElement | null = document.querySelector('#root');

render(
    <AppContainer />,
    ROOT_NODE
);
