import React, { useState, useCallback } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';
import {
	Container,
	Header,
	HeaderContent,
	Profile,
	Content,
	Schedule,
	NextAppointment,
	Section,
	Appointment,
	Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
		if (modifiers.available) {
			setSelectedDate(day);
		}
	}, []);

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

					<Section>
						<strong>Morning</strong>

						<Appointment>
							<span>
								<FiClock />
								08:00
							</span>

							<div>
								<img
									src="https://avatars3.githubusercontent.com/u/16601136?s=460&u=cc113eafff21220b4a2ef9c77d0456b6ff6175ce&v=4"
									alt="Mike Morcerf"
								/>
								<strong>Mike Morcerf</strong>
							</div>
						</Appointment>

						<Appointment>
							<span>
								<FiClock />
								08:00
							</span>

							<div>
								<img
									src="https://avatars3.githubusercontent.com/u/16601136?s=460&u=cc113eafff21220b4a2ef9c77d0456b6ff6175ce&v=4"
									alt="Mike Morcerf"
								/>
								<strong>Mike Morcerf</strong>
							</div>
						</Appointment>
					</Section>

					<Section>
						<strong>Afternoon</strong>

						<Appointment>
							<span>
								<FiClock />
								08:00
							</span>

							<div>
								<img
									src="https://avatars3.githubusercontent.com/u/16601136?s=460&u=cc113eafff21220b4a2ef9c77d0456b6ff6175ce&v=4"
									alt="Mike Morcerf"
								/>
								<strong>Mike Morcerf</strong>
							</div>
						</Appointment>

						<Appointment>
							<span>
								<FiClock />
								08:00
							</span>

							<div>
								<img
									src="https://avatars3.githubusercontent.com/u/16601136?s=460&u=cc113eafff21220b4a2ef9c77d0456b6ff6175ce&v=4"
									alt="Mike Morcerf"
								/>
								<strong>Mike Morcerf</strong>
							</div>
						</Appointment>
					</Section>
				</Schedule>
				<Calendar>
					<DayPicker
						fromMonth={new Date()}
						disabledDays={[{ daysOfWeek: [0, 6] }]}
						modifiers={{
							available: { daysOfWeek: [1, 2, 3, 4, 5] },
						}}
						selectedDays={selectedDate}
						onDayClick={handleDateChange}
					/>
				</Calendar>
			</Content>
		</Container>
	);
};

export default Dashboard;
