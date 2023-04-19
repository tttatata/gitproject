import Home from "./pages/home/Home";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { productInputs, userInputs, sevicerInputs, userUpdateInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { homeColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHome";

import NewRoom from "./pages/newRoom/NewRoom";
import Update from "./pages/new/Update";
import UpdateHome from "./pages/newHotel/UpdateHome";
import UpdateSevicer from "./pages/newSevicer/UpdateSevicer.jsx";
import UpdateRoom from "./pages/newRoom/UpdateRoom.jsx";
import Datatable from "./components/datatable/Datatable";
import ListUser from "./pages/list/ListUser";
import ListHome from "./pages/list/ListHome";
import ListRoom from "./pages/list/ListRooms";
import ListSevicer from "./pages/list/ListSevicer";
import Create from "./pages/create/create";
import NewSevicer from "./pages/newSevicer/NewSevicer";
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { id } = useParams();
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="create">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Create />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ListUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={

                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="updateusers/:userId"

                element={

                  <ProtectedRoute>
                    <Update inputs={userUpdateInputs} title="Update User" path="update/:userId" />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* <Route path="homes">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ListHome />
                  </ProtectedRoute>
                }
              /> */}
            {/* <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              /> */}
            {/* <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="updatehomes/:homeId"

                element={
                  <ProtectedRoute>
                    <UpdateHome inputs={userInputs} title="Update User" />
                  </ProtectedRoute>
                }
              />
            </Route> */}

            <Route path="sevicers">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ListSevicer />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewSevicer title="Add New Sevicer" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="updatesevicers/:sevicerId"

                element={
                  <ProtectedRoute>
                    <UpdateSevicer inputs={sevicerInputs} title="Update Sevicer" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ListRoom />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="updaterooms/:roomsId"

                element={
                  <ProtectedRoute>
                    <UpdateRoom inputs={userInputs} title="Update User" />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ListRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":homeId/new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="updaterooms/:roomsId"

                element={
                  <ProtectedRoute>
                    <UpdateRoom inputs={userInputs} title="Update User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <UpdateHome inputs={userInputs} title="Update User" />
                </ProtectedRoute>
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
