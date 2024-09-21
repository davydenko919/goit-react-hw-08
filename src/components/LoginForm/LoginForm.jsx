import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label >
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
          required
        />
      </label>
      <label >
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
          required
        />
      </label>
      <button type="submit" >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;