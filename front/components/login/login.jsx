import axios from "axios";
import { useForm } from "react-hook-form";
import setAuthToken from "../../helpers/interceptor";
import styles from "./login.module.css";

function Login() {
    const url = "http://localhost:3000/login";
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();



    const onSubmit = (data) => {
        const loginPayload = {
          email: data.email,
          password: data.password
        }
      
        axios.post(url, loginPayload)
          .then(response => {
            const token  =  response.data.token;

            localStorage.setItem("token", token);
            setAuthToken(token);

            window.location.replace('/');
          })
      };
     
  return (
    <div className={styles.container}>
        <h1>Login</h1>
        <br />  <br />
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
            type="text"
            placeholder="email"
            {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
            <input
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
            <input type="submit" />
        </form>
    </div>
  )
}

export default Login