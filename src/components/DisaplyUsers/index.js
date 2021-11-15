import React, { useState } from 'react';
import ReactPaginate from "react-paginate";
import UserContext from '../../Context/UserContext';
import IndividualItem from '../IndividualItem'
import './index.css'

const DisaplyUsers=props=>{
    const {details}=props
    const [pageNumber,setPageNumber]=useState(0)
    const usersPerPage=10
    const pagesVisted=pageNumber*usersPerPage
    
    const pageCount=Math.ceil(details.length/usersPerPage)

    const changePage=({selected})=>{
        setPageNumber(selected);
    }

    return (  
        <UserContext.Consumer>
        {value => {
              const {RemoveSelectedUsers} = value   
              
              const handleDeleteSelected=()=>{
                RemoveSelectedUsers()
              }

              const displayUsers=details.slice(pagesVisted,pagesVisted+usersPerPage).map(eachUser=>
                <IndividualItem key={eachUser.id} details={eachUser}/> )
        
            return(
                <div className="pagination-container">
            
                {displayUsers}
             
                <div className="footer-pagination-delete-Button">
                <div>
                    <button type="button" className="delete-Selected" onClick={handleDeleteSelected}>Delete Selected</button>
                </div>
                <ReactPaginate 
                    previousLabel={"< previous"}
                    nextLabel={"next >"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationButtons"}
                    previousLinkClassName={"previousButtons"}
                    nextLinkClassName={"nextButtons"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}	
                />
                </div>
            </div>
            )
        }}
        </UserContext.Consumer>
        
    )

}
export default DisaplyUsers