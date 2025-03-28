import { PlusOutlined } from "@ant-design/icons";
import { notification, Upload } from "antd";
import { supabase } from "../../../services/supabase/supabase";
import { RcFile, UploadProps } from "antd/es/upload";
import React from "react";

export interface ImageUploadProps {
  onFinish: (url: string) => void;
  handleDelete?: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({onFinish, handleDelete}) => {
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>ՆԵՐԲԵՌՆԵԼ</div>
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

       const handleRemove = async (file: any) => {
        try {
          const filePath = file.response.path;
          if (!filePath) {
            notification.error({
              message: "Չհաջողվեց հեռացնել։",
              description: "Նկարի հղումը սխալ է։",
            });
            return false;
          }
      
          const { error } = await supabase.storage.from("product-images").remove([filePath]);
      
          if (error) throw error;
      
          notification.success({
            message: "Հաջողությամբ հեռացվեց։",
          });

          const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

          if (handleDelete) {
            handleDelete(data.publicUrl);
          }
      
          return true;
        } catch (error: any) {
          notification.error({
            message: "Ինչ-որ բան սխալ գնաց։",
            description: error.message,
          });
          return false;
        }
      }
          
  return (
    <div>
            <Upload
                listType="picture-card"
                customRequest={handleImageUpload}
                showUploadList={true}
                onRemove={handleRemove}
                multiple
            >
                {uploadButton}
            </Upload>
    </div>
  )
}

export default ImageUpload;