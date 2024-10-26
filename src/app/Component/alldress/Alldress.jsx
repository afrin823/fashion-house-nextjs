import { dress } from "@/app/lib/dressData/dress";
import DressCard from "./DressCard";

const Alldress = () => {
    console.log(dress);
    return (
        <div>
            <h1 className="text-center text-4xl font-bold">Our Today News</h1>

            <marquee behavior="" direction="" className="text-center font-normal text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo dicta facere enim temporibus aut molestias, ea laudantium exercitationem. Voluptatibus facere sed architecto culpa debitis nemo ducimus delectus similique laudantium at!</marquee>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {
                dress.map((newDress) => <DressCard key={newDress.id} newDress={newDress}></DressCard>)
            }
          </div>
        </div>
    );
};

export default Alldress;