import { s3 } from "@/utils/aws/s3Config";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { action, data } = await req.json();

    switch (action) {
      case "initiate": {
        const { fileName, fileType, bucketName } = data;

        if (!fileName || !bucketName) {
          return NextResponse.json(
            { error: "Missing required parameters" },
            { status: 400 }
          );
        }

        const params = {
          Bucket: bucketName,
          Key: fileName,
          ContentType: fileType,
        };

        const { UploadId } = await s3.createMultipartUpload(params).promise();
        return NextResponse.json(
          { UploadId: String(UploadId) },
          { status: 200 }
        );
      }

      case "generatePresignedUrls": {
        const { bucketName, fileName, uploadId, partNumbers } = data;
        if (!bucketName || !fileName || !uploadId || !partNumbers) {
          return NextResponse.json(
            { error: "Missing required parameters" },
            { status: 400 }
          );
        }

        const presignedUrls = await Promise.all(
          partNumbers.map((partNumber) =>
            s3.getSignedUrlPromise("uploadPart", {
              Bucket: bucketName,
              Key: fileName,
              UploadId: uploadId,
              PartNumber: partNumber,
              Expires: 1800,
            })
          )
        );
        return NextResponse.json({ presignedUrls }, { status: 200 });
      }

      case "complete": {
        const { bucketName, fileName, uploadId, parts } = data;

        if (!bucketName || !fileName || !uploadId || !parts) {
          return NextResponse.json(
            { error: "Missing required parameters" },
            { status: 400 }
          );
        }
        const params = {
          Bucket: bucketName,
          Key: fileName,
          UploadId: uploadId,
          MultipartUpload: { Parts: parts },
        };

        const result = await s3.completeMultipartUpload(params).promise();
        return NextResponse.json({ result }, { status: 200 });
      }

      case "abort": {
        const { bucketName, fileName, uploadId } = data;

        if (!bucketName || !fileName || !uploadId) {
          return NextResponse.json(
            { error: "Missing required parameters" },
            { status: 400 }
          );
        }

        const params = {
          Bucket: bucketName,
          Key: fileName,
          UploadId: uploadId,
        };

        await s3.abortMultipartUpload(params).promise();
        return NextResponse.json(
          { message: "Upload aborted successfully" },
          { status: 200 }
        );
      }

      default:
        return NextResponse.json(
          { error: "Invalid action specified" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error in multipart upload handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
