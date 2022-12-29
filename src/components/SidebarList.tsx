import React from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
//import { Link } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

type SubMenu = {
  menuText: string;
  menuUrl: string;
};

type NestedListBarProps = {
  primaryText: string;
  menuItems: Array<SubMenu>;
};

const menuItem1: NestedListBarProps = {
  primaryText: "Bordro Tanımlamalar",
  menuItems: [
    { menuText: "Bordro Kalem", menuUrl: "#" },
    { menuText: "Bordro Tanım", menuUrl: "#" },
  ],
};

const menuItem2: NestedListBarProps = {
  primaryText: "Bordro",
  menuItems: [
    { menuText: "Bordro Hesapla", menuUrl: "#" },
    { menuText: "Bordro İzleme", menuUrl: "#" },
    { menuText: "E-bildirge", menuUrl: "#" },
    { menuText: "Toplu Avans", menuUrl: "#" },
    { menuText: "Toplu Ücret Artışı", menuUrl: "#" },
    { menuText: "Yevmiye Hesaplama", menuUrl: "#" },
    { menuText: "İcra", menuUrl: "#" },
  ],
};

const menuItem3: NestedListBarProps = {
  primaryText: "Kişiler",
  menuItems: [{ menuText: "Kişiler", menuUrl: "/kisiler" }],
};

const menuList: Array<NestedListBarProps> = [menuItem1, menuItem2, menuItem3];

function SidebarList() {
  return (
    <>
      <List component="nav">
        {menuList.map((item, index) => (
          <div key={index}>
            <NestedSideBarList
              primaryText={item.primaryText}
              menuItems={item.menuItems}
            />
          </div>
        ))}
      </List>
    </>
  );
}

function NestedSideBarList(props: NestedListBarProps) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <FiberManualRecordIcon />
        </ListItemIcon>
        <ListItemText primary={props.primaryText} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.menuItems.map((item, index) => (
            <div key={index}>
              <Link
                to={item.menuUrl}
                color="inherit"
                style={{ textDecoration: "none", color: "black" }}
              >
                <Typography variant="subtitle1" gutterBottom color="inherit">
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={item.menuText} />
                  </ListItemButton>
                </Typography>
              </Link>
            </div>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default SidebarList;
