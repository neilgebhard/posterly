import axios from "axios";
import { useState } from "react";
import { Formik, Form } from "formik";
import TextArea from "../ui/TextArea";
import * as Yup from "yup";

const CommentSchema = Yup.object().shape({
  text: Yup.string().required("Enter a comment."),
});

const CreateComment = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.post(
        `/api/post/${props.postId}/comment`,
        values
      );
    } catch (error) {
      setLoading(false);
      const { data } = error.response;
      setError(data.message);
    }
  };

  return (
    <Formik
      initialValues={{
        text: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={CommentSchema}
    >
      <Form>
        <TextArea label="Comment" id="text" name="text" type="text" />
        <button type="submit" disabled={loading}>
          Post
        </button>
        {error && <div className="error">{error}</div>}
      </Form>
    </Formik>
  );
};

export default CreateComment;
