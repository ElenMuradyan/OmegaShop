import { PlusOutlined } from "@ant-design/icons";
import { notification, Upload } from "antd";
import { supabase } from "../../../services/supabase/supabase";
import { RcFile, UploadProps } from "antd/es/upload";
import { ImageUploadProps } from "../../../typescript/interfaces/ImageUploadProps";
import React from "react";

const ImageUpload: React.FC<ImageUploadProps> = ({onFinish}) => {
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      );

      const handleImageUpload: UploadProps["customRequest"] = async ({ file, onSuccess, onError }) => {
        try {
            const imageFile = file as RcFile;
            const fileExt = imageFile.name.split(".").pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `products/${fileName}`;
      
            const { error, data } = await supabase.storage.from("product-images").upload(filePath, imageFile);
      
            if (error) {
              console.error("Upload error:", error);
              notification.error({
                message: "Չհաջողվեց ներբեռնել։",
                description: error.message
              });
              onError?.(error);
            } else {
                notification.success({
                    message: "Հաջողությամբ ներբեռնվեց։",
                  })
                  const { data: publicUrlData} = supabase.storage
                  .from("product-images")
                  .getPublicUrl(filePath);

                  const imageUrl = publicUrlData.publicUrl
                  onFinish(imageUrl);
                onSuccess?.(data);
            }
          } catch (error: any) {
            notification.error({
                message: "Ինչ-որ բան սխալ գնաց։։",
                description: error.message
              })
          }
       };
    
  return (
    <div>
            <Upload
                listType="picture-card"
                customRequest={handleImageUpload}
                showUploadList={true}
                multiple
            >
                {uploadButton}
            </Upload>
    </div>
  )
}

export default ImageUpload;