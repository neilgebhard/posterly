import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import SubmitButton from "../components/SubmitButton";
import Error from "../components/Error";
import * as Yup from "yup";

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Enter a title."),
  body: Yup.string(),
  url: Yup.string().url("URL must be a valid URL."),
});

type FormValues = {
  title: string;
  body: string;
  url: string;
};

const CreatePost = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      setError("");
      await axios.post("/api/posts", values);
      history.push("/");
    } catch (e: any) {
      setLoading(false);
      const { data } = e.response;
      setError(data.message);
    }
  };

  const initialValues: FormValues = {
    title: "",
    body: "",
    url: "",
  };
  return (
    <main className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-md w-full space-y-8">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={PostSchema}
        >
          <Form className="space-y-6">
            <h1>Create a post</h1>
            <hr className="border-white" />
            <TextInput
              data-testid="title"
              name="title"
              type="text"
              placeholder="Title"
            />
            <TextArea
              id="body"
              name="body"
              type="text"
              placeholder="Text (optional)"
            />
            <TextInput
              id="url"
              name="url"
              type="text"
              placeholder="URL (optional)"
            />
            <SubmitButton
              data-testid="create-post-btn"
              loading={loading}
              className="text-base float-right"
            >
              POST
            </SubmitButton>
            {error && <Error error={error} />}
          </Form>
        </Formik>
      </section>
    </main>
  );
};

export default CreatePost;
