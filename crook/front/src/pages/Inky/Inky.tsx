import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { Card, Modal, Upload, Button, Flex, Divider, Typography } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import axios from 'axios';

import { useList } from "@refinedev/core";

import { InkyCarousel } from './InkyCarousel'

const { Title } = Typography;

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// const convertBW = (file: File): Promise<File> => {
//     console.log("Converting Image to B&W");
//     return file
// }

// const prepImage = async (file: RcFile) => {
//     Jimp.read("blah")
//       .then((image) => {
//         console.log("Read file Successfully!");
//       })
//       .catch((err) => {
//         console.log("FAILED");
//         console.log(err);
//       });
//     console.log("prepping image");
//     convertBW(file);
//     return false;
// }


export const InkyPage: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Card
        title="Inky"
      >
        <InkyCarousel />
        <Divider />
        <Title level={3}>Upload New Image</Title>
        <Flex justify="center">
        <ImgCrop
            quality={ 1 }
            aspect={ 1404 / 1872 }
            showGrid
        >
        <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            accept="image/png, image/jpeg"
        >
            {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        </ImgCrop>
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img alt="picture" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        </Flex>

      </Card>
    </>
  );
};