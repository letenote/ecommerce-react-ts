import React from "react";

interface FallbackLoadingInterface {
  message?: string,
  minHeight?: string
}

const FallbackLoading: React.FC<FallbackLoadingInterface> = ({ message = "Loading..", minHeight = "0px" }) => {
  return (
    <div
      className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ minHeight }}
    >
      {message}
    </div>
  )
}

export default FallbackLoading;