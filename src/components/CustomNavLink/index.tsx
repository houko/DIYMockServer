import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

const MyNavLink = (props: NavLinkProps): JSX.Element => (
	<div className="px-2">
		<NavLink activeClassName="active" {...props} />
	</div>
);

export default MyNavLink;
