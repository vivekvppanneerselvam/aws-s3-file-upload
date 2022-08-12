var AWS = require('aws-sdk');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')


AWS.config.update({region: 'US East (N. Virginia) us-east-1'})
const bucketName = 'arn:aws:s3:::filee-uploadd'
const region = 'us-east-1'
const accessKeyId = 'AKIA6QMWTQV73HNQ5C6R'
const secretAccessKey = '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'
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
 
})
exports.s3Uploadv2 = async (files) => {
  //const s3 = new AWS.S3({region:'us-east-1', accessKeyId:'AKIA6QMWTQV75MMXZ376' ,secretAccessKey:'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' });
  const fileStream = fs.createReadStream(files.path)
  console.log("fileStream",fileStream)
  //const params = files.map((file) => {
    console.log(files);
    let file = files.file
    
    fs.readFile(files.path, function(err,data){
      if(err) throw err;
      console.log(data)
    })
    const params =  {
      Bucket: 'filee-uploadd',
      Key: `dummy/${uuid()}-${files.filename}`,
      Body: fileStream,
    };
  //});

  console.log("sadf",params)
  return s3.upload(params).promise()
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


function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket:  process.env.AWS_BUCKET_NAME
  }

  return s3.getObject(downloadParams).createReadStream()
}

exports.getFileStream = getFileStream