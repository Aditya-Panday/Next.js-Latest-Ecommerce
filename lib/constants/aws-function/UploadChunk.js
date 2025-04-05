const uploadChunk = async (index, file, urls, chunkSize, totalChunks) => {
  // Ensure file object is valid
  if (!file || !file.file) {
    throw new Error("Invalid file object");
  }

  console.log("urls", urls.presignedUrls[0]);
  const parts = [];

  for (let j = 0; j < totalChunks; j++) {
    console.log("Loop iteration:", j);
    console.log("file.file inside loop", file.file);

    // Ensure file.file is valid inside the loop
    if (!file.file.size) {
      throw new Error("File size is undefined");
    }

    const start = j * chunkSize;
    const end = Math.min(start + chunkSize, file.file.size);

    console.log("start", start, "end", end);

    const chunk = file.file.slice(start, end);
    const partNumber = j + 1;
    try {
      const response = await fetch(urls.presignedUrls[j], {
        method: "PUT",
        body: chunk,
        headers: { "Content-Type": file.file.type },
      });
      console.log("response", response);

      if (!response.headers.etag) {
        throw new Error("ETag is undefined");
      }
      parts.push({
        ETag: response.headers.get("etag"),
        PartNumber: partNumber,
      });

      const progress = Math.round(((j + 1) / totalChunks) * 100);
      console.log("progress", progress);

      // Update file progress
      file.progress = progress;
    } catch (error) {
      throw new Error(
        `Error uploading chunk: ${error.response?.data || error.message}`
      );
    }
  }
  return parts;
};

export const ChunkUpload = async (files, keyFilePath, s3MultipartUpload) => {
  const uploadFile = async (file, index) => {
    if (file.file.size === 0) {
      throw new Error("File size cannot be zero bytes.");
    }

    const file_name = file.file.name;
    const fileSize = file.file.size;
    const chunkSize = 5 * 1024 * 1024; // 5 MB chunk size
    const totalChunks = Math.ceil(fileSize / chunkSize);
    // const fileKey = `${keyFilePath}${file_name}`;
    const fileKey = `${keyFilePath}${encodeURIComponent(file_name)}`;

    const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;

    // Initiate upload
    const UploadId = await s3MultipartUpload({
      action: "initiate",
      data: {
        fileName: file_name,
        fileType: file.file.type,
        bucketName: bucketName,
      },
    }).unwrap();
    console.log("UploadId", UploadId);

    const parts = Array.from({ length: totalChunks });
    const partNumbers = parts.map((_, indx) => indx + 1);

    // generatePresignedUrls
    const url = await s3MultipartUpload({
      action: "generatePresignedUrls",
      data: {
        bucketName: bucketName,
        fileName: fileKey,
        uploadId: UploadId.UploadId,
        partNumbers: partNumbers,
      },
    }).unwrap();
    console.log("url", url);

    // uplaod chunk
    const uploadedParts = await uploadChunk(
      index,
      file,
      url,
      chunkSize,
      totalChunks
    );

    // completeMultipartUpload
    const completeResponse = await s3MultipartUpload({
      action: "complete",
      data: {
        bucketName: bucketName,
        fileName: fileKey,
        uploadId: UploadId.UploadId,
        parts: uploadedParts,
      },
    }).unwrap();
    console.log("completeResponse", completeResponse);

    if (completeResponse.Key !== "") {
      const responseData = {
        file_key: completeResponse.Key,
        filename: file.file.name,
        name: file.file.name,
        file_type: file.file.type,
        file_path: keyFilePath,
        file_size: fileSize,
      };
      return responseData;
    } else {
      throw new Error("Upload completion failed.");
    }
  };

  // Initialize progress state for each file

  const initialProgress = files.map((file) => ({
    name: file.file.name,
    size: file.file.size,
    progress: 0,
  }));

  // Start file uploads and return results
  const uploadResults = await Promise.all(
    files.map((file, index) => uploadFile(file, index))
  );
  return uploadResults;
};
