import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <b>Not found</b>
      <Link to="/"> Back to home page</Link>
    </div>
  );
}
