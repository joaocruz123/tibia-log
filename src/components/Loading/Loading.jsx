import React, { useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";

function _LoadingComponent({ isActive }) {
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "auto";
      document.body.style.height = "100%";
    }
    if (!isActive) {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }, [isActive]);

  return (
    <>
      <LoadingOverlay
        active={isActive}
        spinner
        styles={{
          wrapper: {
            width: "100%",
            height: "100%",
          },
          overlay: (base) => ({
            ...base,
            position: "fixed",
            zIndex: 9999,
          }),
        }}
      />
    </>
  );
}

const  LoadingComponent = React.memo(_LoadingComponent);
export default LoadingComponent;
