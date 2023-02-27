import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ? react query
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// ? redux
import { Provider } from "react-redux";
import store from "./app/store.js";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Get all data insive provider */}
    <Provider store={store}>
      {/* user react query component */}
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
