import axios from "axios";
import { useState } from "react";
import { Formik, Form } from "formik";
import TextArea from "../ui/TextArea";
import SubmitButton from "../ui/SubmitButton";
import Error from "./Error";
import * as Yup from "yup";
import type { Comment } from "../types";

const ReplySchema = Yup.object().shape({
  text: Yup.string().required("Enter a reply."),
});

type AppProps = {
  comment: Comment;
  postId: string;
  fetchPost: () => void;
  setShowReply: (showReply: boolean) => void;
};

type FormValues = { text: string };

const CreateReply = ({
  comment,
  postId,
  fetchPost,
  setShowReply,
}: AppProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (
    values: FormValues,
    actions: { resetForm: (values: {}) => void }
  ) => {
    try {
      setLoading(true);
      setError(false);
      await axios.post(
        `/api/posts/${postId}/comments/${comment._id}/replies`,
        values
      );
      fetchPost();
      setLoading(false);
      setShowReply(false);
      actions.resetForm({
        values: {
          text: "",
        },
      });
    } catch (e: any) {
      setLoading(false);
      console.log(e);
      const { data } = e.response;
      setError(data.message);
    }
  };

  const initialValues: FormValues = { text: "" };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
      validationSchema={ReplySchema}
    >
      <Form className="space-y-3 m-3">
        <TextArea
          id="reply-text"
          name="text"
          type="text"
          rows={3}
          placeholder="What are your thoughts?"
        />
        <div className="flex justify-end">
          <SubmitButton id="submit-btn" disabled={loading}>
            Reply
          </SubmitButton>
        </div>
        {error && <Error error={error} />}
      </Form>
    </Formik>
  );
};

export default CreateReply;
