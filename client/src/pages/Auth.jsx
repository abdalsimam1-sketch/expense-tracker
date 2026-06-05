import { useState } from "react";

export const Auth = () => {
  const AUTH_MODES = {
    LOGIN: "login",
    REGISTER: "register",
  };
  const [mode, setMode] = useState(AUTH_MODES.LOGIN);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const formShape = {
    username: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(formShape);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="auth-page d-flex justify-content-center align-items-center">
      <div className="card  auth-card p-3 d-flex flex-column gap-3">
        <h3>
          {mode === AUTH_MODES.LOGIN ? (
            <div className="d-flex flex-column">
              <span>Login</span>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <span>Create Account</span>
            </div>
          )}
        </h3>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
          {mode === AUTH_MODES.REGISTER && (
            <div className="d-flex flex-column">
              <div className="d-flex justify-content-between">
                <label htmlFor="username">Username</label>
                {error && (
                  <span className="text-danger fw-bold text-capitalize">
                    {error}
                  </span>
                )}
              </div>
              <input
                type="text"
                className={`form-control ${error ? "border-danger" : ""}`}
                id="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData((current) => ({
                    ...current,
                    username: e.target.value,
                  }))
                }
              />
            </div>
          )}
          <div className="d-flex flex-column">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${error ? "border-danger" : ""}`}
              id="email"
              onChange={(e) =>
                setFormData((current) => ({
                  ...current,
                  email: e.target.value,
                }))
              }
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${error ? "border-danger" : ""}`}
              id="password"
              onChange={(e) =>
                setFormData((current) => ({
                  ...current,
                  password: e.target.value,
                }))
              }
            />
          </div>
          <button className="btn btn-secondary p-1">
            {loading ? (
              <span className="spinner-border"></span>
            ) : (
              <span className="">
                {mode === AUTH_MODES.LOGIN ? <>Login</> : <>Register</>}
              </span>
            )}
          </button>
        </form>

        <span className="text-center">
          {mode === AUTH_MODES.LOGIN ? (
            <>
              Don't have an account yet ?{" "}
              <span
                className="text-decoration-underline cursor-pointer fw-bold text-muted"
                onClick={() => {
                  setMode(AUTH_MODES.REGISTER);
                  setError("");
                  setFormData(formShape);
                }}
              >
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account ?{" "}
              <span
                className="text-decoration-underline cursor-pointer fw-bold text-muted"
                onClick={() => {
                  setMode(AUTH_MODES.LOGIN);
                  setError("");
                  setFormData(formShape);
                }}
              >
                Login
              </span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};
