// Import the initialized Supabase client
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract data from the request body
    const itemData = req.body;

    // Insert data into the 'items' table in Supabase
    const { data, error } = await supabase
      .from('items')
      .insert([itemData]);

    if (error) {
      // Log the error to the server console
      console.error('Error inserting data into Supabase:', error);
      // Send a 500 Internal Server Error response with the error message
      return res.status(500).json({ error: error.message });
    }

    // On success, return the inserted data
    return res.status(200).json(data);
  } else {
    // If the request method is not POST, return a 405 Method Not Allowed error
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
