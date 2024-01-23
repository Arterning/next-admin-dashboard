"use client";

import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <h1>Login Form</h1>
      <input type="text" placeholder="ning" name="username" value={"ning"}/>
      <input type="password" placeholder="123456" name="password" value={"123456"}/>
      <button>Login</button>
      {state && state}
    </form>
  );
};

export default LoginForm;
