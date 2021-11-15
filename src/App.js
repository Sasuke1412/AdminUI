import { Component } from 'react';
import Home from './components/Home'
import UserContext from './Context/UserContext'
import './App.css';

class App extends Component{

  state={userList:[],areAllSelected:false,userIdSelected:[],canDelete:false}


  deleteUserId=(user)=>{
    const {userList}=this.state
    console.log(userList)
    this.setState(prevState => ({userList: [...prevState.userList, user]}))
    
  }

  addWatchListItem=(id)=>{
    const {userIdSelected}=this.state
    console.log(id)
    this.setState(prevStates => ({userList: [...prevStates.userList, id]}))
  }

  RemoveSelectedUsers=(id)=>{
    const {userIdSelected}=this.state
    
    this.setState(prevStates => ({userIdSelected: [...prevStates.userIdSelected, id]}))
    
  }



  selectAll=(trueOrFalse)=>{
    console.log(trueOrFalse)
    if(trueOrFalse===false){
      this.setState({areAllSelected:true})
    }
    else{
      this.setState({areAllSelected:false})
    }   
  }


  

  

  render(){
    const {userList,areAllSelected,userIdSelected,}=this.state
    return (
      <>
      <UserContext.Provider
            value={{
              userList,
              addWatchListItem: this.addWatchListItem,
              areAllSelected,
              selectAll:this.selectAll,
              userIdSelected,
              deleteUserId:this.deleteUserId,
              RemoveSelectedUsers:this.RemoveSelectedUsers,              
            }}
          >
      <div className="App">
       <Home/>
      </div>
      </UserContext.Provider>
      </>
    )
  }
}

export default App;
