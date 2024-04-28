import React from 'react';
import { Formik, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import axios from 'axios';

const AddUser: React.FC = () => {
	const router = useRouter();

	const initialValues = {
		name: '',
		email: '',
		role: '',
		phoneNo: '',
		addressLine1: '',
		addressLine2: '',
		state: '',
		city: '',
		country: '',
	};

	const validationSchema = Yup.object({
		name: Yup.string().required('Name is required'),
		email: Yup.string()
			.required('Email is required')
			.email('Invalid email address'),
		role: Yup.string().required('Role is required'),
		phoneNo: Yup.string()
			.required('Phone number is required')
			.matches(/^\d+$/, 'Phone number must contain only digits'),
		addressLine1: Yup.string().required('Address Line 1 is required'),
		addressLine2: Yup.string().required('Address Line 2 is required'),
		state: Yup.string().required('State is required'),
		city: Yup.string().required('City is required'),
		country: Yup.string().required('Country is required'),
	});

	const roles = [
		{ label: 'Admin', value: 'admin' },
		{ label: 'User', value: 'user' },
	];

	// api function

	const handleAddUser = async (
		values: typeof initialValues,
		{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
	) => {
		setSubmitting(true);
		try {
			const response = await axios.post('/api/user', values);
			console.log(response.data);

			router.push('/users'); // Redirect after successful submission
		} catch (error) {
			console.error('Error adding user:', error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className='container mx-auto p-6'>
			<h2 className='text-2xl font-bold'>Add User</h2>
			<p className='text-gray-600'>Please fill in the user details below.</p>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleAddUser}>
				{({ isSubmitting }) => (
					<FormikForm className='space-y-4'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							<div>
								<label htmlFor='name'>Name</label>
								<Field
									name='name'
									type='text'
									className='w-full p-2 border rounded'
									id='name'
								/>
							</div>
							<div>
								<label htmlFor='email'> Email</label>
								<Field
									name='email'
									type='email'
									className='w-full p-2 border rounded'
									id='email'
								/>
							</div>

							<div>
								<label htmlFor='role'>User Role</label>
								<Field
									name='role'
									as='select'
									className='w-full p-2 border rounded'
									id='role'>
									{roles.map(role => (
										<option key={role.value} value={role.value}>
											{role.label}
										</option>
									))}
								</Field>
							</div>
							<div>
								<label htmlFor='phoneNo'>Phone Number</label>
								<Field
									name='phoneNo'
									type='text'
									className='w-full p-2 border rounded'
									id='phoneNo'
								/>
							</div>

							<div>
								<label htmlFor='addressLine1'>Address Line 1</label>
								<Field
									name='addressLine1'
									type='text'
									className='w-full p-2 border rounded'
									id='addressLine1'
								/>
							</div>
							<div>
								<label htmlFor='addressLine2'>Address Line 2</label>
								<Field
									name='addressLine2'
									type='text'
									className='w-full p-2 border rounded'
									id='addressLine2'
								/>
							</div>

							<div>
								<label htmlFor='city'>City</label>
								<Field
									name='city'
									type='text'
									className='w-full p-2 border rounded'
									id='city'
								/>
							</div>
							<div>
								<label htmlFor='state'>State</label>
								<Field
									name='state'
									type='text'
									className='w-full p-2 border rounded'
									id='state'
								/>
							</div>

							<div>
								<label htmlFor='country'>Country</label>
								<Field
									name='country'
									type='text'
									className='w-full p-2 border rounded'
									id='country'
								/>
							</div>
						</div>

						<div className='flex justify-end'>
							<button
								type='submit'
								className='bg-indigo-600 text-white px-4 py-2 rounded-md'>
								{isSubmitting ? 'Submitting...' : 'Add User'}
							</button>
						</div>
					</FormikForm>
				)}
			</Formik>
		</div>
	);
};

export default AddUser;
