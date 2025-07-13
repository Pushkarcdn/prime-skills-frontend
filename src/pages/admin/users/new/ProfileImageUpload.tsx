/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadProps } from "antd";
import { fileSizes } from "../../../../config";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < fileSizes?.profileImage;
  if (!isLt2M) {
    message.error(`Image must smaller than ${fileSizes?.profileImage}MB!`);
  }
  return isJpgOrPng && isLt2M;
};

const ProfileImageUpload = ({ profileImage, onImageChange }: any) => {
  const [imageLoading, setImageLoading] = useState(false);

  const handleImageChange: UploadProps["onChange"] = (info) => {
    if (info?.file?.originFileObj) {
      onImageChange(info.file.originFileObj);
    }
  };

  const uploadButton = (
    <div
      title="Upload"
      style={{ border: 0, background: "none" }}
      className="flex items-center gap-2"
    >
      {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>Upload</div>
    </div>
  );

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-3">Profile Image</h3>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={(file) => {
          const isValid = beforeUpload(file);
          if (isValid) {
            setImageLoading(true);
            // Handle the file directly without making a request
            onImageChange(file);
            setImageLoading(false);
          }
          // Return false to prevent default upload behavior
          return false;
        }}
        onChange={handleImageChange}
        // Remove the action prop to prevent automatic upload
      >
        {profileImage ? (
          <img
            src={URL.createObjectURL(profileImage)}
            alt="avatar"
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  );
};

export default ProfileImageUpload;
