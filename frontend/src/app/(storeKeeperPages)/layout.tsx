'use client';
import React from "react";
import FloatingAlert from "@/components/alert";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

import "../../css/adminCss/staff.css"
import '../../css/adminCss/adminResult.css'
import StoreKeeperFrame from "@/components/dashboardFrames/storeKeeperFrame";




const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    alertVisible,
    setAlertVisible,
    isSuccess,
    messages,

    OnbodyClick,
  } = useContext(AuthContext)!


  return (
    <div>
      <div>
        <FloatingAlert
          message={messages}
          isVisible={alertVisible}
          onClose={() => setAlertVisible(false)}
          successs={isSuccess}
        />
      </div>
      <div className="position-sticky1">
        <StoreKeeperFrame />
      </div>



      <div className={`dashboard-main-content `}>
        <div className="mt-4" onClick={OnbodyClick}>

          <div>
            {children}

            {/* <DashboardFooter /> */}


          </div>



        </div>

      </div>
    </div>
  );
}

export default RootLayout;