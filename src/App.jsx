import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import SourcePage from "./pages/SourcePage";
import ForYouPage from "./pages/ForYouPage";
import CategoryPage from "./pages/CategoryPage";


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/for-you',
        element: <ForYouPage />
      },
      {
        path:'/category',
        element: <CategoryPage />
      },
      // {
      //   path: '/source',
      //   element: <SourcePage />
      // }
    ]
  }
])



function App() {
  return <RouterProvider router={router} />;
}
export default App;
