import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

interface SignInFormData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const history = useHistory();

	const { signIn } = useAuth();
	const { addToast } = useToast();

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

				await signIn({
					email: data.email,
					password: data.password,
				});

				history.push('/dashboard');
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);
					formRef.current?.setErrors(errors);
					return;
				}

				addToast({
					type: 'error',
					title: 'Authentication Error',
					description:
						'An error ocurred when trying to signin. Check your credentials',
				});
			}
		},
		[signIn, addToast, history],
	);

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={logoImg} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Sign in</h1>
						<Input
							name="email"
							icon={FiMail}
							placeholder="Your email address"
						/>
						<Input
							name="password"
							icon={FiLock}
							type="password"
							placeholder="password"
						/>
						<Button type="submit">Enter</Button>
						<Link to="/forgot-password">Forgot password?</Link>
					</Form>
					<Link to="/signup">
						<FiLogIn />
						Sign up
					</Link>
				</AnimationContainer>
			</Content>
			<Background />
		</Container>
	);
};

export default SignIn;
