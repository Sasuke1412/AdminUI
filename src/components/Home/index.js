import { Component } from "react";
import React, { useState } from 'react';
import ReactPaginate from "react-paginate";
import Loader from 'react-loader-spinner'
import UserContext from "../../Context/UserContext";
import EmptyItemsPageDisplay from '../EmptyItemsPageDisplay'
import DisaplyUsers from '../DisaplyUsers'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS'
  }


class Home extends Component{

    state={inputSearch:'',
    apistatus: apiStatusConstants.initial,
    userData:[],
    checkboxStatus:false}

    componentDidMount(){
        this.fetchAllUsersData()
    } 

    fetchAllUsersData=async()=>{
        this.setState({apistatus:apiStatusConstants.inProgress})
        const url='https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        const response= await fetch(url)
        const data=await response.json()
       // console.log(data)
       if(response.ok===true){
           // console.log(data)
           this.setState({userData:data,
            apistatus:apiStatusConstants.success
        })
       }
       else{
           this.setState({apistatus:apiStatusConstants.failure})
       }
    }

    handleInputChange=event=>{
        this.setState({inputSearch:event.target.value})
        
    }

    

    renderColumnTitles=()=>{
        const {checkboxStatus}=this.state
        // console.log(checkboxStatus)
    
    return (
        <UserContext.Consumer>
        {value => {
              const {selectAll} = value

            const  handleSelectALL=event=>{
                this.setState(prevState=>({checkboxStatus:!prevState.checkboxStatus}))
                selectAll(checkboxStatus)
            }  
            

            return(
                <>
                <ul className="column-titles-header">
                   <li  className="title-item checkbox-header">
                   <input type="checkbox" className="Select-all-check-box" value={checkboxStatus} onChange={handleSelectALL}/>
                    </li>
                    <li className="title-item name-header">Name</li>
                    <li className="title-item email-header">Email</li>
                    <li className="title-item role-header">Role</li>
                    <li className="title-item action-header">Action</li>
                </ul>
            </>
      )
    }}
    </UserContext.Consumer>
    )

    }

    renderAllUsers=()=>{
        const {apistatus}=this.state
        switch (apistatus) {
            case apiStatusConstants.success:
              return this.RenderUsersListSuccessView()
            case apiStatusConstants.failure:
              return this.renderUserListFailureView()
            case apiStatusConstants.inProgress:
              return this.renderLoader()
            default:
              return null
        }     
    }

    renderLoader = () => (
        <div className="loader-container" testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
    )
    
    renderUserListFailureView = () => (
        <>
          <button type="button" onClick={this.retryProfile}>
            Retry
          </button>
        </>
    )

    RenderUsersListSuccessView=()=>{
        const {userData,inputSearch,checkboxStatus,canDelete}=this.state
       // console.log(userData)
        const formattedData= userData.filter(each => Object.keys(each).some(key => (each[key]).includes(inputSearch)));
        return(
            <UserContext.Consumer>
          {value => {
                const {userList,} = value
               
                const FilteredData=formattedData.filter(each =>  !userList.includes(each.id))

            return(
                <>
                {FilteredData.length===0?
                (<EmptyItemsPageDisplay/>):
                (
                <>
                <DisaplyUsers details={FilteredData} checkedStatus={checkboxStatus} />
                </>)
                }
            </>
        )
    }}
    </UserContext.Consumer>
    )
    }

    render(){
        const {inputSearch}=this.state
        return(
            <>
                <div>
                    <input type="search" value={inputSearch} onChange={this.handleInputChange} className="input-search-bar-design" placeholder="search by name,email or role"/>
                </div>

                <div>
                    {this.renderColumnTitles()}
                    {this.renderAllUsers()}
                </div>

            </>
        )
    }
}
export default Home