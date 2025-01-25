import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
function App() {
  const [userState, setUserState] = useState({
    Namık: true,
    Eda: true,
    Suzan: true,
    Engin: true,
    Samet: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const users = Object.keys(userState);
      const randomUser = users[Math.floor(Math.random() * userState.length)];
      setUserState((pre) => ({
        ...pre,
        [randomUser]: !pre[randomUser],
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [userState]);
  return (
    <UserContext.Provider value={{ userState }}>
      <div>
        <h1>Kullanıcı Durumları</h1>
        <UserList />
      </div>
    </UserContext.Provider>
  );
}

const UserList = () => {
  const { userState } = useContext(UserContext);
  return (
    <div>
      {Object.keys(userState).map((user) => (
        <div key={user} className="flex m-3">
          {userState[user] ? <p className="mr-3">🟢</p> : <p className="mr-3">🔴</p>}
          <p>{user}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
