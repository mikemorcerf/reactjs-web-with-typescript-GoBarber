import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
	<Container>
		<Content>
			<img src={logoImg} alt="GoBarber" />
			<form>
				<h1>Sign in</h1>
				<input placeholder="Your email address" />
				<input type="password" placeholder="password" />
				<button type="submit">Enter</button>
				<a href="forgot">Forgot password?</a>
			</form>
			<a href="login">
				<FiLogIn />
				Sign up
			</a>
		</Content>
		<Background />
	</Container>
);

export default SignIn;
