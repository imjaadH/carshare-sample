import React, { useEffect } from "react";
import { Provider } from "./context";
import { MapProvider } from "react-map-gl";
import { AuthLayout } from "./components/";
import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) {
    toast.error(`[Network error]: ${networkError}`);
  }
});

const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000/" })]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider>
        <MapProvider>
          <div
            className={`wrapper w-full min-h-screen bg-gray-200 flex items-center justify-center`}
          >
            <div className={`body max-w-xxl m-0 m-auto`}>
              <AuthLayout />
            </div>
          </div>
        </MapProvider>
      </Provider>
      <ToastContainer />
    </ApolloProvider>
  );
}

export default App;
