import axios from "axios";

export const initiateMultipartUpload = async (file, fileKey) => {
    try {
        const initiateResponse = await axios.post(`${process.env.NEXT_PUBLIC_WEB_URL}/api/s3`, {
            action: "initiate",
            data: {
                bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
                fileName: fileKey,
                fileType: file.type,
            }
        });
        const response = initiateResponse.data;
        return response.UploadId;
    } catch (error) {
        throw new Error(`Error initiating upload: ${error}`);
    }
};

export const generatePresignedUrls = async (
    fileKey,
    uploadId,
    partNumbers
) => {
    try {
        const presignedUrlResponse = await axios.post(`${process.env.NEXT_PUBLIC_WEB_URL}/api/s3`, {
            action: "generatePresignedUrls",
            data: {
                bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
                fileName: fileKey,
                uploadId,
                partNumbers,
            }
        });
        const { presignedUrls } = presignedUrlResponse.data;
        return presignedUrls;
    } catch (error) {
        throw new Error(`Error generating presigned URLs:', ${error}`);
    }
};

export const completeMultipartUpload = async (
    fileKey,
    uploadId,
    parts
) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_WEB_URL}/api/s3`, {
            action: "complete",
            data: {
                bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
                fileName: fileKey,
                uploadId,
                parts,
            }
        });
        return data.result;
    } catch (error) {
        throw new Error(`Error completing upload:', ${error}`);
    }
};
