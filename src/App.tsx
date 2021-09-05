import './App.css';
import ChatList from './components/ChatList' ;
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'

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
        <ChatList />
      </div>
    </MuiThemeProvider>
    
  );
}

export default App;
