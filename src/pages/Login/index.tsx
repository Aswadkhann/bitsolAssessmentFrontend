
"use client"
import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface LoginFormValues {
	email: string;
	password: string;
	remember: boolean;
}

const loginValidationSchema = Yup.object({
	email: Yup.string()
		.email('Invalid email format')
		.required('Email is required'),
	password: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.required('Password is required'),
});

const initialValues: LoginFormValues = {
	email: '',
	password: '',
	remember: false,
};

const Login: React.FC = () => {
	const handleSubmit = (
		values: LoginFormValues,
		actions: FormikHelpers<LoginFormValues>
	) => {
		console.log('Form data:', values);
		fetchData()
  .then((data) => {
    console.log('Data:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
		// You can simulate a server response delay here
		setTimeout(() => {
			actions.setSubmitting(false); // To reset the submit button
		}, 2000);
	};

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
		  const response = await axios.post('http://localhost:8000/user');
		  return response.data;
		} catch (error) {
		  console.error('Error fetching data:', error);
		  throw error;
		}
	  }
	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Sign in to your account
						</h1>
						<Formik
							initialValues={initialValues}
							validationSchema={loginValidationSchema}
							onSubmit={handleSubmit}>
							{({ isSubmitting }) => (
								<Form className='space-y-4 md:space-y-6'>
									<div>
										<label
											htmlFor='email'
											className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
											Email
										</label>
										<Field
											type='email'
											name='email'
											className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											placeholder='name@company.com'
										/>
										<ErrorMessage
											name='email'
											component='div'
											className='text-sm text-red-600'
										/>
									</div>
									<div>
										<label
											htmlFor='password'
											className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
											Password
										</label>
										<Field
											type='password'
											name='password'
											placeholder='••••••••'
											className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										/>
										<ErrorMessage
											name='password'
											component='div'
											className='text-sm text-red-600'
										/>
									</div>
									<div className='flex items-center justify-between'>
										<div className='flex items-start'>
											<Field
												type='checkbox'
												name='remember'
												className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
											/>
											<label
												htmlFor='remember'
												className='ml-3 text-sm text-gray-500 dark:text-gray-300'>
												Remember me
											</label>
										</div>
										<a
											href='#'
											className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>
											Forgot password?
										</a>
									</div>
									<button
										type='submit'
										className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
										disabled={isSubmitting}>
										Sign in
									</button>
									<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
										Don’t have an account yet?{' '}
										<a
											href='#'
											className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
											Sign up
										</a>
									</p>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
