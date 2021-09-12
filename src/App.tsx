import './App.css';
import Header from './components/Header';
import ChatList from './components/ChatList' ;
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab' ;
import { useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6b0ec7'
    },
    secondary: {
      main: '#ef2e6c'
    }
  }
});

function App() {
  const [open, openSnack] = useState(true)
  localStorage.setItem("connectedId", "1") ;
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Header showInfo={() => openSnack(true)} />
          <ChatList />
        </BrowserRouter>
      </div>
      <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal:'center' }} onClose={() => openSnack(false)} >
          <Alert variant="filled" severity="info">Développé par ANDRIANIAINA Faniriantsoa Romilà IGGLIA3</Alert>
        </Snackbar>
    </MuiThemeProvider>
    
  );
}

export default App;
