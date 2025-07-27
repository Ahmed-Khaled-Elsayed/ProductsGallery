import axios from "axios";
import ProductCard from "../../Components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BsSortUp } from "react-icons/bs";
import { RiseLoader } from "react-spinners";

function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");

  async function getAllProducts() {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const searchAndSortProducts = useMemo(()=>{
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case "name-asc":
        filtered?.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-des":
        filtered?.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "price-asc":
        filtered?.sort((a, b) => a.price - b.price);
        break;
      case "price-des":
        filtered?.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  },[searchQuery, sortBy,data]) 
  

  const handleSortChange = (e)=>
  {
    setSortBy(e.target.value)
  }
  const handleSearchChange = (e)=>{
    setSearchQuery(e.target.value)
  }
console.log(data)



  return (
    <>
    {!isLoading ?(<div className="w-[90%] mx-auto dark:bg-gray-900">

      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-blue-500">Discover Amazing Products</h1>
        <p className="text-xl pt-2 text-gray-400">
          Explore our collection of premium products designed to enhance your
          lifestyle
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 p-3 border border-l-0 border-r-0 border-gray-200 rounded-xl mb-5">
  <div className="w-full md:w-1/3">
    <form className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <CiSearch size={20} color="blue" />
        </div>
        <input
          type="search"
          className="block w-full px-4 py-3 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:outline-blue-500 dark:bg-gray-800 dark:text-white"
          placeholder="Search Products"
          onChange={handleSearchChange}
        />
      </div>
    </form>
  </div>

  <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
    <label
      htmlFor="sort"
      className="font-bold text-gray-700 flex items-center gap-1 dark:text-white"
    >
      <BsSortUp size={20} /> Sort by:
    </label>
    <select
      id="sort"
      className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-blue-500 dark:bg-gray-800 dark:text-white"
      onChange={handleSortChange}
    >
      <option value="name-asc">Name (A-Z)</option>
      <option value="name-des">Name (Z-A)</option>
      <option value="price-asc">Price (low to high)</option>
      <option value="price-des">Price (high to low)</option>
    </select>
  </div>
</div>



      <div className="flex flex-wrap ">
        {searchAndSortProducts?.map((product, idx) => (
          <div
            key={idx}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>):( <div className="flex justify-center items-center h-screen">
          <RiseLoader color="#396cec" />
        </div>)}</>
  );
}

export default Products;
