import NotesPage from "./pages/NotesPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoteProvider from "./context/NoteContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <div id="app">
        <AuthProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route
                path="/"
                element={
                  <NoteProvider>
                    <NotesPage />
                  </NoteProvider>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
      </div>
    </Router>

    // <div id="app">
    //   <NoteProvider>
    //     <NotesPage />
    //   </NoteProvider>
    // </div>
  );
}

export default App;
