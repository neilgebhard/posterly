import axios from "axios";
import { useState } from "react";
import { Formik, Form } from "formik";
import TextArea from "../ui/TextArea";
import SubmitButton from "../ui/SubmitButton";
import Error from "../components/Error";
import * as Yup from "yup";

const ReplySchema = Yup.object().shape({
  text: Yup.string().required("Enter a reply."),
});

const CreateReply = ({ comment, postId, fetchPost, setShowReply }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (values, actions) => {
    try {
      setLoading(true);
      setError("");
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
    } catch (e) {
      setLoading(false);
      console.log(e);
      const { data } = e.response;
      setError(data.message);
    }
  };

  return (
    <Formik
      initialValues={{
        text: "",
      }}
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
