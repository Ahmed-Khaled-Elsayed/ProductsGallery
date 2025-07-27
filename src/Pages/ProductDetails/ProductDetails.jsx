import React, { useState } from "react";
import { FaCartPlus, FaStar, FaStarHalfAlt } from "react-icons/fa";
import img from "../../assets/images/slider-image-3.jpeg";
import { RiMoneyPoundCircleLine } from "react-icons/ri";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RiseLoader } from "react-spinners";

function ProductDetails() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [counter,setCounter] = useState(1)
// console.log(id);

  async function getProductByID()
  {
    const { data} =await axios.get(`https://fakestoreapi.com/products/${id}`);
    return data
  }

  const { data, isLoading } = useQuery({
    queryKey: ["product" ,id],
    queryFn: getProductByID,
  });

  console.log(data);
  
  function getGoldStars(rate) {
    const fullStars = Math.floor(rate);
    const halfStar = rate - fullStars >= 0.5;
    return {
      gold: fullStars,
      half: halfStar ? 1 : 0,
      empty: 5 - fullStars - (halfStar ? 1 : 0),
    };
  }

  return (
    <>
    {!isLoading?(<div className="w-[90%]  mx-auto py-10">
      <button
        onClick={() => navigate("/")}
        className=" cursor-pointer flex items-center gap-2 mb-6 text-sm font-semibold text-blue-600 hover:text-white hover:bg-blue-500 border border-blue-500 px-4 py-2 rounded-full"
      >
        <FaArrowLeftLong />
        Return to Products
      </button>

      <div className="flex flex-col h-fit lg:flex-row gap-8 bg-white p-6 rounded-xl shadow-md dark:bg-gray-800 ">
        <div className="lg:w-1/2 w-full ">
          <img
            src={data?.image}
            alt="ProductImg"
            className=" w-full h-[400px] rounded-lg "
          />
        </div>

        <div className="lg:w-1/2 w-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{data?.title.split(" ").slice(0,3).join(" ")}</h1>
              <span className="text-lg px-3 py-1 rounded-2xl border border-gray-300 text-center text-gray-600 dark:text-gray-400">
                {data?.category}              
                </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              {data?<div className="flex items-center gap-1">
                {[...Array(getGoldStars(data?.rating.rate).gold)].map(() => (
                  <FaStar className="text-yellow-400" size={20} />
                ))}

                {getGoldStars(data?.rating.rate).half === 1 && (
                  <FaStarHalfAlt  className="text-yellow-400 " size={20} />
                )}

                {[...Array(getGoldStars(data?.rating.rate).empty)].map(() => (
                  <FaStar className="text-gray-300 dark:text-gray-500" size={20} />
                ))}
              </div>:""}
              

              <span className="text-xl font-medium dark:text-gray-300">{data?.rating.rate}</span>
              <span className="text-gray-500">({data?.rating.count} reviews)</span>
            </div>

            <div className="flex items-center gap-2 text-3xl font-bold text-green-600 mb-6">
              <RiMoneyPoundCircleLine size={30} />
              ${data?.price}
            </div>

            <div className="border-y border-y-gray-300 py-4">
              <h2 className="text-lg font-semibold mb-2 dark:text-white">Description</h2>
              <p className="text-gray-600 dark:text-gray-400">
                {data?.description}
              </p>
            </div>

                
                <div className=" border border-gray-300 w-fit p-1 rounded-lg mx-auto mt-5">
                  <button className="w-7  h-8 cursor-pointer hover:bg-blue-100   rounded-lg text-center dark:text-white dark:hover:bg-blue-500"
                  onClick={()=>{setCounter(counter-1)}}>-</button>
                  <input type="text" value={counter}  className="w-10 text-center dark:text-white"/>
                  <button className="w-7  h-8 cursor-pointer hover:bg-blue-100   rounded-lg text-center dark:text-white dark:hover:bg-blue-500"
                  onClick={()=>{setCounter(counter+1)}}>+</button>
                </div>

            <button
                className="bg-blue-500 w-full flex items-center justify-center cursor-pointer hover:text-gray-300 text-center py-3 rounded mt-3 text-white"
              >
                <FaCartPlus className="mx-1" size={20} />  add to cart
              </button>
          </div>
        </div>
      </div>
    </div>):(<div className="flex justify-center items-center h-screen">
          <RiseLoader color="#396cec" />
        </div>)

    }</>
    
  );
}

export default ProductDetails;
