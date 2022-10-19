import { useContext } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import { Home, Register, Login } from "./pages";
import "./styles/GlobalStyles.scss";
import { AuthContext } from "./contexts/AuthContext/AuthContext";

function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (currentUser) {
            return children;
        }

        return (<Navigate to="/login" />);
    };

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/">
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        ></Route>
                        <Route path="login" element={<Login />}></Route>
                        <Route path="register" element={<Register />}></Route>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
