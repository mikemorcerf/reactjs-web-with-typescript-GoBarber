import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background, AnimationContainer } from './styles';

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();
	const history = useHistory();

	const handleSubmit = useCallback(
		async (data: SignUpFormData) => {
			try {
				formRef.current?.setErrors({});

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

				await api.post('users', data);

				addToast({
					type: 'success',
					title: 'Registered with success',
					description: "You're ready to signin",
				});

				history.push('/');
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);
					formRef.current?.setErrors(errors);
					return;
				}

				addToast({
					type: 'error',
					title: 'Registration Error',
					description: 'An error ocurred when trying to sign up',
				});
			}
		},
		[addToast, history],
	);

	return (
		<Container>
			<Background />
			<Content>
				<AnimationContainer>
					<img src={logoImg} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Sign up</h1>
						<Input name="name" icon={FiUser} placeholder="Your full name" />
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
						<Button type="submit">Sign up</Button>
					</Form>
					<Link to="/">
						<FiArrowLeft />
						Already registered? Sign in
					</Link>
				</AnimationContainer>
			</Content>
		</Container>
	);
};

export default SignUp;
