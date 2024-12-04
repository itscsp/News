import { createBrowserRouter, RouterProvider } from "react-router";
import React, { Suspense } from "react";
import RootLayout from "./pages/RootLayout";
import { AppProvider } from "./context/AppContext";
import { NewsProvider } from "./context/NewsContext";
import Loader from "./components/Loader/Loader";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const ForYouPage = React.lazy(() => import("./pages/ForYouPage"));
const CategoryPage = React.lazy(() => import("./pages/CategoryPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "/preference",
        element: (
          <Suspense fallback={<Loader /> }>
            <ForYouPage />
          </Suspense>
        ),
      },
      {
        path: "/category",
        element: (
          <Suspense fallback={<Loader />}>
            <CategoryPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AppProvider>
      <NewsProvider>
        <RouterProvider router={router} />
      </NewsProvider>
    </AppProvider>
  );
}

export default App;
