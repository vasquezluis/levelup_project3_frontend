import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ContextProvider } from "./contexts/ContextProvider";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Get all data insive provider */}
    <ContextProvider>
      {/* user react query component */}
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ContextProvider>
  </React.StrictMode>
);
