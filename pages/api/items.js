export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Here, you'd typically validate the request and save it to your database.
      console.log("Submitted item:", req.body);
      // For now, we'll just send a success response.
      res.status(200).json({ message: 'Item submitted successfully' });
    } else {
      // Handle any other HTTP methods
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  