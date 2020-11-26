import AddVtuber from "../components/AddVtuber"

import { useEffect, useState } from 'react';
import axios from "axios";

const Home = () => {

    const [data, setData] = useState([]);

    useEffect(
        () => {
            async function loadData() {
                const response = await axios('http://localhost:4001/persons');
                setData(response.data);
            }

            loadData();
        }, []
    );


    return (
        <div>
            <AddVtuber />

            {data?.map((row: any) => (
                <div key={row.id}>
                    {row.id}: {row.name}: {row.details}
                </div>
            ))
            }
        </div>
    );
}

export default Home