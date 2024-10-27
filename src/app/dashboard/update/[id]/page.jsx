"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import React from 'react';

const UpdateProduct = ({ params }) => {
    const { id } = React.use(params); // Unwrap params using React.use
    const [formData, setFormData] = useState(null); // Initialize formData as null
    const [loading, setLoading] = useState(true); // State to track loading status
    const router = useRouter(); // To navigate after update

    // Fetch the product data on component mount
    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`http://localhost:3000/api/dress/${id}`);
            if (res.ok) {
                const product = await res.json();
                setFormData(product);
            } else {
                console.error('Failed to fetch product');
            }
            setLoading(false); // Set loading to false after fetching
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' 
                ? checked 
                : name === 'size' 
                    ? value.split(',').map(size => size.trim())
                    : name === 'price' 
                        ? parseFloat(value) || '' // Ensure price is a number
                        : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate that price is a number
        if (isNaN(formData.price)) {
            Swal.fire({
                title: 'Error!',
                text: 'Price must be a valid number.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        // Create a copy of formData excluding the _id
        const { _id, ...dataToUpdate } = formData;

        const response = await fetch(`http://localhost:3000/api/dress/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToUpdate), // Send the data without _id
        });

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Product updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                router.push('/dashboard'); // Redirect after successful update
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update product',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    // Show a loading message until the product data is fetched
    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    // Guard against null formData
    if (!formData) {
        return <div className="text-center">Error: Product data not found.</div>;
    }

    // Render the form once the product data is loaded
    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-bold mb-4 text-center">Update Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                    <span className="text-gray-700">Name:</span>
                    <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Size (comma-separated):</span>
                    <input
                        type="text"
                        name="size"
                        value={(formData.size || []).join(',')}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Color:</span>
                    <input
                        type="text"
                        name="color"
                        value={formData.color || ''}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Price:</span>
                    <input
                        type="number"
                        name="price"
                        value={formData.price || ''}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Material:</span>
                    <input
                        type="text"
                        name="material"
                        value={formData.material || ''}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                </label>
                <label className="flex items-center">
                    <span className="text-gray-700">In Stock:</span>
                    <input
                        type="checkbox"
                        name="inStock"
                        checked={formData.inStock || false}
                        onChange={handleChange}
                        className="ml-2"
                    />
                </label>
                <label className="block">
                    <span className="text-gray-700">Image URL:</span>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl || ''}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                </label>
                <button type="submit" className="mt-4 w-full bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-200">
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
