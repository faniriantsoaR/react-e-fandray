import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => ({
    messageArea: {
      height: '70vh',
      overflowY: 'auto',
      "&>*": {
          borderRadius: "5px",
          backgroundColor: "#efefef",
          marginBottom: "10px",
          width: "fit-content",
          maxWidth: "50%",
          clear: "both"
      }
    },
    textByMe:{
        backgroundColor: theme.palette.primary.light,
        float: "right",
        "& span": {
            color: "#fff"
        },
        "& .MuiListItemText-root": {
            textAlign: "right"
        }
    }
  }));

export default function Chat(){
    const classes = useStyles() ;
    return (
        <div>
            <List className={classes.messageArea}>
                <ListItem key="1" className={classes.textByMe}>
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText primary="De aona Don ah ?"></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText secondary="09:30"></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem key="2">
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText primary="Salut anh, ça va tsara ka"></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText secondary="09:31"></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem key="3" className={classes.textByMe}>
                    <Grid container>
                        <Grid item xs={12}>
                            <ListItemText primary="Tsara zany bro, Tiako le hira vaovao anareo"></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText secondary="10:30"></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
            <Divider />
            <Grid container style={{padding: '20px', width: '100%'}}>
                <Grid item xs={11}>
                    <TextField id="outlined-basic-email" label="Saisir le message" fullWidth />
                </Grid>
                <Grid item xs={1}>
                    <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                </Grid>
            </Grid>
        </div>
    ) ;
}