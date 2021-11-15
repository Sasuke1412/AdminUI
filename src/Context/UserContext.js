import React from 'react'

const UserContext = React.createContext({
  userList: [],
  areAllSelected:false,
  selectAll:()=>{},
  addWatchListItem: () => {},
  userIdSelected:[],
  RemoveSelectedUsers: () => {},
  deleteUserId:()=>{},

})
export default UserContext