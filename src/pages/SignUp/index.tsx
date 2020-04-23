import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => (
	<Container>
		<Background />
		<Content>
			<img src={logoImg} alt="GoBarber" />
			<form>
				<h1>Sign up</h1>
				<Input name="name" icon={FiUser} placeholder="Your full name" />
				<Input name="email" icon={FiMail} placeholder="Your email address" />
				<Input
					name="password"
					icon={FiLock}
					type="password"
					placeholder="password"
				/>
				<Button type="submit">Sign up</Button>
			</form>
			<a href="login">
				<FiArrowLeft />
				Already registered? Sign in
			</a>
		</Content>
	</Container>
);

export default SignUp;
