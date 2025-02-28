"use client"
import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import the Gemini API client

function SchedulePickUp() {
    const [capturedImage, setCapturedImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [itemCategory, setItemCategory] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const webcamRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cameraFacingMode, setCameraFacingMode] = useState('environment');
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const genAI = new GoogleGenerativeAI('AIzaSyAqscMBZ1AfjD-btAPZcHBv-yHgZp2Cwwo'); // Initialize the Gemini API client
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const getMinDate = () => {
        const today = new Date();
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + 2);
        return minDate.toISOString().split('T')[0];
    };

    const identifyRecyclingCategory = async (imageData) => {
        setIsLoading(true);
        try {
            const response = await model.generateContent({
                contents: [
                    {
                        parts: [
                            {
                                text: "Identify the waste type in the image. Respond with only one word from this list: 'Plastic', 'Paper', 'Glass', 'Metal', 'E-Waste', or 'Cardboard'. Do not provide any explanation."
                            },
                            {
                                inlineData: {
                                    mimeType: "image/jpeg",
                                    data: imageData.split(",")[1] // Extract base64 data
                                }
                            }
                        ]
                    }
                ]
            });

            const responseText = await response.response.text(); // Correct way to extract response
            setItemCategory(responseText.trim()); // Set extracted text as category
        } catch (error) {
            console.error("Error identifying item:", error);
            setItemCategory(""); // Allow user to select manually if there's an error
        } finally {
            setIsLoading(false);
        }
    };

    const captureImage = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
        identifyRecyclingCategory(imageSrc);
    }, [webcamRef]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target.result);
                identifyRecyclingCategory(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            alert(`Pickup scheduled successfully!\nDate: ${pickupDate}\nTime: ${pickupTime}\nItem Category: ${itemCategory}`);
            setIsSubmitting(false);
            setCapturedImage(null);
            setUploadedImage(null);
            setItemCategory('');
            setPickupDate('');
            setPickupTime('');
        }, 1500);
    };

    const toggleCamera = () => {
        setCameraFacingMode((prevMode) => (prevMode === 'environment' ? 'user' : 'environment'));
    };

    const videoConstraints = {
        facingMode: cameraFacingMode,
        width: 1280,
        height: 720,
    };

    return (
        <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-green-50 to-teal-100 pt-40">
            <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-teal-600 py-4 px-6">
                    <h1 className="text-white text-2xl font-bold">Schedule Recycling Pickup</h1>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Identify Your Recyclable Item</h2>

                            <div className="mb-6 relative">
                                {capturedImage ? (
                                    <div className="w-full h-full relative">
                                        <img
                                            src={capturedImage}
                                            alt="Captured item"
                                            className="w-full h-full object-contain"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCapturedImage(null);
                                                setItemCategory('');
                                            }}
                                            className="absolute bottom-4 right-4 bg-gray-700 text-white py-1 px-3 rounded-md text-sm"
                                        >
                                            Retake
                                        </button>
                                    </div>
                                ) : uploadedImage ? (
                                    <div className="w-full h-full relative">
                                        <img
                                            src={uploadedImage}
                                            alt="Uploaded item"
                                            className="w-full h-full object-contain"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setUploadedImage(null);
                                                setItemCategory('');
                                            }}
                                            className="absolute bottom-4 right-4 bg-gray-700 text-white py-1 px-3 rounded-md text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-64 md:h-80 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                                        <Webcam
                                            audio={false}
                                            ref={webcamRef}
                                            screenshotFormat="image/jpeg"
                                            videoConstraints={videoConstraints}
                                            mirrored={cameraFacingMode === 'user'}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                                            <button
                                                type="button"
                                                onClick={toggleCamera}
                                                className="bg-white bg-opacity-70 text-black font-semibold py-2 px-4 rounded-full hover:bg-opacity-90 transition"
                                            >
                                                Flip Camera
                                            </button>
                                            <button
                                                type="button"
                                                onClick={captureImage}
                                                className="bg-teal-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-teal-600 transition"
                                            >
                                                Capture
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

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

                            {/* Item Category Dropdown */}
                            <div className="mb-6">
                                <label htmlFor="item-category" className="block text-sm font-medium text-black mb-2">
                                    Item Category
                                </label>
                                <select
                                    id="item-category"
                                    value={itemCategory}
                                    onChange={(e) => setItemCategory(e.target.value)}
                                    className="mt-1 block w-full rounded-md text-gray-600 border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 py-2 px-3 border"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="Plastic">Plastic</option>
                                    <option value="Paper">Paper</option>
                                    <option value="Glass">Glass</option>
                                    <option value="Metal">Metal</option>
                                    <option value="E-Waste">E-Waste</option>
                                    <option value="Cardboard">Cardboard</option>
                                </select>
                            </div>

                            {isLoading && (
                                <div className="text-center text-gray-600">
                                    Loading...
                                </div>
                            )}
                        </div>

                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">Schedule Your Pickup</h2>

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

                            <div className="mb-6">
                                <label htmlFor="pickup-time" className="block text-sm text-black font-medium mb-2">
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

export default SchedulePickUp;
