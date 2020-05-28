import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
	name: string;
	email: string;
	password: string;
}

const Profile: React.FC = () => {
	const formRef = useRef<FormHandles>(null);
	const { addToast } = useToast();
	const history = useHistory();

	const { user } = useAuth();

	const handleSubmit = useCallback(
		async (data: ProfileFormData) => {
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
			<header>
				<div>
					<Link to="/dashboard">
						<FiArrowLeft />
					</Link>
				</div>
			</header>

			<Content>
				<Form
					ref={formRef}
					initialData={{
						name: user.name,
						email: user.email,
					}}
					onSubmit={handleSubmit}
				>
					<AvatarInput>
						<img src={user.avatar_url} alt={user.name} />
						<button type="button">
							<FiCamera />
						</button>
					</AvatarInput>

					<h1>My profile</h1>

					<Input name="name" icon={FiUser} placeholder="Your full name" />

					<Input name="email" icon={FiMail} placeholder="Your email address" />

					<Input
						containerStyle={{ marginTop: 24 }}
						name="old_password"
						icon={FiLock}
						type="password"
						placeholder="current password"
					/>

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

					<Button type="submit">Confirm changes</Button>
				</Form>
			</Content>
		</Container>
	);
};

export default Profile;
