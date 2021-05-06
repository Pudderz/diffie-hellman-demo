import React from "react";
import { useForm } from "react-hook-form";

export const InputForm = ({changeData}) => {
  const { register, handleSubmit } = useForm();


  const onSubmit = (data) =>{
    console.log(data);
    changeData(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <p>Public Variables</p>
      <p>
        Client Private Variable:{" "}
        <input {...register("clientPrivate")} type="number" name="clientPrivate" required/>
      </p>
      <p>
        Server Private Variable:{" "}  
        <input {...register("serverPrivate")} type="number" name="serverPrivate" required/>
      </p>

      <p>Public Variables</p>
      <p>
        G:
        <input {...register("publicG")} type="number" name="publicG" required/>
      </p>
      <p>
        N: <input {...register("publicN")} type="number" name="publicN" required/>
      </p>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;
