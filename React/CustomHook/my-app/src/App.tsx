import React from "react";
import "./App.css";

//  Custom hooks
import { User, useCustomHook } from "./CustomHook/UserHook/UserHook";

function App() {
  const url = "https://randomuser.me/api/";
  const [users, loading, currentUser, fetchUser, next, previous]: [
    User[],
    boolean,
    number,
    () => void,
    () => void,
    () => void
  ] = useCustomHook(url);

  return (
    <div>
      {/* {userList.length}
    Hello there!</div> */}
      {/* <div>{userList}</div> */}
      {JSON.stringify(users)}
      <h1>Current User: {currentUser}</h1>
      {/* <button onClick={fetchUser}>fetch users</button> */}
      <button onClick={next}>Next</button>
      <button onClick={previous}>Previous</button>

      {loading ? (
        <>...loading</>
      ) : (
        <>
          {users.map((user, index) => (
            <>
              {currentUser === index ? (
                <mark>{user.name}</mark>
              ) : (
                <div>{user.name}</div>
              )}
            </>
          ))}
        </>
      )}
      {/* <button onClick={next}>hey</button> */}
    </div>
  );
}

export default App;
