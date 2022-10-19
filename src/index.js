import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthContextProvider from './contexts/AuthContext/AuthContext';
import ChatContextProvider from './contexts/ChatContext/ChatContext';
import LayoutContextProvider from './contexts/LayoutContext/LayoutContext';
import StateContextProvider from './contexts/StateContext/StateContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <AuthContextProvider>
        <ChatContextProvider>
            <LayoutContextProvider>
                <StateContextProvider>
                    <App />
                </StateContextProvider>
            </LayoutContextProvider>
        </ChatContextProvider>
    </AuthContextProvider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
