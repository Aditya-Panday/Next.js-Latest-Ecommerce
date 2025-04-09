import S3 from "aws-sdk/clients/s3";

export let s3;
if (process.env.NEXT_PUBLIC_IS_LOCAL) {
  s3 = new S3({
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
    },
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    signatureVersion: process.env.NEXT_PUBLIC_AWS_SIGNATURE_VERSION,
    endpoint: process.env.NEXT_PUBLIC_AWS_UPLOAD_ENDPOINT,
  });
} else {
  s3 = new S3({
    region: process.env.AWS_REGION,
    signatureVersion: process.env.AWS_SIGNATURE_VERSION,
    endpoint: process.env.AWS_UPLOAD_ENDPOINT,
  });
}
