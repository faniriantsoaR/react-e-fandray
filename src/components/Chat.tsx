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
import { Typography, Box, TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    messageArea: {
        height: '75vh',
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
        backgroundColor: theme.palette.secondary.light,
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
    var { id } = useParams<ChatParams>() ;
    const [loaded, setLoaded] = useState(false) ;
    const [error, setError] = useState(false) ;
    const messageField = createRef<HTMLInputElement>() ;
    const chatService = new ChatService() ;
    const [loadNew, setLoadNew] = useState(false) ;

    const sendMessage = () => {
        if(messageField == null || messageField.current == null){
            alert("Une erreur s'est produite lors de l'envoi de votre message, veuillez réessayer.") ;
            return ;
        }
        
        const contenu = messageField.current.value ;
        chatService.addMessage(id, contenu).then((data:any) => {
            if(messageField != null && messageField.current != null){
                messageField.current.value = "" ;
                messageField.current.focus() ;
                messageField.current.blur() ;
            }
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
            res = pad2(jour) + "/" + pad2(mois) + " - "+res ;
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
        console.log("setTimeout") ;
        const timeOut = setTimeout(() => {
            console.log("prepare load") ;
            setLoadNew(!loadNew) ;
        }, 1200) ;

        return () => {
            clearTimeout(timeOut) ;
        }
    }, [loadNew]) ;

    useEffect(() => {
        console.log("LOADDDDD") ;
        chatService.loadNewMessages(Number(id), messages[messages.length - 1]?.id)
            .then((data: any) => {
                var updated = messages.slice(0).concat((data as any[])) ;
                setMessages(updated) ;
            }) ;
    }, [loadNew]) ;

    useEffect(() => {
        chatService.loadMessages(Number(id))
            .then((data: any) => {
                setMessages((data as any[])) ;
                setLoaded(true) ;
            }).catch((error: any) => {
                console.log(error) ;
                setLoaded(true) ;
                setError(true) ;
            }) ;
    }, [id]) ;

    useEffect(scrollDown, [messages]) ;

    if(loaded && error){
        return <Box p={5} textAlign="center"><Typography variant="body1">Une erreur s'est produite, veuillez réessayer s'il vous plaît.</Typography></Box>
    }else if(!loaded){
        return <Box p={5} textAlign="center"><Typography variant="body1">Chargement...</Typography></Box>
    }else{
        let nomessage = null ;
        if(messages.length === 0){
            nomessage = (<Box px={5} pt={4} textAlign="center"><Typography variant="body1">Envoyer un message pour démarrer une discussion avec cette personne. </Typography></Box>) ;
        }
        return (
            <div>
                {nomessage}
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