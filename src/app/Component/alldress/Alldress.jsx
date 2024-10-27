"use client"; 
import React, { useEffect, useState } from 'react';
import DressCard from "./DressCard";

const Alldress = () => {
    const [dress, setDress] = useState([]);

    // Fetch products from the API
    useEffect(() => {
        const fetchDress = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/dress'); // Your API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDress(data);
            } catch (error) {
                console.error('Failed to fetch dresses:', error);
            }
        };

        fetchDress();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <h1 className="text-center text-4xl font-bold">Our Today News</h1>

            <marquee behavior="" direction="" className="text-center font-normal text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dicta facere enim temporibus aut molestias, ea laudantium exercitationem. Voluptatibus facere sed architecto culpa debitis nemo ducimus delectus similique laudantium at!
            </marquee>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {dress.map((newDress) => (
                    <DressCard key={newDress._id} newDress={newDress} />
                ))}
            </div>
        </div>
    );
};

export default Alldress;