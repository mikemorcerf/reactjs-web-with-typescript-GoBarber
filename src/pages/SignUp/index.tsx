import React, { useCallback } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
	const handleSubmit = useCallback(async (data: object) => {
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required('Name is required'),
				email: Yup.string()
					.required('Email is required')
					.email('Type a valid email'),
				password: Yup.string().min(6, 'Password must have at least 6 digits'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});
		} catch (err) {
			console.log(err);
		}
	}, []);

	return (
		<Container>
			<Background />
			<Content>
				<img src={logoImg} alt="GoBarber" />
				<Form onSubmit={handleSubmit}>
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
				</Form>
				<a href="login">
					<FiArrowLeft />
					Already registered? Sign in
				</a>
			</Content>
		</Container>
	);
};

export default SignUp;
