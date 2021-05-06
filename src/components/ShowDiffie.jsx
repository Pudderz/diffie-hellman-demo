import React, { useState, useEffect } from "react";

export const ShowDiffie = ({ data }) => {
  const [variables, setVariables] = useState({});

  useEffect(() => {
    if (data) {
      setVariables({
        ...data,
        gClient: ((1*data?.publicG) ** (1*data?.clientPrivate)) % data?.publicN,
        gServer: (data?.publicG ** data?.serverPrivate) % data?.publicN,
      });
    }
  }, [data]);
  return (
    <div>
      {variables && (
        <div>
            <h5>1. Client and server ...</h5>
            <p>Client</p>
          <p>
            {variables?.publicG}^{variables?.clientPrivate} mod{" "}
            {variables?.publicN} ={" "}
            {variables?.gClient}
          </p>
          <p>Server</p>
          <p>
            {variables?.publicG}^{variables?.serverPrivate} mod{" "}
            {variables?.publicN} ={" "}
            {variables?.gServer}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShowDiffie;
