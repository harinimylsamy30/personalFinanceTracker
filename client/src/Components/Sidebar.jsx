import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, AccountBalance, ShowChart, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = ({ open, toggleDrawer }) => {
    const menuItems = [
        { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
        { text: "Transactions", icon: <AccountBalance />, path: "/transactions" },
        { text: "Investments", icon: <ShowChart />, path: "/investments" },
        { text: "Settings", icon: <Settings />, path: "/settings" }
    ];

    return (
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer(false)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
