import React from "react";
import { useForm } from "react-hook-form";

export const InputForm = ({ changeData }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    changeData(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ margin: "auto", textAlign: "start", padding: "20px" }}
    >
      <h5>Private Variables:</h5>
      <p>
        These are variables that the client and the server will not share and
        keep secret
      </p>
      <p>
        Client Private Variable:{" "}
        <input
          {...register("clientPrivate")}
          type="number"
          name="clientPrivate"
          required
        />
      </p>
      <p>
        Server Private Variable:{" "}
        <input
          {...register("serverPrivate")}
          type="number"
          name="serverPrivate"
          required
        />
      </p>

      <h5>Public Variables</h5>
      <p>
        These are pre-decided variables that the server and the client agree on
      </p>
      <p>
        G:{" "}
        <input {...register("publicG")} type="number" name="publicG" required />
      </p>
      <p>
        N:{" "}
        <input {...register("publicN")} type="number" name="publicN" required />
      </p>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;
