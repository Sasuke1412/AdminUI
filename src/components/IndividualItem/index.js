import { Component } from "react";
import UserContext from '../../Context/UserContext'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {BiEdit} from 'react-icons/bi' 
import {AiFillDelete} from 'react-icons/ai'
import './index.css'

class IndividualItem extends Component{

    state={isChecked:false,name:'',email:'',role:''}

    componentDidMount(){
        const {details}=this.props
        const {id,name,email,role}=details
        this.setState({name,email,role})
    }

     handleIndividualUserCheckBox=(event)=>{
        this.setState(prevState=>({isChecked:!prevState.isChecked}))
    }

    handleChangeInput=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }

    handleFormSubmit=event=>{
        event.preventDefault()
    }

    render(){
        const {name,email,role}=this.state
       // console.log(name,"ASc")
       
        let {isChecked}=this.state
        return(
            <UserContext.Consumer>
          {value => {
                const {areAllSelected, deleteUserId} = value

            const handleDelete=()=>{
                const {details}=this.props
                const {id}=details
                
                deleteUserId(id)
            }
            let listClassName;
            console.log(areAllSelected)
            const checkboxchecked=isChecked||areAllSelected
            listClassName=checkboxchecked?'selected-user':''
            console.log(listClassName,'sed')
            
           return(
            <li className={`individual-user-info-list ${listClassName}`}>
            <div className="list-user-each-item-container checkbox-input-container">
                <input type="checkbox" className="individual-select-check-box" checked={checkboxchecked} onChange={this.handleIndividualUserCheckBox} />
            </div>
            <div className="name-container">
                <p className="individual-title-item">{name}</p>
            </div>
            <div className="email-container">
                <p className="individual-title-item">{email}</p>
            </div>
            <div className="role-container">
                <p className="individual-title-item">{role}</p>
            </div>
            
            <div>
                <>
                <Popup
                    trigger={
                        <button type="button" className="button-design " onClick={this.handleEdit}> <BiEdit className="edit-button"/> </button>
                    }
                >
                    <div>
                        <form onSubmit={this.handleFormSubmit}>
                            <label>
                                Name:
                                <input type="text" name="name" value={name} onChange={this.handleChangeInput}/>
                            </label>
                            <label>
                                Email:
                                <input type="text" name="email" value={email}  onChange={this.handleChangeInput} />
                            </label>
                            <label>
                                Role:
                                <input type="text" name="role"  value={role} onChange={this.handleChangeInput} />
                            </label>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </Popup>
                </>
                
                <button type="button" className="button-design " onClick={handleDelete}> <AiFillDelete className="delete-button"/> </button>
            </div>
        </li>
        )
    }}
    </UserContext.Consumer>
    )
    }

}
export default IndividualItem