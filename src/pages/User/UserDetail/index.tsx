// pages/user/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

interface Address {
	addressLine1: string;
	addressLine2: string;
	city: string;
	state: string;
	country: string;
}

interface User {
	name: string;
	email: string;
	role: string;
	phoneNo: string;
	addresses: Address[];
}

const UserDetail = () => {
	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();
	const { id: userId } = router.query;

	useEffect(() => {
		console.log("check")
		fetchData()
  .then((data) => {
    console.log('Data:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
	}, []);
	async function fetchData(): Promise<any> {
		try {
		  const response = await axios.get('http://localhost:8000/user');
		  return response.data;
		} catch (error) {
		  console.error('Error fetching data:', error);
		  throw error;
		}
	  }
	const initialValues = {
		name: user?.name ?? '',
		email: user?.email ?? '',
		role: user?.role ?? '',
		phoneNo: user?.phoneNo ?? '',
		addressLine1: user?.addresses?.[0]?.addressLine1 ?? '',
		addressLine2: user?.addresses?.[0]?.addressLine2 ?? '',
		city: user?.addresses?.[0]?.city ?? '',
		state: user?.addresses?.[0]?.state ?? '',
		country: user?.addresses?.[0]?.country ?? '',
	};

	const validationSchema = Yup.object().shape({
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
		city: Yup.string().required('City is required'),
		state: Yup.string().required('State is required'),
		country: Yup.string().required('Country is required'),
	});

	const roles = [
		{ label: 'Admin', value: 'admin' },
		{ label: 'User', value: 'user' },
	];

	const handleUpdate = async (
		values: typeof initialValues,
		{ setSubmitting }: FormikHelpers<typeof initialValues>
	) => {
		try {
			const updatedUser = {
				...values,
				addresses: [
					{
						addressLine1: values.addressLine1,
						addressLine2: values.addressLine2,
						city: values.city,
						state: values.state,
						country: values.country,
					},
				],
			};
			await axios.patch(`/api/user/${userId}`, updatedUser);
		} finally {
			setSubmitting(false);
		}
	};

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className='flex flex-col p-5'>
			<h4>View / Update User</h4>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleUpdate}
				enableReinitialize>
				{({ isSubmitting }) => (
					<form className='w-full' onSubmit={e => e.preventDefault()}>
						<div className='flex flex-wrap -mx-4'>
							<div className='w-1/2 px-4 mb-4'>
								<label className='block text-gray-700 font-bold' htmlFor='name'>
									User Name
								</label>
								<input
									name='name'
									type='text'
									className='border border-gray-300 rounded px-4 py-2 w-full'
									defaultValue={initialValues.name}
								/>
							</div>
							<div className='w-1/2 px-4 mb-4'>
								<label
									className='block text-gray-700 font-bold'
									htmlFor='email'>
									User Email
								</label>
								<input
									name='email'
									type='text'
									className='border border-gray-300 rounded px-4 py-2 w-full'
									defaultValue={initialValues.email}
								/>
							</div>
							<div className='w-1/2 px-4 mb-4'>
								<label className='block text-gray-700 font-bold' htmlFor='role'>
									User Role
								</label>
								<select
									name='role'
									className='border border-gray-300 rounded px-4 py-2 w-full'
									defaultValue={initialValues.role}>
									{roles.map(role => (
										<option key={role.value} value={role.value}>
											{role.label}
										</option>
									))}
								</select>
							</div>
							<div className='w-1/2 px-4 mb-4'>
								<label
									className='block text-gray-700 font-bold'
									htmlFor='phoneNo'>
									Phone Number
								</label>
								<input
									name='phoneNo'
									type='text'
									className='border border-gray-300 rounded px-4 py-2 w-full'
									defaultValue={initialValues.phoneNo}
								/>
							</div>
							<div className='w-1/2 px-4 mb-4'>
								<label
									className='block text-gray-700 font-bold'
									htmlFor='addressLine1'>
									Address Line 1
								</label>
								<input
									name='addressLine1'
									type='text'
									className='border border-gray-300 rounded px-4 py-2 w-full'
									defaultValue={initialValues.addressLine1}
								/>
							</div>
							<div className='w-1/2 px-4 mb-4'>
								<label
									className='block text-gray-700 font-bold'
									htmlFor='addressLine2'>
									Address Line 2
								</label>
								<input
									name='addressLine2'
									type='text'
									className='border border-gray-300 rounded px-4 py-2 w-full'
									defaultValue={initialValues.addressLine2}
								/>
							</div>
							<div className='w-1/2 px-4 mb-4'>
								<label className='block text-gray-700 font-bold' htmlFor='city'>
									City
								</label>
								<input
									name='city'
									type='text'
									className='border border-gray-300 rounded px-4 py-2 w-full'
									defaultValue={initialValues.city}
								/>
							</div>
							<div className='w-1/2 px-4 mb-4'>
								<label
									className='block text-gray-700 font-bold'
									htmlFor='state'>
									State
								</label>
								<input
									name='state'
									type='text'
									className='border border-gray-300 rounded px-4 py-2 w-full'
									defaultValue={initialValues.state}
								/>
							</div>
							<div className='w-1/2 px-4 mb-4'>
								<label
									className='block text-gray-700 font-bold'
									htmlFor='country'>
									Country
								</label>
								<input
									name='country'
									type='text'
									className='border border-gray-300 rounded px-4 py-2 w-full'
									defaultValue={initialValues.country}
								/>
							</div>
						</div>
						<div className='flex justify-end mt-5'>
							<button
								type='submit'
								className={`py-2 px-4 text-white bg-blue-600 rounded-lg ${
									isSubmitting ? 'opacity-50' : ''
								}`}
								disabled={isSubmitting}>
								{isSubmitting ? 'Updating...' : 'Update User'}
							</button>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default UserDetail;
