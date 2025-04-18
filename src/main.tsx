
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./contexts/AuthContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import NavigationProvider from "./providers/NavigationProvider";
import QueryProvider from "./providers/QueryProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <NavigationProvider>
          <AuthProvider>
            <WishlistProvider>
              <ThemeProvider>
                <App />
                <Toaster />
              </ThemeProvider>
            </WishlistProvider>
          </AuthProvider>
        </NavigationProvider>
      </BrowserRouter>
    </QueryProvider>
  </React.StrictMode>
);
