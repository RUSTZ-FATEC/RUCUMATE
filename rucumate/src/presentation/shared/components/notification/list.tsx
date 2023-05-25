import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';

interface ItemData {
  name: string;
  date: string;
  time: string;
  description: string;
}

const useStyles = makeStyles(() => ({
  date: {
    color: '#D6E1E0',
  },
  time: {
    color: '#D6E1E0',
  },
  description: {
    color: '#D6E1E0',
  },
}));

function renderRow(item: ItemData) {
  const classes = useStyles();
  const secondaryText = (
    <div>
      <hr />
      <span className={classes.date}>Data: {item.date}</span>
      <span className={classes.time}>Horário: {item.time}</span>
      <span className={classes.description}>Descrição: {item.description}</span>
    </div>
  );

  return (
    <ListItem disablePadding>
      <ListItemButton disableRipple>
        <Box
          sx={{
            width: '100%',
            padding: '5px',
            borderRadius: '10px',
            backgroundColor: '#100F10',
          }}
        >
          <ListItemText
            primary={item.name}
            secondary={secondaryText}
          />
        </Box>
      </ListItemButton>
    </ListItem>
  );
}

function ListComponent() {
  const data: ItemData[] = [
    { name: 'Sensor 0', date: '00/00/0000', time: '00:00:00', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { name: 'Sensor 0', date: '00/00/0000', time: '00:00:00', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { name: 'Sensor 0', date: '00/00/0000', time: '00:00:00', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { name: 'Sensor 0', date: '00/00/0000', time: '00:00:00', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { name: 'Sensor 0', date: '00/00/0000', time: '00:00:00', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    { name: 'Sensor 0', date: '00/00/0000', time: '00:00:00', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
  ];

  return (
    <>
      <Box sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'transparent', overflow: 'auto' }}>
        <List style={{ padding: 0 }}>
          {data.map((item) => renderRow(item))}
        </List>
      </Box>
    </>
  );
}

export default ListComponent;