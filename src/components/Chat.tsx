import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import ChatService from '../services/ChatService';
import ConnectedService from '../services/ConnectedService';

const useStyles = makeStyles(theme => ({
    messageArea: {
      height: '80vh',
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
        "& span, & p": {
            color: "#fff!important"
        },
        "& .MuiListItemText-root": {
            textAlign: "right"
        }
    }
}));

export default function Chat(props:{destId:number}){
    const [messages, setMessages] = useState<any[]>([]) ;
    const classes = useStyles() ;

    useEffect(() => { 
        const chatService = new ChatService() ;
        chatService.loadMessages(props.destId)
            .then((data) => {
                console.log(data) ;
                setMessages((data as any[])) ;
        }) ;
    }, [props.destId]) ;

    return (
        <div>
            <List className={classes.messageArea}>
            {
                messages.slice(0).map((item:any) => {
                    var classPers = {} ;
                    if(item.auteurId === ConnectedService.getConnectedId()){
                        classPers = {className: classes.textByMe} ;
                    }

                    return <ListItem key={item.id} {...classPers}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText primary={item.contenu}></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText secondary={item.temps}></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    
                })
            }
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