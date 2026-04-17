import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from '@components/layout/Layout'
import ErrorBoundary from '@components/common/ErrorBoundary'
import Loader from '@components/common/Loader'

const HomePage          = lazy(() => import('@pages/HomePage'))
const ProductsPage      = lazy(() => import('@pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('@pages/ProductDetailPage'))
const CartPage          = lazy(() => import('@pages/CartPage'))
const CheckoutPage      = lazy(() => import('@pages/CheckoutPage'))
const AboutPage         = lazy(() => import('@pages/AboutPage'))
const ContactPage       = lazy(() => import('@pages/ContactPage'))
const OrderTrackingPage = lazy(() => import('@pages/OrderTrackingPage'))
const NotFoundPage      = lazy(() => import('@pages/NotFoundPage'))

function SuspenseWrapper({ children }) {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      {children}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path:         '/',
    element:      <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index:   true,
        element: <SuspenseWrapper><HomePage /></SuspenseWrapper>,
      },
      {
        path:    'products',
        element: <SuspenseWrapper><ProductsPage /></SuspenseWrapper>,
      },
      {
        path:    'products/:slug',
        element: <SuspenseWrapper><ProductDetailPage /></SuspenseWrapper>,
      },
      {
        path:    'cart',
        element: <SuspenseWrapper><CartPage /></SuspenseWrapper>,
      },
      {
        path:    'checkout',
        element: <SuspenseWrapper><CheckoutPage /></SuspenseWrapper>,
      },
      {
        path:    'about',
        element: <SuspenseWrapper><AboutPage /></SuspenseWrapper>,
      },
      {
        path:    'contact',
        element: <SuspenseWrapper><ContactPage /></SuspenseWrapper>,
      },
      {
        path:    'track-order',
        element: <SuspenseWrapper><OrderTrackingPage /></SuspenseWrapper>,
      },
    ],
  },
  {
    path:    '*',
    element: (
      <SuspenseWrapper><NotFoundPage /></SuspenseWrapper>
    ),
  },
])