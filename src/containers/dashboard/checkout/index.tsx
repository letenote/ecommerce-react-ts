import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TestId } from "../../../constant/TestId";
import { RootState } from "../../../redux/store";

const DashboardCheckout: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state);

  useEffect(() => {
    !user.isAuthentication && navigate(-1)
  }, []);

  useEffect(() => {
    !user.isAuthentication && navigate(-1)
  }, [user.isAuthentication]);

  return (
    <div className="relative bg-white overflow-hidden">
      <div data-testid={TestId.containers.checkout.id} style={{ display: "none" }}>{TestId.containers.checkout.value}</div>
      <div className="pt-8 pb-15 sm:pt-8 sm:pb-15 lg:pt-8 lg:pb-15">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          DashboardCheckout
        </div>
      </div>
    </div>
  )
};

export default DashboardCheckout;