import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

interface ResetPasswordFormData {
	password: string;
	password_confirmation: string;
}

const ResetPassword: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const history = useHistory();

	const { addToast } = useToast();

	const handleSubmit = useCallback(
		async (data: ResetPasswordFormData) => {
			try {
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					password: Yup.string().required('Password is required'),
					password_confirmation: Yup.string().oneOf(
						[Yup.ref('password'), null],
						'Password and Password Confirmation must match',
					),
				});

				await schema.validate(data, {
					abortEarly: false,
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
					title: 'Reset Password Error',
					description:
						'An error ocurred when trying to reset your password. Please try again',
				});
			}
		},
		[addToast, history],
	);

	return (
		<Container>
			<Content>
				<AnimationContainer>
					<img src={logoImg} alt="GoBarber" />
					<Form ref={formRef} onSubmit={handleSubmit}>
						<h1>Reset Password</h1>

						<Input
							name="password"
							icon={FiLock}
							type="password"
							placeholder="new password"
						/>

						<Input
							name="password_confirmation"
							icon={FiLock}
							type="password"
							placeholder="password confirmation"
						/>

						<Button type="submit">Update password</Button>
					</Form>
				</AnimationContainer>
			</Content>
			<Background />
		</Container>
	);
};

export default ResetPassword;
