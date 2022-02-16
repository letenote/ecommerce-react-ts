import React from "react";
import { TestId } from "../../constant/TestId";

const Fallback404: React.FC<{}> = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div data-testid={TestId.containers.fallback404.id} style={{ display: "none" }}>{TestId.containers.fallback404.value}</div>
      <div className="pt-8 pb-15 sm:pt-8 sm:pb-15 lg:pt-8 lg:pb-15">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          404 !!
        </div>
      </div>
    </div>
  )
}

export default Fallback404;