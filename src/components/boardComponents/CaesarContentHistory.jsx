import React, { useEffect, useState } from "react";
import HistoryCard from "../utilityComponents/HistoryCard";
import axios from 'axios';


function CaesarContentHistory() {
    const [scrolling, setScrolling] = useState(false);
    const [historyData, setHistoryData] = useState([]);

    let scrollTimeout;

    const handleScroll = () => {
        if (!scrolling) setScrolling(true);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            setScrolling(false);
        }, 1000);
    };

    useEffect(() => {
        return () => clearTimeout(scrollTimeout);
    }, []);


    const fetchData = async () => {
        const username = localStorage.getItem('username');
        try {
            const response = await axios.get(`${process.env.REACT_APP_EXPRESSJS_API_URL}/history`, {
                params: {
                    username: username,
                    historyType: 'caesar'
                }
            });
            setHistoryData(response.data);
        } catch (error) {
            console.error('Error fetching history data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        return () => clearTimeout(scrollTimeout);
    }, []);


    const handleDeleteCard = () => {
        window.location.reload();
    };

    // useEffect(() => {
    //     console.log(historyData);
    // }, [historyData]);

    return (
        <div className={`des-history ${scrolling ? 'scrolling' : ''}`} onScroll={handleScroll}>
            {historyData.map((data, index) => (
                <HistoryCard key={index} data={historyData[index]} deleteCard={handleDeleteCard}/>
            ))}
        </div>
    );
}

export default CaesarContentHistory;