import React, { useState, useEffect, useRef } from "react";
/* global BigInt */
export const ShowDiffie = ({ data }) => {
  const [variables, setVariables] = useState({});
  const shouldRun = useRef(false);
  useEffect(() => {
    if (data) {
      shouldRun.current = true;
      setVariables({
        ...data,
        gClient:
          BigInt(data?.publicG) ** BigInt(data?.clientPrivate) %
          BigInt(data?.publicN),
        gServer:
          BigInt(data?.publicG) ** BigInt(data?.serverPrivate) %
          BigInt(data?.publicN),
      });
    }
  }, [data]);

  useEffect(() => {
    console.log(variables);
    if (variables && shouldRun.current) {
      shouldRun.current = false;
      setVariables((prevState) => {
        return {
          ...prevState,
          serverGClient: BigInt(
            variables.gClient ** BigInt(variables.serverPrivate) %
              BigInt(variables?.publicN)
          ),
          clientGServer: BigInt(
            variables.gServer ** BigInt(variables.clientPrivate) %
              BigInt(variables?.publicN)
          ),
        };
      });
    }
  }, [variables]);
  return (
    <div>
      {variables && (
        <div style={{ textAlign: "start", padding: "20px" }}>
          <h5>
            1. Client and server create their public variables using a private
            variable each
          </h5>
          <p>Client</p>
          <p>
            {variables?.publicG}<sup>{variables?.clientPrivate}</sup> mod{" "}
            {variables?.publicN} = {Number(variables?.gClient)}
          </p>
          <p>Server</p>
          <p>
            {variables?.publicG}<sup>{variables?.serverPrivate}</sup> mod{" "}
            {variables?.publicN} = {Number(variables?.gServer)}
          </p>
          <h5>2. The server and client share these variables with each other</h5>

          <h5>3. On the server Side once they have received clients public</h5>
          <p>
            clientPublic<sup>serverSecret</sup> mod N ={" "}
            sharedSecret
          </p>
          <p>
            {Number(variables?.gServer)}<sup>{Number(variables?.gClient)}</sup> mod{" "}
            {variables?.publicN} = {Number(variables.serverGClient)}
          </p>
          <h5>4. On the client Side once they have received clients public</h5>
          <p>
            serverPublic<sup>clientSecret</sup> mod N ={" "}
            sharedSecret
          </p>
          <p>
            {Number(variables?.gClient)}<sup>{Number(variables?.gServer)}</sup> mod{" "}
            {variables?.publicN} = {Number(variables.clientGServer)}
          </p>

          <h5>
            Both the client and the server have created a shared secret by only
            passes puclic variables accross
          </h5>
        </div>
      )}
    </div>
  );
};

export default ShowDiffie;
