import React, { useState, useRef, Suspense, lazy } from "react";
/* import Cropper from "react-cropper"; */
import "cropperjs/dist/cropper.css";
import { space_mono } from "@/lib/fonts";
import { NoImageIcon } from "@/icons/icon";
import Link from "next/link";
const Cropper = lazy(() => import("react-cropper"));

const Crop = ({ setprofilephoto,setDpmodOpen,setCansave,setimagefile}) => {
  const [URL, setURL] = useState("#");
  const [btndisable, setbtndisable] = useState(true);
  const cropperRef = useRef(null);

  const handleInputChange = (e) => {
    if (cropperRef.current && e.target.value !== URL) {
      e.preventDefault();
  
      let files;
      if (e.dataTransfer) {
        files = e.dataTransfer.files;
      } else if (e.target) {
        files = e.target.files;
      }
  
      if (files && files.length > 0) {
        const file = files[0];
  
      
  
        if (file instanceof Blob) {
          const reader = new FileReader();
  
          reader.onload = () => {
            setURL(reader.result);
            setbtndisable(false);
          };
  
          reader.readAsDataURL(file);
        }
      }
    }
  };
  



  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedImage = cropperRef.current?.cropper.getCroppedCanvas();

      if (croppedImage) {
        croppedImage.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
  
            // Save the file to state or send to the server
            setimagefile(file); // Save the file in state
            setprofilephoto(croppedImage.toDataURL("image/jpeg", 0.65));
            setCansave(true);
            setDpmodOpen(false);
  
            console.log("Cropped JPEG file:", file);
          }
        }, "image/jpeg", 0.65);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 px-2">
      <div className="flex flex-col justify-center items-center py-2 gap-4 px-4 w-full">
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-[18.75rem] max-w-full h-fit border-2 border-gray-600 border-dashed rounded-lg cursor-pointer  transition-colors duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center justify-center pt-4 pb-4">
              <svg
                className="w-6 h-6 mb-2 text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-1 text-lg text-black">
                <span className="">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-sm text-black">
                PNG,.webp,jpeg or JPG
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              multiple={false}
              onChange={handleInputChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <Suspense
        fallback={
          <div className="flex flex-row gap-2 justify-center items-center py-4">
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        }
      >
        {/* <Croppper /> */}
        <Cropper
          ref={cropperRef}
          style={{
            width: 300,
            height: 300,
            maxWidth: 300,
            borderRadius: "10px",
          }}
          initialAspectRatio={1}
          aspectRatio={1}
          preview=".img-preview"
          src={URL}
          toggleDragModeOnDblclick={true}
          modal={true}
          viewMode={2}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={0.6}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
          checkCrossOrigin={false}
          /* crop={getCropData} */
        />
        {URL === "#" && (
          <div className="absolute h-fit w-full flex flex-col gap-2 items-center justify-center">
            <NoImageIcon className=" h-24 w-24" color="red" />
            <p className="text-xs">[ No Image Selected ]</p>
          </div>
        )}
      </Suspense>
      <div className="block">
      <p className={`${space_mono.className} text-sm my-2 text-center`}>
          •Preview•
        </p>
        <div className="img-preview overflow-hidden h-52 rounded-lg aspect-[39/49] " />
      </div>
      <div className="flex justify-center gap-2">
        <button
          disabled={btndisable}
          className={`h-9 w-20 text-white rounded-3xl ${btndisable ? 'bg-[#1100ff47] cursor-not-allowed' : 'bg-[#1100ff]'}`}
          onClick={getCropData}
        >
          {btndisable ? '✖' : 'Ok'}
        </button>
      </div>
    </div>
  );
};

export default React.memo(Crop);
