import Link from 'next/link';

const DressCard = ({ newDress }) => {
    const { _id,name, size, color, price, material, inStock, imageUrl } = newDress || {};
    return (
        <div>
            <div className="card card-compact bg-base-100 w-96 shadow-xl">
                <figure className='w-ful h-96'>
                    <img
                        src={imageUrl}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Name: {name}</h2>
                    <h2>size: {size}</h2>
                    <p>color: {color}</p>
                    <h2>price: {price}</h2>
                    <h2>material: {material}</h2>
                    <h2>inStock: {inStock}</h2>
                    <div className="card-actions justify-end">
                        <button className="btn bg-[#e49b8c] text-white">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DressCard;