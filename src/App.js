import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import { useEffect } from 'react';
import { getUser } from './components/Auth/getUser';
import UserProfile from './components/UserProfile/UserProfile';
import { LoginMain } from './components/LoginRegistrat/LoginMain';
import { Context } from './Context';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { Preloader } from './components/Preloader/Preloader'
import { useData } from './DataContext';
import { PrivateRoute } from './PrivateRoute';
import { TaskById } from './components/Tasks/TaskById';
import { UserSettings } from './components/UserProfile/UserSettings';


function App() {

  const { getTasks, haveAccount,
    setHaveAccount, token, setToken,
    rerender, userData, setUserData,
    isFetching, setIsFetching, tasks,
    buttonIsActive, setButtonActive, rerenderUserData,
    nextTasksOnPage, lastTaskOnPage, setLastTaskOnPage } = useData();

  // ---- ----------AUTHITICATION PART-------------
  useEffect(async () => {
    if (token !== "") {
      setIsFetching(true)
      const response = await getUser(token);
      if (response.status === 200) {
        setUserData(response.data)
        setIsFetching(false)
      } else {
        setIsFetching(false)
      }
    }
  }, [token, rerender]);

  // ----   --------GET TASKS----------
  useEffect(async () => {
    if (token != "") {
      getTasks()
    }
  }, [token])


  return (
    <BrowserRouter>
      <Context.Provider value={{
        getTasks, tasks, userData, token, setToken,
        haveAccount, setHaveAccount,
        buttonIsActive, setButtonActive,
        rerenderUserData,
        nextTasksOnPage, lastTaskOnPage, setLastTaskOnPage
      }} >
        <div className="App">
          <Header />

          {
            isFetching
              ? <Preloader />
              : <Switch>
                <PrivateRoute exact path="/React-Todos-App">
                  <UserProfile />
                </PrivateRoute>
                <PrivateRoute path="/settings">
                  <UserSettings />
                </PrivateRoute>
                <Route path="/login" component={LoginMain} />
                {/* ???????????????? ???????? ?? ???????????????????????????? ?????????? */}
                <Route path="/:id" component={TaskById} />
                <Redirect to="/React-Todos-App" />
              </Switch>

          }
        </div>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default App;