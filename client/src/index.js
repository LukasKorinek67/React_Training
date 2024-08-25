import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import './styles/index.css';
import App from './App';
import RecipeList from "./pages/RecipeList";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeDetail from "./pages/RecipeDetail";
import IngredientList from "./pages/IngredientList";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";


const router = createBrowserRouter([
    { path: "/", element: <App />, children: [
            { index: true, element: <Navigate to="/home" replace /> },
            { path: "/home", element: <Home /> },
            { path: "/recipeList", element: <RecipeList /> },
            { path: "/recipeDetail", element: <RecipeDetail /> },
            { path: "/ingredientList", element: <IngredientList /> },
            { path: "*", element: <NotFoundPage /> }
        ]
    }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
