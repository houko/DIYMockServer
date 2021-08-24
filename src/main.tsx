import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/redux/store';

import React, { Suspense } from 'react';

import MyNavLink from '@/components/CustomNavLink';
import Loading from '@/components/Loading';
import { Redirect, Switch } from 'react-router-dom';
import { Route } from 'react-router';

import '@/i18n';
import Home from '@/views/Home';
import Task from '@/views/Task';
import NotFound from '@/views/NotFound';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<div className="App">
					<div>
						<MyNavLink to="/home">home</MyNavLink>
						<MyNavLink to="/task">task</MyNavLink>
					</div>
					<Suspense fallback={<Loading/>}>
						<Switch>
							<Route component={Home} path="/" exact/>
							<Route component={Home} path="/home"/>
							<Route component={Task} path="/task"/>
							<Route component={NotFound} path="/404"/>
							<Redirect to="/404"/>
						</Switch>
					</Suspense>
				</div>
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
