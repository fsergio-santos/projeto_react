import React from "react";

const MensagemErro = ({ error, message }) => {
  return (
    <React.Fragment>
      {error && (
        <div className="invalid-feedback">
          {message.map((erro, index) => {
            return (
              <p key={index} style={{ margin: "0" }}>
                <span>{erro}</span>
              </p>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default MensagemErro;
