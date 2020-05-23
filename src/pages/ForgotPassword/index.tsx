import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

interface ForgotPasswordFormData {
	email: string;
}

const ForgotPassword: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	// const history = useHistory();

	const { addToast } = useToast();

	const handleSubmit = useCallback(
		async (data: ForgotPasswordFormData) => {
			try {
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					email: Yup.string()
						.required('Email is required')
						.email('Type a valid email'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				// TODO
				// Recover password

				// history.push('/dashboard');
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);
					formRef.current?.setErrors(errors);
					return;
				}

				addToast({
					type: 'error',
					title: 'Password recovery Error',
					description:
						'An error ocurred when trying to recover password. Try again',
				});
			}
		},
		[addToast],
	);

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={logoImg} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Password recovery</h1>
						<Input
							name="email"
							icon={FiMail}
							placeholder="Your email address"
						/>

						<Button type="submit">Submit</Button>
					</Form>
					<Link to="/">
						<FiArrowLeft />
						Sign in
					</Link>
				</AnimationContainer>
			</Content>
			<Background />
		</Container>
	);
};

export default ForgotPassword;
