import './App.css';
import SignInForm from './component/SignInForm/SignInForm';
import GroceryListComponent from './component/GroceryListDisplay/GroceryListDisplay';
import GroceryListPicker from './component/GroceryListPicker/GroceryListPicker';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './model/AppState';
import { getGroceryLists } from './service/GroceryListService';
import { setGroceryLists } from './store/state/groceryListSlice';
import { setToken, setUser } from './store/state/userSlice';
import { getUser } from './service/UserService';
import { TOKEN_COOKIE } from './constants/Cookies';
import NavBar from './component/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const dispatch = useDispatch();
  const [cookies,, removeCookie] = useCookies([TOKEN_COOKIE]);

  const user = useSelector((state: AppState) => state.userState.user);
  const token = useSelector((state: AppState) => state.userState.token);

  //check if we have a valid token, if not log out
  if(cookies.token && !token) {
    dispatch(setToken(cookies.token));
    getUser(cookies.token).then(user => {
      if(user === undefined) {
        removeCookie(TOKEN_COOKIE);
        dispatch(setToken(''));
        dispatch(setUser(undefined));
      } else {
        dispatch(setUser(user));
      }
    })
    dispatch(setUser(user));
    getGroceryLists(cookies.token).then(lists => {
      dispatch(setGroceryLists(lists));
    });
  }

  return (
    <div className="app">
      <NavBar></NavBar>
      <div className="margins">
        <BrowserRouter>
          <Routes>
            <Route path="/signIn" element={<SignInForm/>}/>
            <Route path="/lists" element={<GroceryListPicker/>}/>
            <Route path="/list/:listId" element={<GroceryListComponent/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
