import React, {useState,useEffect} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chat from './Chat' ;
import UserService from '../services/UserService' ;

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} component="div">
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    "& [id^='vertical-tabpanel']": {
      flexGrow: 1
    }
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    textTransform: "none",
    "&>*":{
      alignItems: "flex-start"
    }
  }
}));

export default function ChatList() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [users, setUsers] = useState<any[]>([]) ;

  useEffect(() => { 
    const userService = new UserService() ;
    userService.loadOtherUser().then((data) => {
      console.log(data) ;
      setUsers((data as any[]))
    }) ;
  }, []) ;

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {
        users.slice(0).map((item:any) => <Tab className={classes.tab} key={item.id} label={item.prenom+" "+item.nom} {...a11yProps(0)} />)
        }
      </Tabs>
      <TabPanel value={value} index={0}>
        <Chat destId={2} />
      </TabPanel>
    </div>
  );
}