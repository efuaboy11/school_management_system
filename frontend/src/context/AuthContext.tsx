"use client"

import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { useRouter } from 'next/navigation';
import validator from 'validator';
import Cookies from 'js-cookie';

interface AuthContextType {
  authTokens: AuthTokens | null;
  setAuthToken: (token: AuthTokens | null) => void;
  captchaToken: string | null;
  setCaptchaToken: (token: string | null) => void;
  activateCaptcha: boolean;
  setActivateCaptcha: (activate: boolean) => void;
  userProfile: any;
  setUserProfile: (profile: any) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  changePasswordToken: string;
  setChangePasswordToken: (token: string) => void;
  disableButton: boolean;
  setDisableButton: (disable: boolean) => void;
  loader: boolean;
  setLoader: (loading: boolean) => void;
  loader2: boolean;
  setLoader2: (loading: boolean) => void;
  copied: boolean;
  setCopied: (copied: boolean) => void;
  overlay: boolean;
  setOverlay: (overlay: boolean) => void;
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  toggleShowSidebar: () => void;
  toggleCloseSidebar: () => void;
  toggleClientSidebar: () => void;
  OnbodyClick: () => void;
  messages: string;
  setMessage: (message: string) => void;
  alertVisible: boolean;
  setAlertVisible: (visible: boolean) => void;
  isSuccess: boolean;
  setIsSuccess: (success: boolean) => void;
  errorMessages: string;
  setErrorMessage: (error: string) => void;
  forgotPasswordSuccess: boolean;
  setForgotPasswordSuccess: (success: boolean) => void;
  usernameValidation: { minLength: boolean; hasUppercase: boolean };
  setUsernameValidation: (validation: { minLength: boolean; hasUppercase: boolean }) => void;
  passwordValidation: { minLength: boolean; hasUppercase: boolean; hasSpecialChar: boolean };
  setPasswordValidation: (validation: { minLength: boolean; hasUppercase: boolean; hasSpecialChar: boolean }) => void;
  formatDate: (dateString: string) => string;
  formateDateTime: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
  roundUp: (value: number) => number;
  formatName: (name: string) => string;
  formatNameAllCaps: (name: string) => string;
  shortName: (name: string) => string;
  formatFirstName: (name: string) => string;
  truncateText: (text: string, wordLimit: number) => string;
  handleCopy: (text: string) => void;
  showAlert: () => void;
  updateDateTime: () => void;
  currentDateTime: string;
  ImageHandler: (event: any) => void;
  handleDownload: (url: string, fileName: string) => void;
  handleUsernameChange: (event: any) => void;
  handlePasswordChange: (event: any) => void;
  userDetails: (profileId: any) => Promise<void>;
  LoginUser: (e: any) => Promise<void>;
  LogoutUser: (e: any) => Promise<void>;
  forgotPassword: (e: any) => Promise<void>;
  ChangePassword: (e: any) => Promise<void>


}

type AuthTokens = {
  access: string;
  refresh: string;
  role: string;
  user_id: string
};

type DecodedUser = {
  token_type: number;
  exp: number;
  iat: number;
  jti: string;
  user_id: string
  profile_id: string
  role: string

  // Add more fields as needed from your JWT
};




const AuthContext = createContext<AuthContextType | undefined>(undefined);
export default AuthContext

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [captchaToken, setCaptchaToken] = useState<any>(null);
  const [activateCaptcha, setActivateCaptcha] = useState(false)
  const [authTokens, setAuthToken] = useState<AuthTokens | null>(() => {
    const tokenString = typeof window !== "undefined" ? localStorage.getItem('authTokens') : null;
    return tokenString ? JSON.parse(tokenString) : null;
  });


  const [user, setUser] = useState<DecodedUser | null>(() => {
    const tokenString = typeof window !== "undefined" ? localStorage.getItem('authTokens') : null;
    try {
      return tokenString ? jwtDecode<DecodedUser>(JSON.parse(tokenString).access) : null;
    } catch {
      return null;
    }
  });

  console.log(authTokens)

  const [userProfile, setUserProfile] = useState<any>(null)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [changePasswordToken, setChangePasswordToken] = useState('')

  const [disableButton, setDisableButton] = useState(false)
  const [loader, setLoader] = useState(false)
  const [loader2, setLoader2] = useState(false)
  const [copied, setCopied] = useState(false)
  const [overlay, setOverlay] = useState(false)

  const [showSidebar, setShowSidebar] = useState(false)

  const [messages, setMessage] = useState<string>('')
  const [alertVisible, setAlertVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true)
  const [errorMessages, setErrorMessage] = useState('')

  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false)

  const [currentDateTime, setCurrentDateTime] = useState<string>("");


  const [usernameValidation, setUsernameValidation] = useState({
    minLength: false,
    hasUppercase: false,
  });

  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasSpecialChar: false,
  });

  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate()
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }


  const formateDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format, making 0 into 12

    return `${day} ${month} ${year} ${formattedHours}:${minutes} ${period}`;
  }


  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const roundUp = (value: number) => {
    return Math.ceil(value);
  }

  const toggleShowSidebar = () => {
    setShowSidebar(true)
  }

  const toggleCloseSidebar = () => {
    setShowSidebar(false)
  }
  const toggleClientSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  const OnbodyClick = () => {
    if (showSidebar) {
      setShowSidebar(false)
    }
  }

  const showAlert = () => {
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 7000);
  };


  const formatName = (name: string) => {
    return name
      .split(" ") // Split the name by spaces
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
      .join(" "); // Join the words back together
  };

  const formatNameAllCaps = (name: string) => {
    return name
      .split(" ") // Split the name by spaces
      .map((word) => word.toUpperCase()) // Capitalize the first letter of each word
      .join(" "); // Join the words back together
  };

  const shortName = (name: string) => {
    return name
      .split(" ") // Split the name by spaces
      .map((word) => word.charAt(0).toUpperCase()) // Take the first letter of each word
      .join(""); // Join the letters together
  };

  const formatFirstName = (name: string) => {
    const firstName = name.split(" ")[0]
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
  }

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true)
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 1000); // Reset after 1 second

      return () => clearTimeout(timer); // Cleanup the timer to avoid memory leaks
    }
  }, [copied]);

  const updateDateTime = () => {
    const now = new Date();

    // Format the date
    const day = now.getDate();
    const month = now.toLocaleString("default", { month: "short" }); // "Dec"
    const year = now.getFullYear();

    // Format the time
    const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = String(now.getMinutes()).padStart(2, "0"); // Add leading zero
    const ampm = now.getHours() >= 12 ? "PM" : "AM";

    // Combine into desired format
    const formattedDateTime = `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;

    setCurrentDateTime(formattedDateTime);
  };

  const ImageHandler = (event: any) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileSizeInKB = file.size / 1024; // Convert bytes to KB
      const fileType = file.type;

      // Validate file size (10KB to 5120KB)
      if (fileSizeInKB < 10 || fileSizeInKB > 5120) {
        setErrorMessage("File size must be between 10KB and 5120KB.");
        return false;
      }

      // Validate file type (jpg/jpeg/png)
      if (!["image/jpeg", "image/png"].includes(fileType)) {
        setErrorMessage("File must be in JPG, JPEG, or PNG format.");
        return false;
      }

      return true
    }
    return false;
  }

  const handleUsernameChange = (e: any) => {
    const value = e.target.value;
    setUsername(value);

    setUsernameValidation({
      minLength: value.length >= 8,
      hasUppercase: /[A-Z]/.test(value),
    });
  };

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);

    setPasswordValidation({
      minLength: value.length >= 8,
      hasUppercase: /[A-Z]/.test(value),
      hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value),
    });
  };


  const isTokenExpired = (token: any) => {
    if (!token) return true;
    const decoded = jwtDecode<DecodedUser>(token); // Decode the token using jwt_decode
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime;
  };

  const handleTokenExpiry = () => {
    localStorage.setItem('tokenActive', JSON.stringify(false))
    localStorage.removeItem('authTokens')
    console.log('Token is either empty or expired. Executing function...');
    // Perform necessary actions, e.g., refreshing the token or logging out the user
  };


  const handleDownload = (url: string, fileName: string) => {
    setLoader(true)
    fetch(url, {
      headers: {
        Authorization: `Bearer ${authTokens?.access}`, // Add your authorization header here
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = fileName || "downloaded-file.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(fileURL);
        setLoader(false)
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
        setLoader(false)
      });
  };

  useEffect(() => {
    if (!authTokens || isTokenExpired(authTokens?.access)) {
      handleTokenExpiry()
    } else {
      localStorage.setItem('tokenActive', JSON.stringify(false))
    }
  }, [authTokens])


  const userDetails = async (profileId: any) => {
    try {
      const response = await fetch(
        `https://school.amanilightequity.com/api/user-profile/${profileId ?? user?.profile_id ?? ''}/`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setUserProfile(data)
        console.log(data)
        setDisableButton(false);
      } else {
        console.error("Failed to fetch user details:", response.statusText);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const roleRoutes: Record<string, string> = {
    admin: '/admin/home',
    hr: '/hr/home',
    student: '/student/home',
    teacher: '/teacher/home',
    bursary: '/bursary/home',
    store_keeper: '/store-keeper/home',
    result_officer: '/result-officer/home',
    academic_officer: '/academic-officer/home',
    other_staff: '/other-staff/home',
  };
  console.log(disableButton)


  const LoginUser = async (e: any) => {
    e.preventDefault();
    setLoader(true)

    setDisableButton(true);
    const sanitizedUsername = validator.escape(username);
    const sanitizedPassword = validator.escape(password);

    try {
      const response = await fetch('https://school.amanilightequity.com/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: sanitizedUsername,
          password: sanitizedPassword,
        })
      })


      if (response.status === 200) {
        const data = await response.json();
        console.log(data);

        const decodedUser = jwtDecode<DecodedUser>(data.access);
        setUser(decodedUser);

        localStorage.setItem("authTokens", JSON.stringify(data));

        setAuthToken(data)
        Cookies.set('token', data.access, { path: '/', secure: true });
        Cookies.set('role', data.role, { path: '/', secure: true });

        const route = roleRoutes[data.role];
        if (route) {
          // await userDetails()
          router.push(route);
          setMessage("Login Sucessfull")
          showAlert()
          setIsSuccess(true)
          setDisableButton(false)
          setLoader(false)
          setUsername('')
          setPassword('')
        } else {
          console.error('Unknown role:', data.role);
          // Maybe navigate to a default page or show an error
        }
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');
        setMessage(errorMessages)
        setDisableButton(false)
        setIsSuccess(false)
        showAlert()
        console.log(errorMessages)
        setLoader(false)
      }


    } catch (error) {
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred. Please check your email and password or contact support');
      setDisableButton(false)
      setIsSuccess(false)
      setLoader(false)

    }

  }

  const forgotPassword = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const sanitizedUsername = validator.escape(username);

    try {
      const response = await fetch('https://school.amanilightequity.com/api/request-to-change-password-form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: sanitizedUsername,
        })
      })

      if (response.status === 200) {
        const data = await response.json()
        console.log(data)
        setMessage("success")
        showAlert()
        setForgotPasswordSuccess(true)
        setIsSuccess(true)
        setDisableButton(false)
        setLoader(false)
        setUsername('')
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');
        setMessage(errorMessages)
        setDisableButton(false)
        setIsSuccess(false)
        setLoader(false)
        showAlert()
      }
    } catch (error) {
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred. Please check your email and password or contact support');
      setDisableButton(false)
      setIsSuccess(false)
      setLoader(false)
    }
  }

  const ChangePassword = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    setDisableButton(true)

    const sanitizedUsername = validator.escape(username);
    const sanitizedPassword = validator.escape(password);
    const sanitizedChangePasswordToken = validator.escape(changePasswordToken)

    try {
      const response = await fetch('https://school.amanilightequity.com/api/change-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_username: sanitizedUsername,
          new_password: sanitizedPassword,
          token: sanitizedChangePasswordToken,
        })
      })

      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        setMessage("New login credential saved Sucessfully")
        showAlert()
        setIsSuccess(true)
        setDisableButton(false)
        setLoader(false)
        setUsername('')
        setPassword('')
      } else {
        const errorData = await response.json()
        const errorMessages = Object.values(errorData)
          .flat()
          .join(', ');
        setMessage(errorMessages)
        setDisableButton(false)
        setIsSuccess(false)
        showAlert()
        console.log(errorMessages)
        setLoader(false)
      }


    } catch (error) {
      console.log(error)
      showAlert()
      setMessage('An unexpected error occurred. Please check your email and password or contact support');
      setDisableButton(false)
      setIsSuccess(false)
      setLoader(false)

    }
  }

  const LogoutUser = async () => {
    setMessage("Logout Successful. Hope to see you again")
    showAlert()
    setIsSuccess(true)
    router.push('/login')
    Cookies.remove('token', { path: '/' });
    Cookies.remove('role', { path: '/' });
    localStorage.removeItem("authTokens")
  }

  const updateToken = async () => {
    if (authTokens) {
      if (!authTokens?.refresh) return;
      const response = await fetch('https://school.amanilightequity.com/api/token/refresh/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: authTokens?.refresh })
      })
      const data = await response.json()

      if (response.status === 200) {
        console.log("token updated")
        setAuthToken(data)
        localStorage.setItem("authTokens", JSON.stringify(data))
        Cookies.set('token', data.access, { path: '/', secure: true });
        Cookies.set('role', data.role, { path: '/', secure: true });
      }
    }

  }

  console.log(authTokens)




  useEffect(() => {
    const mins = 1000 * 60 * 3
    const interval = setInterval(() => {
      if (authTokens) {
        updateToken()
      }
    }, mins)

    return () => clearInterval(interval)
  }, [authTokens])

  useEffect(() => {
    const decoded_exp = user?.exp;
    if (decoded_exp && typeof decoded_exp === 'number' && decoded_exp * 1000 < Date.now()) {
      LogoutUser()
    }
  }, [user])


  const contextData = {
    authTokens,
    setAuthToken,
    captchaToken,
    setCaptchaToken,
    activateCaptcha,
    setActivateCaptcha,
    userProfile,
    setUserProfile,
    username,
    setUsername,
    password,
    setPassword,
    changePasswordToken,
    setChangePasswordToken,
    disableButton,
    setDisableButton,
    loader,
    setLoader,
    loader2,
    setLoader2,
    copied,
    setCopied,
    overlay,
    setOverlay,
    showSidebar,
    setShowSidebar,
    toggleShowSidebar,
    toggleCloseSidebar,
    toggleClientSidebar,
    OnbodyClick,
    messages,
    setMessage,
    alertVisible,
    setAlertVisible,
    isSuccess,
    setIsSuccess,
    errorMessages,
    setErrorMessage,
    forgotPasswordSuccess,
    setForgotPasswordSuccess,
    usernameValidation,
    setUsernameValidation,
    passwordValidation,
    setPasswordValidation,
    formatDate,
    formateDateTime,
    formatCurrency,
    roundUp,
    formatName,
    formatNameAllCaps,
    shortName,
    formatFirstName,
    truncateText,
    handleCopy,
    showAlert,
    updateDateTime,
    currentDateTime,
    ImageHandler,
    handleDownload,
    handlePasswordChange,
    handleUsernameChange,
    userDetails,
    LoginUser,
    LogoutUser,
    forgotPassword,
    ChangePassword,



  }
  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
}
