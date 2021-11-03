import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { useAuth } from "../AuthContext";
import TextInput from "../ui/TextInput";
import * as Yup from "yup";

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Enter a title."),
  body: Yup.string(),
  url: Yup.string().url(),
});

const CreatePost = () => {
  const authContext = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.post("/api/posts", values);
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
        title: "",
        body: "",
        url: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={PostSchema}
    >
      <Form>
        <h1>Create a post</h1>
        <TextInput label="Title" id="title" name="title" type="text" />
        <TextInput label="Body" id="body" name="body" type="text" />
        <TextInput label="URL" id="url" name="url" type="text" />
        <button type="submit" disabled={loading}>
          Submit
        </button>
        {error && <div className="error">{error}</div>}
      </Form>
    </Formik>
  );
};

export default CreatePost;
