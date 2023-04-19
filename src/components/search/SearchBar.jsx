import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

import "./Search.scss";
import axios from "axios";

export const SearchBar = ({ setResults }) => {

    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch("/users")
            .then((response) => response.json())
            .then((json) => {
                const results = json.filter((user) => {
                    return (
                        value &&
                        user &&
                        user.phone &&
                        user.phone.toLowerCase().includes(value)
                    );
                });
                setResults(results);
            });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className="input-wrapper">
            <SearchIcon id="search-icon" />

            <input
                placeholder="Nhập số điện thoại cần tìm"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};