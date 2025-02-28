"use client";
import { BackIcon, EyeClose, EyeOpen, MiniloadIcon } from "@/icons/icon";
import CustomLink from "./CustomLink";
import { useRef, useState } from "react";
import OTPhandle from "./OTPhandle";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { SetUser } from "@/lib/store/features/AuthSlice";
import WarningModal from "./WarningModal";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false); // Track password visibility
  const [isCfmPassVisible, setIsCfmPassVisible] = useState(false); // Track confirm password visibility
  const [colormatch, setcolormatch] = useState(true);
  const [isSending, setisSending] = useState(false);
  const [isWarnOpen, setisWarnOpen] = useState(false);

  const dispatch = useAppDispatch();
  const passRef = useRef(null);
  const cfmPassRef = useRef(null);

  const propemailRef = useRef({
    email: null,
    password: null,
    usertype: null,
    name: null,
  });
  const messageref = useRef(null);

  async function SendOTP(email) {
    try {
      const response = await fetch("/api/register/sentotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, isforget: false }),
      });
      if (!response.ok) {
        console.error("Server error:", response.status);
        return response.status;
      }
      const result = await response.json();
      console.log(result);
      return result.status;
    } catch (error) {
      console.error("Fetch error:", error);
      return result.status;
    } finally {
      setisSending(false);
    }
  }

  const Submit = async (e) => {
    e.preventDefault();
    if (passRef.current.value === cfmPassRef.current.value && !isSending) {
      setisSending(true);
      const formData = new FormData(e.target);
      /* const data = Object.fromEntries(formData); */

      const status = await SendOTP(formData.get("email"));
      /*  console.log(status); */
      if (status === 201) {
        setIsOtpOpen(true);
        propemailRef.current.email = formData.get("email");
        propemailRef.current.name = formData.get("name");
        propemailRef.current.password = formData.get("confirmpassword");
        propemailRef.current.enrollmentno = formData.get("rollno");
      } else if (status == 409) {
        messageref.current = "User already exist Login instead!";
        setisWarnOpen(true);
      } else if (status == 504) {
        messageref.current = "Server time Out please try Again !";
        setisWarnOpen(true);
      }
      else if (status == 620) {
        messageref.current = "Request limit exceeded please try again after 24 hour sorry for inconvenience!";
        setisWarnOpen(true);
      }
      else {
        messageref.current = "Something Went Wrong try again!";
        setisWarnOpen(true);
      }
    }
  };

  return (
    <section className="bg-transparent cookie">
      <CustomLink
        href={"/"}
        className="absolute left-3 top-3 text-text flex items-center text-base hover:cursor-pointer"
      >
        <BackIcon size={30} /> Back to Home
      </CustomLink>


      <div className="flex flex-col items-center justify-center px-3 sm:px-6 mx-auto min-h-[calc(100dvh-4.6rem)] animate-dropped">
        <CustomLink
          href="/"
          className="flex items-center text-2xl font-semibold text-text"
        >
          {/*           <Image className="w-16 h-auto" loading="lazy" src={logo} alt="logo" />
           */}{" "}
        </CustomLink>
        <div className="w-full bg-background rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              className="text-2xl text-green-800 font-bold leading-tight tracking-tight text-text md:text-2xl"
              onClick={() => {
                dispatch(SetUser("sabeena kjhatun"));
                }}
              >
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={Submit}>
                <div>
                
                </div>

                <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-base font-medium text-text"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-transparent font-sans text-sm border-2 border-[#717071bf] placeholder-gray-400 outline-none text-text rounded-full  block w-full p-2.5"
                  placeholder="John Doe"
                  pattern="^[A-Za-z\s]+$"
                  title="Name should not contain numbers."
                  onChange={(e) => {
                    if (e.target.value.toLowerCase().includes("rahman")) {
                      messageref.current = "Papa ki itni yaad  Aa rhi h ki fake account banana chahte ho galat baat 😏.";
                      setisWarnOpen(true);
                      e.target.value = "";
                    }
                  }}
                  required
                />
                </div>

                <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-base font-medium text-text"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-transparent font-sans text-sm border-2 border-[#717071bf] placeholder-gray-400 outline-none rounded-full block w-full p-2.5"
                  placeholder="example@domain.com"
                  required
                />
                </div>
                <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-base font-medium text-text"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="bg-transparent font-sans text-sm border-2 border-[#717071bf] placeholder-gray-400 outline-none rounded-full block w-full p-2.5"
                  placeholder="example@domain.com"
                  required
                />
                </div>
                <div>
                <label
                  htmlFor="altphone"
                  className="block mb-2 text-base font-medium text-text"
                >
                  Alternative Phone
                </label>
                <input
                  type="tel"
                  name="altphone"
                  id="altphone"
                  className="bg-transparent font-sans text-sm border-2 border-[#717071bf] placeholder-gray-400 outline-none rounded-full block w-full p-2.5"
                  placeholder="example@domain.com"
                  required
                />
                </div>
                <div className="relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-base font-medium text-text"
                >
                  Password
                </label>
                <input
                  ref={passRef}
                  type={!isPassVisible ? "password" : "text"}
                  autoComplete="off"
                  name="password"
                  id="password"
                  title="Password should be at least 8 characters and contain one special character."
                  pattern="(?=.*[\W_]).{8,}"
                  placeholder="••••••••"
                  className="bg-transparent font-sans text-sm border-2 border-[#717071bf] placeholder-gray-400 outline-none text-text rounded-full focus:border-primary block w-full p-2.5"
                  required
                />
                <span
                  className="absolute bottom-2.5 right-2 cursor-pointer"
                  onClick={() => setIsPassVisible(!isPassVisible)}
                >
                  {isPassVisible ? <EyeOpen className='text-[#928b92]' /> : <EyeClose className='text-[#928b92]' />}
                </span>
                </div>

                <div className="relative">
                <label
                  htmlFor="confirmpassword"
                  className="block mb-2 text-base font-medium text-text"
                >
                  Confirm password
                </label>
                <input
                  ref={cfmPassRef}
                  type={!isCfmPassVisible ? "password" : "text"}
                  autoComplete="off"
                  name="confirmpassword"
                  id="confirmpassword"
                  pattern="(?=.*[\W_]).{8,}"
                  title="Password should be at least 8 characters and contain one special character."
                  placeholder="••••••••"
                  onChange={(e) => {
                    passRef.current.value === e.target.value
                      ? setcolormatch(true)
                      : setcolormatch(false);
                  }}
                  onFocus={(e) => {
                    passRef.current.value === e.target.value
                      ? setcolormatch(true)
                      : setcolormatch(false);
                  }}
                  className={`bg-transparent border-2 ${
                    colormatch ? "border-[#717071bf] " : "border-red-500"
                  }   ${
                    colormatch
                      ? "focus:border-green-500"
                      : "focus:border-red-500"
                  } placeholder-gray-400 outline-none font-sans text-sm rounded-full block w-full p-2.5`}
                  required
                />
                <span
                  className="absolute bottom-2.5 right-2 cursor-pointer"
                  onClick={() => setIsCfmPassVisible(!isCfmPassVisible)}
                >
                  {isCfmPassVisible ? <EyeOpen className='text-[#928b92]' /> : <EyeClose className='text-[#928b92]' />}
                </span>
              </div>

              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border-[#717071bf] rounded focus:ring-3 focus:ring-primary"
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 text-base font-light text-gray-50"
                >
                  I accept the{" "}
                  <Link
                    href="https://drive.google.com/file/d/1_try-L11JBRFVy45VIRxALG18lPfWzr1/view?usp=sharing"
                    target="_blank"
                    className="font-medium text-primary hover:underline text-green-800"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="https://drive.google.com/file/d/1BIh_Y0yrHZbCHlkZYpoxrFcNc1sbhVKg/view?usp=sharing"
                    target="_blank"
                    className="font-medium text-primary hover:underline text-green-800"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`w-full text-text ${
                  !isSending
                    ? "bg-[#ff006aa7] focus:outline-none focus:ring-primary text-white"
                    : "bg-[#f71b772f]"
                } font-medium rounded-full text-lg px-5 py-[0.5rem] flex items-center justify-center gap-2`}
              >
                {isSending && (
                  <MiniloadIcon className="w-5 h-5 text-green-800 animate-spin" />
                )}
                {!isSending ? "Create An Account" : `Please Wait`}
              </button>
              <div className="text-lg font-light text-gray-50">
                Already have an account?{" "}
                <CustomLink
                  href="/login"
                  className="font-medium text-primary hover:underline text-green-800"
                >
                  Login here
                </CustomLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      {!isOtpOpen && (
        <OTPhandle
          setIsOtpOpen={setIsOtpOpen}
          propemailRef={propemailRef.current}
          isforget={false}
        />
      )}
      {isWarnOpen && (
        <WarningModal
          messege={messageref.current}
          /* messege={"User already exist Login instead!"} */
          setisWarnOpen={setisWarnOpen}
        />
      )}
    </section>
  );
}
