import React from 'react';
import { Route } from 'react-router-dom';
import News from '@/views/Home/News';
import Posts from '@/views/Home/Posts';
import MyNavLink from '@/components/CustomNavLink';

const Home = (): JSX.Element => (
	<>
		Home
		<div className="flex">
			<MyNavLink to="/home/news">news</MyNavLink>
			<MyNavLink to="/home/posts">posts</MyNavLink>
		</div>
		<Route component={News} path="/home/news"/>
		<Route component={Posts} path="/home/posts"/>
	</>
);

export default Home;
