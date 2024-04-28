import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

type ErrorResponse = {
  error: string; // or any other type that suits your error handling needs
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  try {
    // Make the API call to an external service or your backend
    const response = await axios.get('http://localhost:8000/user');
    
    // Extract the data you need from the response
    const { name } = response.data;

    // Return the data as JSON
    console.log(response.data)
    res.status(200).json({ name });
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    const errorResponse: ErrorResponse = { error: errorMessage };
    res.status(500).json(errorResponse);
  }
}
