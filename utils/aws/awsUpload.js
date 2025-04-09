import axios from "axios";
import { completeMultipartUpload, generatePresignedUrls, initiateMultipartUpload } from "./s3MultipartUpload";

const uploadChunk = async (file, urls, chunkSize, totalChunks) => {
  // console.log("fileDATA: ", file)
  // console.log("urls: ", urls)
  // console.log("chunkSize: ", chunkSize)
  // console.log("totalChunks: ", totalChunks)

  const parts = [];
  for (let j = 0; j < totalChunks; j++) {
    const start = j * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);
    const partNumber = j + 1;

    try {
      const { headers } = await axios.put(urls[j], chunk, {
        headers: { "Content-Type": file.type },
      });

      console.log("headers", headers)

      if (!headers.etag) {
        throw new Error("ETag is undefined");
      }

      parts.push({ ETag: headers.etag, PartNumber: partNumber });
      const progress = Math.round(((j + 1) / totalChunks) * 100);
      // console.log("progress", progress);
      file.progress = progress;
      file.status = true;


    } catch (error) {
      throw new Error(
        `Error uploading chunk:', ${error.response?.data || error.message}`
      );
    }
  }
  return parts;
};

export const FileUpload = async (files, keyFilePath, setImages) => {
  const uploadFile = async (file) => {
    console.log("file", file);
    if (file.size === 0) {
      throw new Error("File size cannot be zero bytes.");
    }

    let file_name = file.name;
    const fileSize = file.size;
    const chunkSize = 5 * 1024 * 1024; // 5 MB chunk size
    const totalChunks = Math.ceil(fileSize / chunkSize);
    const fileKey = `${keyFilePath}${file_name}`;

    // Initiate upload
    const UploadId = await initiateMultipartUpload(file, fileKey);

    // const parts = Array.from({ length: totalChunks }, (_, i) => i + 1);

    const parts = Array.from({ length: totalChunks });
    const partNumbers = parts.map((_, indx) => indx + 1);

    // generatePresignedUrls
    const url = await generatePresignedUrls(
      fileKey,
      UploadId,
      partNumbers
    );
    // console.log("Generating", url);

    // uplaod chunk
    const uploadedParts = await uploadChunk(
      file,
      url,
      chunkSize,
      totalChunks,
    );
    // completeMultipartUpload
    const completeResponse = await completeMultipartUpload(
      fileKey,
      UploadId,
      uploadedParts
    );

    // console.log("completeResponse", completeResponse);

    if (completeResponse.Key !== "") {
      const responseData = {
        // file_key: completeResponse.Key,
        // name: file.name,
        location: completeResponse.Location
        // file_size: fileSize,
        // filename: file.filename,
        // file_type: file.type,
        // file_path: keyFilePath,
      };
      console.log("responseData", responseData);
      return responseData;
    } else {
      throw new Error("Upload completion failed.");
    }
  };

  // Start file uploads and return results
  const uploadResults = await Promise.all(
    files.map((file, index) => uploadFile(file, index))
  );
  return uploadResults;
};
