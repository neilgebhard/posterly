import Navbar from "./components/Navbar";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Posts from "./pages/Home";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_apiURL;

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/create-post" component={CreatePost} />
        <Route path="/posts/:_id" component={Post} />
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Posts} />
      </Switch>
    </Router>
  );
};

export default App;
