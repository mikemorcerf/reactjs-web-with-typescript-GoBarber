import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, parseISO } from 'date-fns';
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
import api from '../../services/api';

interface MonthAvailabilityItem {
	day: number;
	available: boolean;
}

interface Appointment {
	id: string;
	date: string;
	hourFormatted: string;
	user: {
		name: string;
		avatar_url: string;
	};
}

const Dashboard: React.FC = () => {
	const [appointments, setAppointments] = useState<Appointment[]>([]);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [monthAvailability, setMonthAvailability] = useState<
		MonthAvailabilityItem[]
	>([]);

	const { signOut, user } = useAuth();

	const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
		if (modifiers.available) {
			setSelectedDate(day);
		}
	}, []);

	const handleMonthChange = useCallback((month: Date) => {
		setCurrentMonth(month);
	}, []);

	useEffect(() => {
		api
			.get(`/providers/${user.id}/month-availability`, {
				params: {
					year: currentMonth.getFullYear(),
					month: currentMonth.getMonth() + 1,
				},
			})
			.then(response => {
				setMonthAvailability(response.data);
			});
	}, [currentMonth, user.id]);

	useEffect(() => {
		api
			.get<Appointment[]>('/appointments/me', {
				params: {
					year: selectedDate.getFullYear(),
					month: selectedDate.getMonth() + 1,
					day: selectedDate.getDate(),
				},
			})
			.then(response => {
				const appointmentsFormatted = response.data.map(appointment => {
					return {
						...appointment,
						hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
					};
				});

				setAppointments(appointmentsFormatted);
			});
	}, [selectedDate]);

	const morningAppointments = useMemo(() => {
		return appointments.filter(appointment => {
			return parseISO(appointment.date).getHours() < 12;
		});
	}, [appointments]);

	const afternoonAppointments = useMemo(() => {
		return appointments.filter(appointment => {
			return parseISO(appointment.date).getHours() >= 12;
		});
	}, [appointments]);

	const disabledDays = useMemo(() => {
		const dates = monthAvailability
			.filter(monthDay => monthDay.available === false)
			.map(monthDay => {
				const year = currentMonth.getFullYear();
				const month = currentMonth.getMonth();

				return new Date(year, month, monthDay.day);
			});

		return dates;
	}, [currentMonth, monthAvailability]);

	const selectDayAsText = useMemo(() => {
		return format(selectedDate, "LLL do',' uuuu");
	}, [selectedDate]);

	const selectWeekDay = useMemo(() => {
		return format(selectedDate, 'cccc');
	}, [selectedDate]);

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
						{isToday(selectedDate) && <span>Today</span>}
						<span>{selectDayAsText}</span>
						<span>{selectWeekDay}</span>
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

						{morningAppointments.map(appointment => (
							<Appointment key={appointment.id}>
								<span>
									<FiClock />
									{appointment.hourFormatted}
								</span>

								<div>
									<img
										src={appointment.user.avatar_url}
										alt={appointment.user.name}
									/>
									<strong>{appointment.user.name}</strong>
								</div>
							</Appointment>
						))}
					</Section>

					<Section>
						<strong>Afternoon</strong>

						{afternoonAppointments.map(appointment => (
							<Appointment key={appointment.id}>
								<span>
									<FiClock />
									{appointment.hourFormatted}
								</span>

								<div>
									<img
										src={appointment.user.avatar_url}
										alt={appointment.user.name}
									/>
									<strong>{appointment.user.name}</strong>
								</div>
							</Appointment>
						))}
					</Section>
				</Schedule>
				<Calendar>
					<DayPicker
						fromMonth={new Date()}
						disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
						modifiers={{
							available: { daysOfWeek: [1, 2, 3, 4, 5] },
						}}
						onMonthChange={handleMonthChange}
						selectedDays={selectedDate}
						onDayClick={handleDateChange}
					/>
				</Calendar>
			</Content>
		</Container>
	);
};

export default Dashboard;
