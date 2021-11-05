import axios from "axios";
import { useState } from "react";
import { Formik, Form } from "formik";
import TextArea from "../../ui/TextArea";
import * as Yup from "yup";

const ReplySchema = Yup.object().shape({
  text: Yup.string().required("Enter a reply."),
});

const CreateReply = ({ comment, postId, setPost, setIsReplying }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (values, actions) => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.post(
        `/api/posts/${postId}/comment/${comment._id}/reply`,
        values
      );
      setPost(data);
      setLoading(false);
      setIsReplying(false);
      actions.resetForm({
        values: {
          text: "",
        },
      });
    } catch (e) {
      setLoading(false);
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
      <Form>
        <TextArea label="Reply" id="text" name="text" type="text" />
        <button type="submit" disabled={loading}>
          reply
        </button>
        {error && <div className="error">{error}</div>}
      </Form>
    </Formik>
  );
};

export default CreateReply;
