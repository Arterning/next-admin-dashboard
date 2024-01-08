"use client";

import { useRouter } from "next/navigation";
import React from "react";

/**
 * Server component can contains client component
 * @param {*} props 
 * @returns 
 */

const ButtonGroup = (props) => {

  const router = useRouter();

  const goBack = () => {
    router.back();
  } 
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          gap: "50px",
        }}
      >
        <button type="submit">Submit</button>
        <button type="button" onClick={goBack}>Cancel</button>
      </div>
    </>
  );
};

export default ButtonGroup;
