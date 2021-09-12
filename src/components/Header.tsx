import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react" ;
import { useState } from "react";
import InfoIcon from "@material-ui/icons/InfoRounded" ;
import { Link as RouterLink } from "react-router-dom";
import UserService from "../services/UserService";

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "primary",
        padding: "5px 20px",
        position: "sticky",
        fontFamily: "Work Sans, sans-serif"
    },
    menu: {
        display: "flex",
        justifyContent: "space-between"
    },
    logo: {
      "&>*":{
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
        textDecoration: "none"
      }
    },
    link: {
        fontWeight: 400,
        size: "20px",
        textTransform: "none"
    }
})) ;

const userService = new UserService() ;

export default function Header(props:{showInfo:any}) {
    const classes = useStyles() ;
    const [fullName, setFullName] = useState("") ;


    const getMenu = () => {
        return (
            <Toolbar className={classes.menu}>
                <Typography className={classes.logo} variant="h5" component="h1">
                  <RouterLink to="/">E-Fandray</RouterLink>
              </Typography>
                <div>{ getMenuButtons() }</div>
            </Toolbar>
        );
    };

    const getMenuButtons = () => {
        userService.getConnectedUser().then((res:any) => {
          setFullName(res.prenom+" "+res.nom) ;
        })
        
        return (
          <React.Fragment>
            <Button
            {...{
              color: "inherit",
              to: "/chat/2",
              component: RouterLink,
              className: classes.link
            }}
            >
              Connecté : <b>{fullName}</b>
            </Button>
            <Button color="inherit" className={classes.link} onClick={props.showInfo}><InfoIcon /></Button>
          </React.Fragment>
          
        );
    };

    return (
        <AppBar className={classes.header}>{getMenu()}</AppBar>
    );
}