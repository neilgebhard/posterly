import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { useAuth } from "../AuthContext";
import TextInput from "../ui/TextInput";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter an email."),
  password: Yup.string().required("Enter a password."),
});

const Login = () => {
  const authContext = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.post("/api/login", values);
      authContext.setAuthState(data);
      history.push("/");
    } catch (e) {
      setLoading(false);
      const { data } = e.response;
      setError(data.message);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={LoginSchema}
    >
      <Form>
        <h1>Login</h1>
        <TextInput label="Email" id="email" name="email" type="email" />
        <TextInput
          label="Password"
          id="password"
          name="password"
          type="password"
        />
        <button type="submit" disabled={loading}>
          Submit
        </button>
        {error && <div className="error">{error}</div>}
      </Form>
    </Formik>
  );
};

export default Login;
