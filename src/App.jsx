import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Products from "./Pages/Products/Products";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  const route = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <Products /> },
        { path: "/product/:id", element: <ProductDetails /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route} />
    </QueryClientProvider>
  );
}

export default App;
