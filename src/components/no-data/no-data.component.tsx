import Image from "next/image";
import React from "react";

interface NoDataFoundProps {
  total?: number;
  message?: string;
  emptyRowTitle?: string;
  emptyRowMessage?: string;
}
const NoDataFound = (props: NoDataFoundProps) => {
  const { message, emptyRowTitle, emptyRowMessage } = props;
  return (
    <div className="flex flex-col items-center justify-center h-full mb-2 w-100">
      <Image
        width={200}
        height={200}
        alt={"No data found"}
        src="/empty-state.svg"
        priority={true}
      />
      <div className="flex flex-col items-center">
        {message ? (
          <p className="text-center text-secondary-800 font-medium text-lg">{message}</p>
        ) : (
          <>
            <p className="text-center font-medium text-lg">{emptyRowTitle}</p>
            <p className="text-center text-base">{emptyRowMessage}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default NoDataFound;
