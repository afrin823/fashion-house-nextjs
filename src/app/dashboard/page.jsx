// app/products/page.js
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        size: '',
        color: '',
        price: '',
        material: '',
        inStock: false,
        imageUrl: '',
    });
    const router = useRouter();

    // Fetch Products Function
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/api/dress');
            if (res.ok) {
                const productsData = await res.json();
                setProducts(productsData);
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            size: formData.size.split(',').map(size => size.trim()),
            price: parseFloat(formData.price) || 0,
        };

        try {
            const response = await fetch('http://localhost:3000/api/dress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                setFormData({
                    name: '',
                    size: '',
                    color: '',
                    price: '',
                    material: '',
                    inStock: false,
                    imageUrl: '',
                });
                Swal.fire('Success!', 'Product added successfully!', 'success');
                fetchProducts();
            } else {
                Swal.fire('Error!', 'Failed to add product.', 'error');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            Swal.fire('Error!', 'An error occurred while adding the product.', 'error');
        }
    };

    const handleDeleteClick = async (productId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/dress/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Swal.fire('Deleted!', 'Product has been deleted.', 'success');
                fetchProducts(); // Refresh the products list after deletion
            } else {
                Swal.fire('Error!', 'Failed to delete product.', 'error');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            Swal.fire('Error!', 'An error occurred while deleting the product.', 'error');
        }
    };

    if (loading) {
        return <div className="text-center text-lg">Loading...</div>;
    }

    if (products.length === 0) {
        return <div className="text-center text-lg">No products found.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8 text-[#e49b8c] ">Products List</h1>

            {/* Add Product Form */}
            <form onSubmit={handleSubmit} className="mb-8 sticky top-0 bg-white border border-gray-300 rounded-lg p-6 shadow-md z-10">
                <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['name', 'size', 'color', 'price', 'material', 'imageUrl'].map((field, index) => (
                        <label key={index} className="block">
                            <span className="text-gray-700 capitalize">{field}:</span>
                            <input
                                type={field === 'price' ? 'number' : 'text'}
                                name={field}
                                value={formData[field]}
                                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            />
                        </label>
                    ))}
                    <label className="flex items-center">
                        <span className="text-gray-700 mr-2">In Stock:</span>
                        <input
                            type="checkbox"
                            name="inStock"
                            checked={formData.inStock}
                            onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                            className="form-checkbox h-5 w-5 text-[#e49b8c] border-gray-300 rounded focus:ring focus:ring-blue-200"
                        />
                    </label>
                </div>
                <button type="submit" className="mt-4 w-full bg-[#e49b8c]  text-white rounded-md p-2 hover:bg-[#e28d7c]  transition duration-200">
                    Add Product
                </button>
            </form>

            {/* Products List */}
            <ul className="space-y-4">
                {products.map((product) => (
                    <li key={product._id} className="flex flex-col md:flex-row justify-between gap-5 items-start p-4 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-200">
                        <img src={product?.imageUrl} alt={product.name} className="w-48 object-cover rounded-md mb-2" />
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold">{product?.name}</h2>
                            <p className="text-gray-600">Size: {Array.isArray(product?.size) ? product?.size.join(', ') : product.size}</p>
                            <p className="text-gray-600">Color: {product.color}</p>
                            <p className="text-gray-600">Price: ${product?.price ? product.price.toFixed(2) : '0.00'}</p>
                            <div className="flex flex-col md:flex-row md:items-center mt-4 md:mt-0">
                                <button
                                    onClick={() => router.push(`/dashboard/update/${product._id}`)}
                                    className="mr-2 bg-[#e49b8c]  text-white rounded-md p-2 hover:bg-[#d57d6c]  transition duration-200"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(product._id)}
                                    className="bg-red-500 text-white rounded-md p-2 hover:bg-red-600 transition duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsList;
