"use client";
import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Input, Textarea } from "@nextui-org/react";
import Swal from "sweetalert2";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";

const UploadRoom = () => {
  const [formData, setFormData] = useState({
    title: "",
    rent: "",
    facilities: "",
    details: "",
    picture: null,
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.picture) {
      Swal.fire({
        title: "Please upload a picture.",
        icon: "error",
        background: "#333",
        color: "#fff",
      });
      return;
    }
  
    try {
      setIsUploading(true);
  
      const imageData = new FormData();
      imageData.append("image", formData.picture);
  
      const imgbbAPIKey = process.env.NEXT_PUBLIC_IMAGEBB_API; // Replace with your actual ImgBB API key
      const imgbbResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, imageData);
      
      console.log(imgbbResponse); // Check the image upload response
  
      if (imgbbResponse.data.success) {
        const imageUrl = imgbbResponse.data.data.url;
  
        // Parse rent as float before sending to the server
        const parsedRent = parseFloat(formData.rent);
  
        const dataForBackend = {
            title: formData.title,
            rent: parsedRent, 
            facilities: formData.facilities.split(","), 
            details: formData.details,
            picture: imageUrl,
          }
          console.log("data for backend", dataForBackend);
          
        const response = await axiosInstance.post("/rooms/create-room", dataForBackend);
  
        if (response.data.success) {
          Swal.fire({
            title: "Room Uploaded Successfully!",
            icon: "success",
            background: "#333",
            color: "#fff",
          });
  
          setFormData({
            title: "",
            rent: "",
            facilities: "",
            details: "",
            picture: null,
          });
        }
      } else {
        throw new Error("Failed to upload image to ImgBB.");
      }
    } catch (error) {
      console.error("Failed to upload room:", error);
      Swal.fire({
        title: "Failed to Upload Room",
        text: error.message,
        icon: "error",
        background: "#333",
        color: "#fff",
      });
    } finally {
      setIsUploading(false);
    }
  };
  

  return (
    <Card className="w-full mt-2">
      <CardHeader className="flex justify-start px-6 py-5">
        <h2 className="my-4 text-xl font-semibold">Upload New Room Here</h2>
      </CardHeader>

      <CardBody className="px-6 py-5 flex flex-col justify-center">
        <form className="mb-4 space-y-7" onSubmit={handleSubmit}>
          
          <div className="flex gap-6">
          <Input className=""
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input className=""
            label="Rent in $"
            name="rent"
            type="number"
            value={formData.rent}
            onChange={handleChange}
            required
          />
          
          </div>
          
          <Input className=""
            label="Facilities (comma separated)"
            name="facilities"
            type="text"
            value={formData.facilities}
            onChange={handleChange}
            required
          />
          <Textarea
            label="Details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
          />
          <Input className=""
            name="picture"
            type="file"
            onChange={handleFileChange}
            required
          />
          
          <div className="flex justify-center">
            <Button className="text-green-500 w-4/5" type="submit" isDisabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default UploadRoom;
