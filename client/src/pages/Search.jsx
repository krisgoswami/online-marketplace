import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HomeCard } from '../components/ItemCard';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';

const Search = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const getResults = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/common/search`, {
                params: { q: query }, // Passing the search query as a parameter 
            });
            if (data.success) {
                setSearchResults(data.items);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);  // Set loading to false when data is loaded
        }
    }
    useEffect(() => {
        getResults();
    }, [query]);

    return (
        <div className="container mx-auto py-8 h-screen overflow-auto mt-20">
            <h2 className="text-3xl font-bold mb-10">Search Results for "{query}"</h2>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <>
                    {searchResults?.map((item) => (
                        <div key={item?._id} className="mx-10 mt-4">
                            <HomeCard
                                id={item?._id}
                                item_name={item?.item_name}
                                brand={item?.brand}
                                price={item?.price}
                                image={item?.image}
                            />
                        </div>
                    ))}
                    {searchResults.length === 0 &&
                        <p>There are no results to show for "{query}"</p>
                    }
                </>
            )}

        </div>
    );
}

export default Search;
