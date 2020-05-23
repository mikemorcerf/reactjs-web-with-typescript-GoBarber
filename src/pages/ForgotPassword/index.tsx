import React, { useCallback, useRef, useState } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import api from '../../services/api';

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
	const [loading, setLoading] = useState(false);

	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();

	const handleSubmit = useCallback(
		async (data: ForgotPasswordFormData) => {
			try {
				setLoading(true);

				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					email: Yup.string()
						.required('Email is required')
						.email('Type a valid email'),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				await api.post('/password/forgot', { email: data.email });

				addToast({
					type: 'success',
					title: 'Password recovery email successfully submitted',
					description:
						'We sent you an email to confirm your password recovery. Check your email inbox',
				});
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
			} finally {
				setLoading(false);
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

						<Button loading={loading} type="submit">
							Submit
						</Button>
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
