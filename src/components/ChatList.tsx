import React, {useState,useEffect} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Chat from './Chat' ;
import UserService from '../services/UserService' ;
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  chatListContainer: {
    marginLeft: "260px",
    width: "calc(100% - 280px)"
  },
  usersContainer: {
    backgroundColor: "#1c1c1c",
    boxShadow: "2px 0 4px rgba(0, 0, 0, 0.3)",
    position: "fixed",
    top: "0",
    left: "0",
    bottom: "0",
    width: "250px",
    zIndex: "auto"
  },
  userLink: {
    color: "#d0d0d0",
    textDecoration: "none",
    padding: "5px 15px",
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    transitionDuration: "0.5s",
    "&:hover": {
      backgroundColor: "#4c4c4c"
    },
    "& span": {
      whiteSpace: "nowrap",
      maxWidth: "130px",
      textOverflow: "ellipsis",
      overflow: "hidden"
    }
  },
  userLinkActive: {
    backgroundColor: theme.palette.primary.light+"!important",
    "& *": {
      color: theme.palette.getContrastText(theme.palette.primary.light),
      fontWeight: "bold!important"
    }
  }
}));

export default function ChatList() {
  const classes = useStyles();

  const [users, setUsers] = useState<any[]>([]) ;

  useEffect(() => { 
    const userService = new UserService() ;
    userService.loadOtherUsers().then((data) => {
      console.log(data) ;
      setUsers((data as any[]))
    }) ;
  }, []) ;

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <div className={classes.chatListContainer}>
          <Grid className={classes.usersContainer} container direction="column" alignItems="stretch">
          {
          users.slice(0).map((item:any) => 
            <Grid item key={item.id}>
              <NavLink className={classes.userLink} activeClassName={classes.userLinkActive} to={"/chat/"+item.id}>
                <ListItem>
                  <ListItemAvatar children={<Avatar src={process.env.PUBLIC_URL+"/images/1.jpg"} />} />
                  <ListItemText primary={item.prenom+" "+item.nom} />
                </ListItem>
              </NavLink>
            </Grid>
          )
          }
          </Grid>
          <Route path="/chat/:id"><Chat /></Route>
        </div>
      </BrowserRouter>
    </div>
  );
}