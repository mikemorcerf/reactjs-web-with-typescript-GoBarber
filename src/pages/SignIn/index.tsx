import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
	<Container>
		<Content>
			<img src={logoImg} alt="GoBarber" />
			<form>
				<h1>Sign in</h1>
				<Input name="email" icon={FiMail} placeholder="Your email address" />
				<Input
					name="password"
					icon={FiLock}
					type="password"
					placeholder="password"
				/>
				<Button type="submit">Enter</Button>
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
