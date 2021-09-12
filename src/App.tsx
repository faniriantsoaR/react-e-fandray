import './App.css';
import Header from './components/Header';
import ChatList from './components/ChatList' ;
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4E3883'
    },
    secondary: {
      main: '#FFDDCC'
    }
  }
});

function App() {
  localStorage.setItem("connectedId", "1") ;
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <ChatList />
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
    
  );
}

export default App;
