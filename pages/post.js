import { useState } from 'react';

export default function SubmitItem() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    // Assuming you'll handle images separately or add more fields
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here we'll call the API to submit the form data
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Item submitted successfully!');
      // Reset form or redirect the user
    } else {
      alert('Failed to submit the item.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Item Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="">Select a Category</option>
        <option value="books">Books</option>
        <option value="electronics">Electronics</option>
        <option value="furniture">Furniture</option>
        // Add more categories as needed
      </select>
      <button type="submit">Submit Item</button>
    </form>
  );
}
