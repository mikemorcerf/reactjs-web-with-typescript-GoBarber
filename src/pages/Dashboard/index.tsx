import React from 'react';

import { FiPower, FiClock } from 'react-icons/fi';
import {
	Container,
	Header,
	HeaderContent,
	Profile,
	Content,
	Schedule,
	NextAppointment,
	Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
	const { signOut, user } = useAuth();

	return (
		<Container>
			<Header>
				<HeaderContent>
					<img src={logoImg} alt="GoBarber" />

					<Profile>
						<img src={user.avatar_url} alt={user.name} />
						<div>
							<span>Welcome</span>
							<strong>{user.name}</strong>
						</div>
					</Profile>

					<button type="button" onClick={signOut}>
						<FiPower />
					</button>
				</HeaderContent>
			</Header>

			<Content>
				<Schedule>
					<h1>Appointments</h1>
					<p>
						<span>Today</span>
						<span>May 6th</span>
						<span>Monday</span>
					</p>

					<NextAppointment>
						<strong>Next appointment</strong>
						<div>
							<img
								src="https://avatars3.githubusercontent.com/u/16601136?s=460&u=cc113eafff21220b4a2ef9c77d0456b6ff6175ce&v=4"
								alt="Mike Morcerf"
							/>

							<strong>Mike Morcerf</strong>
							<span>
								<FiClock />
								08:00
							</span>
						</div>
					</NextAppointment>
				</Schedule>
				<Calendar />
			</Content>
		</Container>
	);
};

export default Dashboard;
