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
