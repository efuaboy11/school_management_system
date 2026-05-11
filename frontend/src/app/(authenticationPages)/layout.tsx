'use client';
import React from "react";
import AuthNavbar from "@/components/authNavbar";
import FloatingAlert from "@/components/alert";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";



const RootLayout = ({ children }: { children: React.ReactNode }) => { 
  const { 
    alertVisible,
    setAlertVisible,
    isSuccess,
    messages,
  } = useContext(AuthContext)!
  
  
  return (
   <div>
        <div className="position-sticky1">
          <AuthNavbar />
        </div>      
        <div>
          <FloatingAlert
            message={messages}
            isVisible={alertVisible}
            onClose={() => setAlertVisible(false)}
            successs={isSuccess}
          />
        </div>
      <div>{children}</div>
   </div>
  );
}

export default RootLayout;