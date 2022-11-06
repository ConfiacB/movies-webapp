import React, {useState, useEffect, Fragment} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeFunc from "./components/HomeFunc";
import GraphQL from "./components/GraphQL/GraphQL";
import OneMovieGraphQL from './components/GraphQL/OneMovieGraphQL';
import MoviesFunc from "./components/MoviesFunc";
import GenresFunc from "./components/GenresFunc";
import OneMovieFunc from "./components/OneMovieFunc";
import OneGenreFunc from "./components/OneGenreFunc";
import EditMovieFunc from "./components/EditMovieFunc";
import AdminFunc from "./components/AdminFunc";
import LoginFunc from "./components/LoginFunc";

const AppFunc = (props) => {
    const [jwt, setJWT] = useState("");

    useEffect(() => {
        let t = window.localStorage.getItem("jwt");
        if (t) {
            if (jwt === "") {
                setJWT(JSON.parse(t));
            }
        }
    }, [jwt])

    function handleJWTChange(jwt) {
        setJWT(jwt);
    }

    function logout() {
        setJWT("");
        window.localStorage.removeItem("jwt");
    }

    let loginLink;
    if (jwt === "") {
        loginLink = <Link to="/login" className="btn btn-outline-dark">Login</Link>;
    } else {
        loginLink = (
            <Link to="/logout" className="btn btn-outline-dark" onClick={logout}>
              Logout
            </Link>
        );
    }

    return (
        <Router>
        <div className="container">
          <div className="row">
            <div className="col mt-3">
              <h1 className="mt-3">Movies Database</h1>
            </div>
            <div className="col mt-3 text-end">{loginLink}</div>
            <hr className="mb-3"></hr>
          </div>

          <div className="row">
            <div className="col-md-2">
              <div className='main-nav'>
              <nav>
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/movies">Movies</Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="/genres">Genres</Link>
                  </li>
                  {jwt !== "" && (
                    <Fragment>
                      <li className="list-group-item">
                        <Link to="/admin/movie/0">Add movie</Link>
                      </li>
                      <li className="list-group-item">
                        <Link to="/admin">Manage Catalogue</Link>
                      </li>
                    </Fragment>
                  )}
                  <li className="list-group-item">
                    <Link to="/graphql">GraphQL</Link>
                  </li>
                </ul>
              </nav>
              </div>
            </div>

            <div className="col-md-10">
              <div className='main-body'>
              <Switch>
                <Route path="/movies/:id" component={OneMovieFunc} />
                <Route path="/moviesgraphql/:id" component={OneMovieGraphQL} />

                <Route path="/movies">
                  <MoviesFunc />
                </Route>

                <Route path="/genre/:id" component={OneGenreFunc} />

                <Route
                  exact
                  path="/login"
                  component={(props) => (
                    <LoginFunc {...props} handleJWTChange={handleJWTChange} />
                  )}
                />

                <Route exact path="/genres">
                  <GenresFunc />
                </Route>

                <Route exact path="/graphql">
                  <GraphQL />
                </Route>

                <Route
                  path="/admin/movie/:id"
                  component={(props) => (
                    <EditMovieFunc {...props} jwt={jwt} />
                  )}
                />

                <Route
                  path="/admin"
                  component={(props) => (
                    <AdminFunc {...props} jwt={jwt} />
                  )}
                />

                <Route path="/">
                  <HomeFunc />
                </Route>
              </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
}

export default AppFunc;