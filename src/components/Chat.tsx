import { useState, useEffect, createRef } from 'react';
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
import { useParams } from 'react-router';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    messageArea: {
        height: '80vh',
        overflowY: 'auto',
        "&>*": {
            borderRadius: "1000px",
            padding: "10px 30px",
            backgroundColor: "#efefef",
            marginBottom: "10px",
            width: "fit-content",
            maxWidth: "50%",
            clear: "both"
        },
        "& .MuiListItemText-primary": {
            textAlign: "left"
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

interface ChatParams{
    id: any
}

export default function Chat(){
    const [messages, setMessages] = useState<any[]>([]) ;
    const classes = useStyles() ;
    const { id } = useParams<ChatParams>() ;
    const [loaded, setLoaded] = useState(false) ;
    const [error, setError] = useState(false) ;
    const messageField = createRef<HTMLInputElement>() ;
    const chatService = new ChatService() ;

    const sendMessage = () => {
        if(messageField == null || messageField.current == null){
            alert("Une erreur s'est produite lors de l'envoi de votre message, veuillez réessayer.") ;
            return ;
        }
        const contenu = messageField.current.value ;
        chatService.addMessage(id, contenu).then((data:any) => {
            const updated = messages.slice(0) ;
            updated.push(data) ;
            if(messageField != null && messageField.current != null){
                messageField.current.value = "" ;
                messageField.current.focus() ;
                messageField.current.blur() ;
            }
            setMessages(updated) ;
        }) ;
    }

    const formatDate = (time:number) => {
        const dateObj = new Date(time * 1000);
  
        const heure = dateObj.getUTCHours();
        const minute = dateObj.getUTCMinutes();

        const jour = dateObj.getUTCDay() ;
        const mois = dateObj.getUTCMonth() ;

        const pad2 = (val:any) => {
            return val.toString().padStart(2, '0')
        }

        const now = new Date() ;
        let res = pad2(heure) + ':' + pad2(minute) ;
        if(jour !== now.getUTCDay() || mois !== now.getUTCMonth()){
            res = res+pad2(jour) + "/" + pad2(mois) ;
        }

        return res ;
    }

    const scrollDown = () => {
        var mArea = document.getElementById("messages") ;
        if(mArea != null){
            mArea.scrollTop = mArea.scrollHeight | 0 ;
        }
    }

    useEffect(() => {
        chatService.loadMessages(Number(id))
            .then((data: any) => {
                setMessages((data as any[])) ;
                setLoaded(true) ;
                scrollDown() ;
            }).catch((error: any) => {
                console.log(error) ;
                setLoaded(true) ;
                setError(true) ;
            }) ;
    }, [id]) ;

    useEffect(scrollDown, [messages]) ;

    if(loaded && error){
        return <div><Typography variant="body2">Une erreur s'est produite, veuillez réessayer s'il vous plaît.</Typography></div>
    }else if(!loaded){
        return <div><Typography variant="body2">Chargement...</Typography></div>
    }else{
        return (
            <div>
                <List id="messages" className={classes.messageArea}>
                {
                    messages.slice(0).map((item:any) => {
                        var classPers = {} ;
                        if(item.auteurId === ConnectedService.getConnectedId()){
                            classPers = {className: classes.textByMe} ;
                        }

                        return (
                        <ListItem key={item.id} {...classPers}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText primary={item.contenu}></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText secondary={formatDate(item.temps)}></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        ) ;
                        
                    })
                }
                </List>
                <Divider />
                <Grid 
                    component="form" 
                    onSubmit={(e: any) => {
                        e.preventDefault() ; 
                        sendMessage() ;
                    } } 
                    container 
                    style={{padding: '20px', width: '100%'}}
                >
                    <Grid item xs={11}>
                        <TextField id="outlined-basic" inputRef={messageField} label="Saisir le message" fullWidth />
                    </Grid>
                    <Grid item xs={1}>
                        <Fab type="submit" color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </div>
        ) ;
    }
}