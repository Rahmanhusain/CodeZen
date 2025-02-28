"use client"
import React, { useState, useRef } from 'react';

function SchedulePickUp() {
    const [capturedImage, setCapturedImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [itemCategory, setItemCategory] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraActive, setCameraActive] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    // Get minimum date (2 days from today)
    const getMinDate = () => {
      const today = new Date();
      const minDate = new Date(today);
      minDate.setDate(today.getDate() + 2);
      return minDate.toISOString().split('T')[0];
    };
  
    // Mock function to identify recycling category
    const identifyRecyclingCategory = (imageData) => {
      // This would be replaced with actual ML/API call
      const categories = ['Plastic', 'Paper', 'Glass', 'Metal', 'E-Waste', 'Cardboard'];
      const randomIndex = Math.floor(Math.random() * categories.length);
      return categories[randomIndex];
    };
  
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Could not access camera. Please check permissions and try again.");
      }
    };
  
    const captureImage = () => {
      if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
        
        // Stop camera stream
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        setCameraActive(false);
        
        // Identify recycling category
        const category = identifyRecyclingCategory(imageData);
        setItemCategory(category);
      }
    };
  
    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setUploadedImage(event.target.result);
          const category = identifyRecyclingCategory(event.target.result);
          setItemCategory(category);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        alert(`Pickup scheduled successfully!\nDate: ${pickupDate}\nTime: ${pickupTime}\nItem Category: ${itemCategory}`);
        setIsSubmitting(false);
        // Reset form
        setCapturedImage(null);
        setUploadedImage(null);
        setItemCategory('');
        setPickupDate('');
        setPickupTime('');
      }, 1500);
    };
  
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-teal-600 py-4 px-6">
            <h1 className="text-white text-2xl font-bold">Schedule Recycling Pickup</h1>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {/* Item Identification Section */}
              <div className="mb-8">
                
                {/* Camera Section */}
                <div className="mb-6 relative">
                  {cameraActive ? (
                    <div className="relative">
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        className="w-full h-64 object-cover rounded-lg bg-gray-100"
                      />
                      <button
                        type="button"
                        onClick={captureImage}
                        className="mt-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md transition"
                      >
                        Capture Image
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                      {capturedImage ? (
                        <div className="w-full h-full">
                          <img 
                            src={capturedImage} 
                            alt="Captured item" 
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                      ) : uploadedImage ? (
                        <div className="w-full h-full">
                          <img 
                            src={uploadedImage} 
                            alt="Uploaded item" 
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="text-center p-6">
                          <p className="text-gray-500 mb-4">Take a photo or upload an image of your recyclable item</p>
                          <button
                            type="button"
                            onClick={startCamera}
                            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-md transition mb-3 w-full"
                          >
                            Open Camera
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  <canvas ref={canvasRef} className="hidden" />
                </div>
                
                {/* Upload Button */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-black mb-2">
                    Or upload an image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
                </div>
                
                {/* Item Category Display */}
                {itemCategory && (
                  <div className="bg-green-50 p-4 rounded-lg mb-6">
                    <p className="text-black font-medium">Identified Item Category:</p>
                    <p className="text-lg font-bold text-teal-700">{itemCategory}</p>
                  </div>
                )}
              </div>
              
              {/* Pickup Schedule Section */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Schedule Your Pickup</h2>
                
                {/* Date Picker */}
                <div className="mb-6">
                  <label htmlFor="pickup-date" className="block text-sm font-medium text-black mb-2">
                    Pickup Date (minimum 2 days from today)
                  </label>
                  <input
                    type="date"
                    id="pickup-date"
                    min={getMinDate()}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="mt-1 block w-full text-gray-600 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 py-2 px-3 border"
                    required
                  />
                </div>
                
                {/* Time Picker */}
                <div className="mb-6">
                  <label htmlFor="pickup-time" className="block text-sm text-black font-medium">
                    Preferred Pickup Time
                  </label>
                  <select
                    id="pickup-time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="mt-1 block w-full rounded-md text-gray-600 border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 py-2 px-3 border"
                    required
                  >
                    <option value="">Select a time slot</option>
                    <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                    <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                    <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                  </select>
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={!pickupDate || !pickupTime || !itemCategory || isSubmitting}
                className={`w-full py-3 px-4 rounded-md font-bold text-white ${
                  !pickupDate || !pickupTime || !itemCategory || isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-teal-600 hover:bg-teal-700'
                } transition duration-200 flex justify-center items-center`}
              >
                {isSubmitting ? (
                  <span>Scheduling...</span>
                ) : (
                  <span>Schedule Pickup</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default SchedulePickUp