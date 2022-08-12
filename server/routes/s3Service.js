var AWS = require('aws-sdk');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;


AWS.config.update({region: 'us-east-1'})
exports.s3Uploadv2 = async (files) => {
  const s3 = new AWS.S3({accessKeyId:'AKIA6QMWTQV75MMXZ376' ,secretAccessKey:'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' });
  console.log("asdfasdf",process.env.AWS_ACCESS_KEY_ID)
  const params = files.map((file) => {
    return {
      Bucket: 'filee-uploadd',
      Key: `dummy/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  console.log("sadf",params)
  return await Promise.all(params.map((param) => s3.upload(param).promise()));
};

exports.s3Uploadv3 = async (files) => {
  const s3client = new S3Client({region:process.env.AWS_REGION,accessKeyId:process.env.AWS_ACCESS_KEY_ID ,secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY });

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${uuid()}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(
    params.map((param) => s3client.send(new PutObjectCommand(param)))
  );
};