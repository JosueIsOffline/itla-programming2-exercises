import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h1 className="text-4xl text-red-600">Error 404: Page Not Found</h1>
      <Link to={"/"}>
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
