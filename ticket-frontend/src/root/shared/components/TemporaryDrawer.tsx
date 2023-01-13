import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MovieIcon from '@mui/icons-material/Movie';
import TheatersIcon from '@mui/icons-material/Theaters';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

type Anchor = 'left';

export default function TemporaryDrawer() {

  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const routes: { [key: string]: string } = {
      'Αρχική': '/',
      'Προβολές': '/events',
      'Ταινίες': '/movies',
      'Σχετικά': '/about'
    }  

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Αρχική', 'Προβολές', 'Ταινίες', 'Σχετικά'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={routes[text]} onClick={toggleDrawer(anchor,false)}>
              <ListItemIcon>
              {text === 'Αρχική' && <ConfirmationNumberIcon />}
              {text === 'Προβολές' && <MovieIcon />}
              {text === 'Ταινίες' && <TheatersIcon />}
              {text === 'Σχετικά' && <InfoIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer(anchor,true)} >
            <MenuIcon sx={{color:'black'}}>
            </MenuIcon>
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}