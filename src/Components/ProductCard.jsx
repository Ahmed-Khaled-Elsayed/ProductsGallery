import { FaStar } from "react-icons/fa";
import { RiMoneyPoundCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/product/${product.id}`);
      }}
      className="w-full group bg-white border border-gray-200 rounded-xl pb-2 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg cursor-pointer overflow-hidden 
      dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="h-[220px] sm:h-[260px] md:h-[300px] overflow-hidden">
        <img
          src={product.image}
          alt="productImg"
          className="w-full h-full object-cover rounded-t-xl group-hover:scale-110  transition-transform duration-300"
        />
      </div>

      <div className="px-3 py-4 sm:px-4 sm:py-5">
        <h3 className="text-lg sm:text-xl font-semibold line-clamp-1 dark:text-white">
          {product.title.split(" ").slice(0, 3).join(" ")}
        </h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-1 h-[70px] dark:text-gray-300">
          {product.description.split(" ").slice(0, 15).join(" ")}
        </p>

        <div className="mt-3 flex items-center gap-2 text-sm sm:text-base dark:text-yellow-400">
          <FaStar color="gold" />
          <span>{product.rating.rate}</span>
          <span className="text-gray-400 text-sm dark:text-gray-300">
            ({product.rating.count} reviews)
          </span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-green-500 text-base sm:text-xl flex gap-1.5 items-center dark:text-green-300">
            <RiMoneyPoundCircleLine size={22} />
            ${product.price}
          </div>
          <div className="rounded-2xl border border-gray-400 flex justify-center items-center px-2 py-0.5 text-xs font-semibold dark:border-gray-600 dark:text-gray-300">
            {product.category}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
