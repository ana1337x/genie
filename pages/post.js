import { useState } from 'react';
import { useRouter } from 'next/router';

export default function PostItem() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    tags: '',
    description: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert price to a number
    const formattedData = { ...formData, price: Number(formData.price) };
    
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    if (res.ok) {
      alert('Item posted successfully!');
      router.push('/'); // Redirect to the homepage or a confirmation page
    } else {
      alert('Failed to post the item.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px', margin: 'auto' }}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Item Title"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <select name="category" value={formData.category} onChange={handleChange} required>
        <option value="">Select a Category</option>
        <option value="books">Books</option>
        <option value="electronics">Electronics</option>
      </select>
      <select name="condition" value={formData.condition} onChange={handleChange} required>
        <option value="">Select Condition</option>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="Tags (comma-separated)"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <button type="submit">Post Item</button>
    </form>
  );
}
