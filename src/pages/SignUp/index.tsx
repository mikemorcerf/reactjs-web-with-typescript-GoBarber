import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
	const formRef = useRef<FormHandles>(null);

	const handleSubmit = useCallback(async (data: object) => {
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
		} catch (err) {
			const errors = getValidationErrors(err);
			formRef.current?.setErrors(errors);
		}
	}, []);

	return (
		<Container>
			<Background />
			<Content>
				<img src={logoImg} alt="GoBarber" />
				<Form ref={formRef} onSubmit={handleSubmit}>
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
