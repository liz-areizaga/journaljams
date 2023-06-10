// import { useState } from "react";
import { TextField } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";



const SearchBar = ({setSearchQuery, searchlabel}) => {    
    return (
        <>
            <form>
                <TextField
                    id="search-bar"
                    className="text"
                    onInput={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                    label={searchlabel}
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                />
                {/* <IconButton type="submit" aria-label="search">
                    <SearchIcon style={{ fill: "blue" }} />
                </IconButton> */}
            </form>
        </>
    );
};

export default SearchBar;
