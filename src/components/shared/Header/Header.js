import React from 'react';
import './Header.css';
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from '@material-ui/icons/Home';
import NearMeOutlinedIcon from '@material-ui/icons/NearMeOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

const Header = ({ children }) => {
    return (
        <div className="header">
            <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
                className="header__image"
            />

            <div className="header__searchForm">
                <form>
                    <SearchIcon className="header__searchIcon" fontSize="small" />
                    <input type="text" id="filter" placeholder="Search" className="header__searchFormInput" />
                </form>
            </div>

            <div className="header__icons">
                <HomeIcon fontSize="large" className="header__icon" />
                <NearMeOutlinedIcon fontSize="large" className="header__icon" />
                <ExploreOutlinedIcon fontSize="large" className="header__icon" />
                <FavoriteBorderOutlinedIcon fontSize="large" className="header__icon" />
            </div>

            <div className="header__loginContainer">
                {children}
            </div>
        </div>
    )
}

export default Header;
