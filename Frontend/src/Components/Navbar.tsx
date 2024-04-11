// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import { Link } from "react-router-dom";

// const navLinks = [
//   { title: "Home", path: "/" },
//   { title: "About", path: "/about" }
// ];

// export default function NavBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <IconButton
//             size="large"
//             aria-label="menu"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//             onClick={handleOpenNavMenu}
//             color="inherit"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Menu
//             id="menu-appbar"
//             anchorEl={anchorElNav}
//             anchorOrigin={{
//               vertical: 'bottom',
//               horizontal: 'left',
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: 'top',
//               horizontal: 'left',
//             }}
//             open={Boolean(anchorElNav)}
//             onClose={handleCloseNavMenu}
//           >
//             {navLinks.map(({ title, path }) => (
//               <MenuItem key={title} component={Link} to={path} onClick={handleCloseNavMenu}>
//                 <Typography>{title}</Typography>
//               </MenuItem>
//             ))}
//           </Menu>
//           <Typography variant="h6" component="a" href="/" sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1 }} />
//           <Tooltip title="Open settings">
//             <IconButton sx={{ p: 0 }}>
//               <Avatar alt="User" />
//             </IconButton>
//           </Tooltip>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Link } from "react-router-dom";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
];

export default function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" component="a" href="/" sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
          {navLinks.map(({ title, path }) => (
            <Button key={title} component={Link} to={path} sx={{ color: '#fff', display: { xs: 'none', md: 'block' } }}>
              {title}
            </Button>
          ))}
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Open settings">
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="User" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
