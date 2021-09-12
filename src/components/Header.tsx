import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import UserService from "../services/UserService";

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "primary",
        paddingRight: "79px",
        paddingLeft: "118px",
        position: "sticky",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
        }
    },
    menuBar: {
        display: "flex",
        justifyContent: "space-between"
    },
    logo: {
      "&>*":{
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
        textDecoration: "none"
      }
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "25px",
    }
})) ;

const userService = new UserService() ;

export default function Header() {
    const classes = useStyles() ;
    const [fullName, setFullName] = useState("") ;

    const logo = (
      <Typography className={classes.logo} variant="h5" component="h1">
          <RouterLink to="/">E-Fandray</RouterLink>
      </Typography>
    );

    const getMenu = () => {
        return (
            <Toolbar className={classes.menuBar}>
                {logo}
                <div>{ getMenuButtons() }</div>
            </Toolbar>
        );
    };

    const getMenuButtons = () => {
        userService.getConnectedUser().then((res:any) => {
          setFullName(res.prenom+" "+res.nom) ;
        })
        
        return (
          <Button
            {...{
              color: "inherit",
              to: "/chat/2",
              component: RouterLink,
              className: classes.menuButton
            }}
          >
            Connecté : <b>{fullName}</b>
          </Button>
        );
    };

    return (
        <AppBar className={classes.header}>{getMenu()}</AppBar>
    );
}