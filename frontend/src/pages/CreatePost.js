import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { useAuth } from "../context/Auth";
import TextInput from "../ui/TextInput";
import TextArea from "../ui/TextArea";
import SubmitButton from "../ui/SubmitButton";
import Error from "../ui/Error";
import * as Yup from "yup";

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Enter a title."),
  body: Yup.string(),
  url: Yup.string().url("URL must be a valid URL."),
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
    } catch (e) {
      setLoading(false);
      const { data } = e.response;
      setError(data.message);
    }
  };

  return (
    <main className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-md w-full space-y-8">
        <Formik
          initialValues={{
            title: "",
            body: "",
            url: "",
          }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={PostSchema}
        >
          <Form className="space-y-6">
            <h1>Create a post</h1>
            <TextInput
              label="Title"
              id="title"
              name="title"
              type="text"
              autoFocus
            />
            <TextArea label="Body" id="body" name="body" type="text" />
            <TextInput label="URL" id="url" name="url" type="text" />
            <SubmitButton
              id="create-post-btn"
              loading={loading}
              className="text-2xl"
            >
              Create post
            </SubmitButton>
            {error && <Error error={error} />}
          </Form>
        </Formik>
      </section>
    </main>
  );
};

export default CreatePost;
