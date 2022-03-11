import React from "react";
import ReactDOM from "react-dom";
import { Landing } from "./pages/landing/landing";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RegisterPage } from "./pages/register-page/register";
import { ArtPage } from "./pages/single-work/single-work";
import { LoginPage } from "./pages/login-page/login-page";
import { FavoritesPage } from "./pages/favorites-page/favorites-page";
import { SearchPage } from "./pages/search-page/search-page";
import { AuthProvider } from "./hooks/use-auth-state"
import { FavsProvider } from "./hooks/use-favorites-state"

ReactDOM.render(
    <AuthProvider>
    <FavsProvider>
    <Router>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/viewWork" element={<ArtPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/search" element={<SearchPage />} />
        </Routes>
    </Router>
    </FavsProvider>
    </AuthProvider>
, document.querySelector("#root"));