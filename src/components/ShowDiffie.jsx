import React, { useState, useEffect, useRef } from "react";
/* global BigInt */
export const ShowDiffie = ({ data }) => {
  const [variables, setVariables] = useState(false);
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
          <p>Client creates there public variable:</p>
          <p>
            <var>G</var>
            <sup>
              <var>clientSecret</var>
            </sup>{" "}
            mod <var>N</var> = <var>clientPublic</var>
          </p>
          <p>
            <var>{variables?.publicG}</var>
            <sup>
              <var>{variables?.clientPrivate}</var>
            </sup>{" "}
            mod <var>{variables?.publicN}</var> ={" "}
            <var>{Number(variables?.gClient)}</var>
          </p>
          <p>Server creates there public variable</p>
          <p>
            <var>G</var>
            <sup>
              <var>serverSecret</var>
            </sup>{" "}
            mod <var>N</var> = <var>serverPublic</var>
          </p>
          <p></p>
          <p>
            <var>{variables?.publicG}</var>
            <sup>
              {" "}
              <var>{variables?.serverPrivate}</var>
            </sup>{" "}
            mod <var>{variables?.publicN}</var> ={" "}
            <var>{Number(variables?.gServer)}</var>
          </p>
          <h5>
            2. The server and client share these variables with each other
          </h5>

          <h5>3. On the server side once they have received clients public</h5>
          <p>
            <var>clientPublic</var>
            <sup>
              {" "}
              <var>serverSecret </var>
            </sup>{" "}
            mod <var>N</var> = <var>sharedSecret</var>
          </p>
          <p>
            <var>{Number(variables?.gServer)}</var>
            <sup>
              <var>{Number(variables?.gClient)}</var>
            </sup>{" "}
            mod <var>{variables?.publicN}</var> ={" "}
            <var>{Number(variables.serverGClient)}</var>
          </p>
          <h5>
            4. On the client side once they have received the servers public
          </h5>
          <p>
            <var>serverPublic</var>
            <sup>
              <var>clientSecret</var>
            </sup>{" "}
            mod <var>N</var> = <var>sharedSecret</var>
          </p>
          <p>
            <var>{Number(variables?.gClient)}</var>
            <sup>
              <var>{Number(variables?.gServer)}</var>
            </sup>{" "}
            mod <var>{variables?.publicN}</var> ={" "}
            <var>{Number(variables.clientGServer)}</var>
          </p>

          <h5>
            Both the client and the server have created a shared secret by only
            passing public variables accross that cannot be used to work out the
            shared secret or either of the client or server private variables.
          </h5>
          <p>This is because we can simply the whole equation down to </p>
          <p>
            (G<sup>clientSecret</sup> mod N )<sup>serverSecret</sup> mod N = (G
            <sup>serverSecret</sup> mod N )<sup>clientSecret</sup> mod N = G
            <sup>clientSecret x serverSecret</sup> mod N
          </p>
          <p>
            If you are confused about why this is equal to each other. It is
            based off of (<var>x</var>
            <sup>a</sup>)<sup>b</sup>=<var>x</var>
            <sup>
              <var>a</var>
              <var>b</var>
            </sup>{" "}
            and modular exponentiation
          </p>

          <p>Modular exponentiation links:</p>
          <p>
            <a
            target="_blank"
            rel="noreferrer"
            href="https://www.youtube.com/watch?v=EHUgNLN8F1Y&ab_channel=GVSUmath"
          >
            https://www.youtube.com/watch?v=EHUgNLN8F1Y&ab_channel=GVSUmath
          </a>
          </p>
          <p>
            <a
            target="_blank"
            rel="noreferrer"
            href="https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/modular-exponentiation"
          >
            https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/modular-exponentiation
          </a>
          </p>
          
        </div>
      )}
    </div>
  );
};

export default ShowDiffie;
