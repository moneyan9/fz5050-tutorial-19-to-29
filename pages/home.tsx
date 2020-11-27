import AddVtuber from "../components/AddVtuber"

import useSWR from "swr";


const Home = () => {

    const { data } = useSWR('http://localhost:4001/persons');

    return (
        <div>
            <AddVtuber />

            {data?.map(row => (
                <div key={row.id}>
                    {row.id}: {row.name}: {row.details}
                </div>
            ))


            }
        </div>
    );
}

export default Home