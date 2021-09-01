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
import { AxiosRequest } from './components/Auth/AxiosRequest';
import { Preloader } from './components/Preloader/Preloader'
import { useData } from './DataContext';
import { PrivateRoute } from './PrivateRoute';
import { TaskById } from './components/Tasks/TaskById';
import { UserSettings } from './components/UserProfile/UserSettings';


//----  Problem 1 ---- TextField создается в разных компонентах. Надо вынести отдельно.



function App() {

  const { haveAccount,
    setHaveAccount, token, setToken,
    rerender, setRerender, userData,
    setUserData, isFetching, setIsFetching,
    tasks, setTasks, trigger, setTrigger,
    buttonIsActive, setButtonActive, rerenderTasks,
    rerenderUserData, countTasks, setCountTasks,
    nextTasksOnPage, lastTaskOnPage, setLastTaskOnPage } = useData();
  const onSetTrigger = () => {
    trigger ? setTrigger(false) : setTrigger(true)
  }


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
      setIsFetching(true)
      const url = "https://api-nodejs-todolist.herokuapp.com/task";
      const body = null;
      const method = "GET";
      const header = { "Authorization": `Bearer ${token}` };
      const response = await AxiosRequest(url, body, header, method);
      setTasks(response.data.data)
      setCountTasks(response.data.count)
      setIsFetching(false)
    }
  }, [token, trigger])


  return (
    <BrowserRouter>
      <Context.Provider value={{
        tasks, userData, token, setToken,
        haveAccount, setHaveAccount, onSetTrigger,
        buttonIsActive, setButtonActive, rerenderTasks,
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
                {/* Защитить путь к несуществующей таске */}
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