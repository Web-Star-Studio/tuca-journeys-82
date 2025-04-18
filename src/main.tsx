
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { publicRoutes } from './routes/publicRoutes'
import { protectedRoutes } from './routes/protectedRoutes'
import { adminRoutes } from './routes/adminRoutes'
import { partnerRoutes } from './routes/partnerRoutes'

import { Toaster } from '@/components/ui/sonner'
import QueryProvider from './providers/QueryProvider'
import NavigationProvider from './providers/NavigationProvider'
import { ThemeProvider } from './contexts/ThemeContext'
import { CartProvider } from './contexts/CartContext'
import { WishlistProvider } from './contexts/WishlistContext'
import { AuthProvider } from './contexts/AuthContext'
import { UIProvider } from './contexts/UIContext'
import ScrollToTop from './components/utils/ScrollToTop'

import './index.css'
import './App.css'

const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
  ...adminRoutes,
  ...partnerRoutes, // Add partner routes
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <NavigationProvider>
          <AuthProvider>
            <UIProvider>
              <CartProvider>
                <WishlistProvider>
                  <RouterProvider router={router} />
                  <ScrollToTop />
                  <Toaster />
                </WishlistProvider>
              </CartProvider>
            </UIProvider>
          </AuthProvider>
        </NavigationProvider>
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>,
)
