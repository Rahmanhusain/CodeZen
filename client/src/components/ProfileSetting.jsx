"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  EditIcon,
  EyeClose,
  EyeOpen,
  BackIcon,
  MiniloadIcon,
  PowerIcon,
} from "@/icons/icon";
import Image from "next/image";
import DPSelectorsModal from "./DPSelectorsModal";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { SetUser } from "@/lib/store/features/AuthSlice";
import { SetUserData } from "@/lib/store/features/UserSlice";
import { ResetUserData } from "@/lib/store/features/UserSlice";
import WarningModal from "./WarningModal";
import Loading from "./Loading";
import Link from "next/link";
import Loader from "./Loader";

export default function ProfileSetting() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPasswordSign, setShowPasswordSign] = useState(false);
  const [dpmodopen, setDpmodOpen] = useState(false);
  const [canSave, setCansave] = useState(false);
  const [isWarnOpen, setisWarnOpen] = useState(false);
  const messageref = useRef(null);
  const [isSaving, setisSaving] = useState(false);
  const [charcount, setCharcount] = useState(0);
  const [profilephotosrc, setprofilephotosrc] = useState(
    "https://iffadcitwirnptuabcbr.supabase.co/storage/v1/object/public/findyourdateuserimages//avatar.png"
  );
  const user = useAppSelector((state) => state.Authenticator);
  const userdata = useAppSelector((state) => state.UserData);
  const [imagefile, setimagefile] = useState(null);

 /*  useEffect(() => {
    const verifyToken = async () => {
      const res = await fetch("/api/verifytoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();

      if (result.status === 201) {
        dispatch(
          SetUser({
            email: result.data.email,
            name: result.data.Profilename,
            profilephotosrc: result.data.profilephotosrc,
          })
        );
        dispatch(SetUserData(result.data));
        setprofilephotosrc(result.data.profilephotosrc);
        setShow(true);
      } else {
        router.push("/login");
      }
    };
    if (user.email === null) {
      verifyToken();
    } else {
      setprofilephotosrc(user.profilephotosrc);
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (userdata) {
      const initialProfile = () => {
        return {
          Profilename: userdata.Profilename,
          Email: userdata.email,
          Address: userdata.address,
          PhoneNumber: userdata.phoneNumber,
          AlternatePhoneNumber: userdata.alternatePhoneNumber,
        };
      };
      setProfile(initialProfile());
      setEditingProfile(initialProfile());
    }
  }, [userdata]); */

  const updateProfile = async () => {
    const res = await fetch("/api/updateprofile", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      email: user.email,
      data: editingProfile,
      password: userdata.password,
      userid: userdata.userid,
      profilephotosrc: profilephotosrc,
      }),
    });

    const result = await res.json();
    if (result.status === 201) {
      setisSaving(false);
      setCansave(false);
      dispatch(
        SetUser({
          email: result.data.email,
          name: result.data.Profilename,
          profilephotosrc: result.data.profilephotosrc,
        })
      );
      dispatch(SetUserData(result.data));
    } else {
      messageref.current = "Something went wrong Please try again!";
      setisSaving(false);
      setisWarnOpen(true);
    }
  };

  const togglePasswordVisibilitySign = () => {
    setShowPasswordSign(!showPasswordSign);
  };

  const [profile, setProfile] = useState({
    Profilename: "",
    Email: "",
    Address: "",
    PhoneNumber: "",
    AlternatePhoneNumber: "",
  });

  const [editingProfile, setEditingProfile] = useState({
    Profilename: "",
    Email: "",
    Address: "",
    PhoneNumber: "",
    AlternatePhoneNumber: "",
  });

  const [isEditing, setIsEditing] = useState({
    Address: false,
  });

  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSave = (field) => {
    setProfile({ ...profile, [field]: editingProfile[field] });
    setIsEditing({ ...isEditing, [field]: false });
    setCansave(true);
  };

  const handleCancel = (field) => {
    setEditingProfile({ ...editingProfile, [field]: profile[field] });
    setIsEditing({ ...isEditing, [field]: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProfile({ ...editingProfile, [name]: value });
  };

 /*  if (!show) {
    return <Loader />; // Optionally return null to prevent flickering during verification
  } */

  return (
    <>
      <div className="w-[47rem] mx-3 my-5 p-5 border border-[#3737382f] rounded-lg mt-36">

        <h1 className="text-2xl mb-8 font-bold font-serif ">Your Profile</h1>

        <div className="flex flex-col items-center gap-6 mb-8">
          <div
            className="relative flex flex-col items-center gap-3 cursor-pointer"
            onClick={() => {
              setDpmodOpen(true);
            }}
          >
            <Image
              src={profilephotosrc}
              width={70}
              height={70}
              className="rounded-2xl w-52 h-52 object-cover brightness-75"
              unoptimized
              alt="profile"
            />
            <p className="text-text flex gap-1 items-center text-xs">
              <EditIcon
                className="text-text bottom-0 right-0"
                width="10"
                height="10"
              />
              Edit Photo
            </p>
          </div>
          <div className="w-full">
            <h3 className="text-xl break-words courgette text-center w-full">
              {profile.Profilename}
            </h3>
            <p className="text-gray-500 break-words courgette text-center w-full">
              {profile.Email}
            </p>
          </div>
        </div>

        {/* inputs start for editing */}
        <div className="mb-2">
          <label className="block mb-1 text-xl capitalize">Name</label>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 pl-2">{profile.Profilename}</span>
          </div>
        </div>

        <div className="mb-2">
          <label className="block mb-1 text-xl capitalize">Email</label>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 pl-2">{profile.Email}</span>
          </div>
        </div>

        <div className="mb-2">
          <label className="block mb-1 text-xl capitalize">Address</label>
          {isEditing["Address"] ? (
            <div className="flex mb-4 flex-col gap-2 md:flex-row">
              <input
                type="text"
                name="Address"
                value={editingProfile["Address"] || ""}
                onChange={handleChange}
                className="flex-1 p-2 w-full courgette bg-transparent text-sm border-2 border-[#717071bf] placeholder-gray-400 outline-none rounded-xl mr-2"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave("Address")}
                  className="bg-[#22ff00a7] rounded-lg px-4 py-2"
                >
                  Okay
                </button>
                <button
                  onClick={() => handleCancel("Address")}
                  className="border border-[#22ff00a7] rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400 pl-2">{profile.Address}</span>
              <button
                onClick={() => handleEdit("Address")}
                className="border border-[#22ff00a7] rounded px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <div className="mb-2">
          <label className="block mb-1 text-xl capitalize">Phone Number</label>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 pl-2">{profile.PhoneNumber}</span>
          </div>
        </div>

        <div className="mb-2">
          <label className="block mb-1 text-xl capitalize">Alternate Phone Number</label>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 pl-2">{profile.AlternatePhoneNumber}</span>
          </div>
        </div>

        {/* inputs end for editing */}

        <div className="flex justify-between mt-7">
          <button
            className="flex items-center px-5 gap-1 py-2 text-black border border-[#22ff00a7] rounded-lg"
            onClick={async () => {
              await fetch("/api/logout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              dispatch(
                SetUser({
                  email: null,
                  name: null,
                  usertype: null,
                  profilephotosrc: null,
                })
              );
              dispatch(ResetUserData());
              router.push("/");
            }}
          >
            <PowerIcon />
            Logout
          </button>

          <div className="flex gap-2">
            <button
              disabled={!canSave}
              className={`flex items-center px-5 gap-1 py-2 ${
                canSave
                  ? "bg-[#22ff00a7] hover:bg-[#22ff00c6] cursor-pointer"
                  : "bg-[#22ff0054] cursor-not-allowed"
              } rounded-lg`}
              onClick={async () => {
                setisSaving(true);
                await updateProfile();
              }}
            >
              {isSaving ? (
                <MiniloadIcon className="w-4 h-4 text-primary animate-spin" />
              ) : (
                "Save"
              )}
            </button>
            {canSave && (
              <button
                className={`flex items-center px-5 gap-1 py-2 border border-[#22ff00a7] rounded-lg`}
                onClick={() => {
                  setProfile(() => {
                    return {
                      Profilename: userdata.Profilename,
                      Email: userdata.email,
                      Address: userdata.address,
                      PhoneNumber: userdata.phoneNumber,
                      AlternatePhoneNumber: userdata.alternatePhoneNumber,
                    };
                  });
                  setCansave(false);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
      {dpmodopen && (
        <DPSelectorsModal
          setDpmodOpen={setDpmodOpen}
          setprofilephoto={setprofilephotosrc}
          setCansave={setCansave}
          setimagefile={setimagefile}
        />
      )}
      {isWarnOpen && (
        <WarningModal
          messege={messageref.current}
          setisWarnOpen={setisWarnOpen}
        />
      )}
    </>
  );
}
