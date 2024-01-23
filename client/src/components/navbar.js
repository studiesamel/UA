import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './log/logout';
import axios from 'axios';

import Logo from "../Assets/logo.png";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Link, animateScroll as scroll } from "react-scroll";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

const Navbar = () => {
    const uid = useContext(UidContext);
    const [userPseudo, setUserPseudo] = useState('');
    const [openMenu, setOpenMenu] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    const menuOptions = [
        // { text: "Home", icon: <HomeIcon />, to: "home" },
        // { text: "Download", icon: <InfoIcon />, to: "about" },
        // { text: "Testimonials", icon: <CommentRoundedIcon />, to: "testimonials" },
        // { text: "Contact", icon: <PhoneRoundedIcon />, to: "contact" },
      ];

    useEffect(() => {
        const fetchUserPseudo = async () => {
          try {
            const response = await axios.get(`${apiUrl}api/user/${uid}`);
            setUserPseudo(response.data.pseudo);
          } catch (error) {
            console.error('Error fetching user email:', error);
          }
        };
    
        fetchUserPseudo();
      }, [uid]);


  return (
    <nav className="navbar">
    <div className="nav-logo-container">
      <img src={Logo} alt="" />
    </div>
    <div className="navbar-links-container">
      {menuOptions.map((item) => (
        <Link
          key={item.text}
          to={item.to}
          spy={true}
          smooth={true}
          offset={-70} 
          duration={500}
          style={{ cursor: "pointer" }}
          activeClass="primary-button" 
        >
          {item.text}
        </Link>
      ))}
      <a href='/' className="primary-button">Home</a>
    </div>
    <div className="navbar-menu-container">
      <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
    </div>
    <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => setOpenMenu(false)}
        onKeyDown={() => setOpenMenu(false)}
      >
        <List>
          {menuOptions.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  </nav>
  );
};

export default Navbar;