import React, { Component } from 'react';
import MainApp from './MainApp'
import { Router } from 'react-router-dom';
import history from './history';

class App extends Component {
	render() {
		return (
			<Router history={history} basePath={window.location.pathname}>
				<MainApp />
			</Router>
		);
	}
}

export default App;