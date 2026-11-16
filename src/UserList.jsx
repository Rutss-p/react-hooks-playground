import React from 'react'

const userList = React.memo(({onHandle,user})=>{
    console.log("Rendering the child component of the useList")
    return(
<>
 <div className="user">
      <div className="user-info">
        <h4>{user.firstName} {user.lastName}</h4>
        <p>{user.email}</p>
      </div>

      <button onClick={() => onHandle("remove", user)}>
        Delete
      </button>
    </div>
</>
    )
})

export default userList;