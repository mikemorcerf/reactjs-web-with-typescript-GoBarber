import React, { useCallback, useRef, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { AuthContext } from '../../context/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background } from './styles';

interface SignInFormData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const { signIn } = useContext(AuthContext);

	const handleSubmit = useCallback(
		async (data: SignInFormData) => {
			try {
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					email: Yup.string()
						.required('Email is required')
						.email('Type a valid email'),
					password: Yup.string().required('Password is required'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				signIn({
					email: data.email,
					password: data.password,
				});
			} catch (err) {
				const errors = getValidationErrors(err);
				formRef.current?.setErrors(errors);
			}
		},
		[signIn],
	);

	return (
		<Container>
			<Content>
				<img src={logoImg} alt="GoBarber" />
				<Form ref={formRef} onSubmit={handleSubmit}>
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
				</Form>
				<a href="login">
					<FiLogIn />
					Sign up
				</a>
			</Content>
			<Background />
		</Container>
	);
};

export default SignIn;
