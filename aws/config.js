const AWS = require('aws-sdk');

// Configure AWS to use your credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const uploadFileToS3 = async (fileName, content) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: content
    };

    try {
        const stored = await s3.upload(params).promise();
        return stored.Key;
    } catch (err) {
        throw err;
    }
};

const uploadSelectedFile = async (fileName, fileContent, mimeType) => {

  const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `${Date.now()}_${fileName}`, // File name you want to save as in S3
      Body: fileContent,
      ContentType: mimeType
  };

  try {
    const stored = await s3.upload(params).promise();
    return stored.Key;
  } catch(err) {
    throw err;
  }
  
}

const temporalURL = (fileName) => {
  const bucketName = process.env.S3_BUCKET_NAME;
  const key = fileName;
  const signedUrlExpireSeconds = 60 * 5;

  const url = s3.getSignedUrl('getObject', {
    Bucket: bucketName,
    Key: key,
    Expires: signedUrlExpireSeconds
  });

  return url;
}

module.exports = {
  uploadSelectedFile,
  uploadFileToS3,
  temporalURL
}