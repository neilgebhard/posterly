import axios from "axios";
import { useState } from "react";
import { Formik, Form } from "formik";
import TextArea from "../ui/TextArea";
import Error from "../components/Error";
import SubmitButtom from "../ui/SubmitButton";
import * as Yup from "yup";
import { useAuth } from "../context/Auth";
import type { Post } from "../types";

type AppProps = {
  postId: string;
  setPost: (post: Post) => void;
};

type FormValues = { text: string };

const CommentSchema = Yup.object().shape({
  text: Yup.string().required("Enter a comment."),
});

const CreateComment = ({ postId, setPost }: AppProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { username } = useAuth().auth;

  const handleSubmit = async (
    values: FormValues,
    actions: { resetForm: (values: {}) => void }
  ) => {
    try {
      setLoading(true);
      setError("");
      const { data }: { data: Post } = await axios.post(
        `/api/posts/${postId}/comments`,
        values
      );
      setPost(data);
      setLoading(false);
      actions.resetForm({
        values: {
          text: "",
        },
      });
    } catch (e: any) {
      setLoading(false);
      const { data } = e.response;
      setError(data);
    }
  };

  const initialValues: FormValues = { text: "" };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
      validationSchema={CommentSchema}
    >
      <Form className="space-y-3 mb-3">
        <TextArea
          id="comment-text"
          label={`Comment as ${username}`}
          name="text"
          type="text"
          rows={2}
        />
        <div className="sm:flex sm:justify-end">
          <SubmitButtom
            id="submit-btn"
            className="w-full sm:w-auto"
            loading={loading}
          >
            Comment
          </SubmitButtom>
        </div>
        {error && <Error error={error} />}
      </Form>
    </Formik>
  );
};

export default CreateComment;
