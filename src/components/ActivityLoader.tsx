import React from "react";

export const ActivityLoader = ({ size }: { size: number }) => {
  return (
    <div
      className={`lds-dual-ring w-[${size}] h-[${size}] absolute top-6 right-0 mr-12`}
    ></div>
  );
};

export default ActivityLoader;
