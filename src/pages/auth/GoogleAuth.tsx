import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"success" | "fail" | "loading">(
    "loading"
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setStatus("success");

      // setTimeout(() => {
      //   navigate("/");
      // }, 1500);
    } else {
      setStatus("fail");
    }
  }, [navigate]);

  return (
    <div className="auth-wrapper">
      {status === "loading" && (
        <h2 className="auth-text loading ">Processing Google login...</h2>
      )}
      {status === "success" && (
        <h2 className="auth-text success text-green-400 text-center mt-80">
          ✅ Login successful
        </h2>
      )}
      {status === "fail" && (
        <h2 className="auth-text fail">❌ Google login failed</h2>
      )}
    </div>
  );
};

export default GoogleAuth;
