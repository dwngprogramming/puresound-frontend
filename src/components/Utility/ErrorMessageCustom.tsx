import React from "react";

const ErrorMessageCustom = ({message}: { message: string | undefined }) => {
  return (
    <div className="p-1">
      <div className="mt-2 text-sm w-full text-danger">
        {message}
      </div>
    </div>
  );
}

export default ErrorMessageCustom
