import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Formik, Form } from "formik";
import TextInput from "../ui/TextInput";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be 3 characters or more.")
    .required("Username is required."),
  email: Yup.string().email("Invalid email.").required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be 8 characters or more.")
    .required("Password is required."),
});

const Signup = () => {
  const authContext = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.post("/api/signup", values);
      authContext.setAuthState(data);
      history.push("/");
    } catch (error) {
      setLoading(false);
      const { data } = error.response;
      setError(data.message);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={SignupSchema}
    >
      <Form>
        <h1>Signup</h1>
        <TextInput label="Username" id="username" name="username" type="text" />
        <TextInput label="Email" id="email" name="email" type="text" />
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

export default Signup;
