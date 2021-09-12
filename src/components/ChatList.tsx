import React, {useState,useEffect} from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Chat from './Chat' ;
import UserService from '../services/UserService' ;
import { NavLink, Route, Switch } from 'react-router-dom';
import { Avatar, Box, Grid, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@material-ui/core';


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
    top: "72px",
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
    borderTop: "2px solid #4c4c4c",
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
    backgroundColor: theme.palette.secondary.main+"!important",
    "& *": {
      color: theme.palette.getContrastText(theme.palette.secondary.light),
      fontWeight: "bold!important"
    }
  },
  customAvatar: {
    backgroundColor: "#fff"
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
      
        <div className={classes.chatListContainer}>
          <Grid className={classes.usersContainer} container direction="column" alignItems="stretch">
          {
          users.slice(0).map((item:any) => 
            <Grid item key={item.id}>
              <Tooltip title={item.prenom+" "+item.nom} placement="right">
                <NavLink className={classes.userLink} activeClassName={classes.userLinkActive} to={"/chat/"+item.id}>
                  <ListItem>
                    <ListItemAvatar children={<Avatar className={classes.customAvatar} src={process.env.PUBLIC_URL+"/"+item.avatar} />} />
                    <ListItemText primary={item.prenom+" "+item.nom} />
                  </ListItem>
                </NavLink>
              </Tooltip>
            </Grid>
          )
          }
          </Grid>
          <Switch>
            <Route path="/chat/:id" render={(props) => (
              <Chat key={props.match.params.id} {...props} 
            />)}
            />
            <Route><Box p={5} textAlign="center">Veuillez sélectionner une personne pour commencer une discussion.</Box></Route>
          </Switch>
        </div>
    </div>
  );
}