import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    // createHttpLink,
} from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

// import classes from "./App.css";
import ScrollToTop from "./utils/ScrollToTop";

import Header from "./containers/Header";
import Footer from "./containers/Footer";

import Home from "./pages/Home";
import Stock from "./pages/Stock";
import Register from "./pages/Register";
import Login from "./pages/LoginForm";
import Profile from "./pages/Profile";
import About from "./pages/About";
// import SearchResults from "./pages/SearchResults";


// const httpLink = createHttpLink({
//   uri: "/graphql",
// });

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("id_token");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
});


function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <ScrollToTop>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/valuations/:id" element={<Stock />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/about" element={<About />} />
                        {/* <Route path="/search" element={<SearchResults />} /> */}
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </Router>
        </ApolloProvider>
    );
}

export default App;
