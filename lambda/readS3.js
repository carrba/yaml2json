const AWS = require('aws-sdk');

const yaml = require('js-yaml')

const s3 = new AWS.S3();

exports.handler = async (event) => {
    const inputFile = event.input // "input.yaml";
    const outputFile = event.output // "output.json";
    const bucketName = event.bucket // "carrba031022-bucket"
    const bucketParams = {
        Bucket: bucketName,
        Key: inputFile
    }

    const inFile = await s3.getObject(bucketParams).promise();

    const yamlBody = inFile.Body.toString('utf-8');

    const myYaml = yaml.load(yamlBody);

    console.log(myYaml)

    const output = JSON.stringify(myYaml, null, 2)

    const newBucketParams = {
        Bucket: bucketName,
        Key: outputFile,
        Body: output
    }

    s3.upload(newBucketParams, function(err, data){
        if (err){
            throw err;
        }
        console.log(`File uploaded to ${outputFile}`)
    })
}