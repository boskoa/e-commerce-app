import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Completion() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/"), 4000);
  }, [navigate]);

  return <h4>Payment was successful</h4>;
}

export default Completion;
