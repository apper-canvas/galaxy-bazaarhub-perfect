import { Link } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md mx-auto text-center px-6">
        <div className="mb-8">
          <ApperIcon name="AlertCircle" size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-6xl font-bold text-gray-300 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">
              <ApperIcon name="Home" size={20} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <Link to="/cart">
            <Button variant="outline" className="w-full">
              <ApperIcon name="ShoppingCart" size={20} className="mr-2" />
              View Cart
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team or browse our products.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;