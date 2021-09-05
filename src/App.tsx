import './App.css';
import ChatList from './components/ChatList' ;

function App() {
  localStorage.setItem("connectedId", "1") ;
  return (
    <div className="App">
      <ChatList />
    </div>
  );
}

export default App;
