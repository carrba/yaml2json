import { Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3  as s3 } from 'aws-cdk-lib';
import { aws_lambda_nodejs as lambdaNode } from 'aws-cdk-lib';
import { aws_iam as iam } from 'aws-cdk-lib';

export interface yaml2jsonStackProps extends StackProps {
  uid: string
}

export class yaml2jsonStack extends Stack {
  constructor(scope: Construct, id: string, props: yaml2jsonStackProps) {
    super(scope, id, props);

    // Create S3 bucket to hold json and yaml files
    const myBucket = new s3.Bucket(this, "myBucket", {
      bucketName: `${props.uid}-bucket`,
      versioned: true,
      autoDeleteObjects: true, 
      removalPolicy: RemovalPolicy.DESTROY
    })

    // Create lambda function to convert yaml to json
    const myLambda = new lambdaNode.NodejsFunction(this, 'convertYaml2Json', {
      entry: 'lambda/readS3.js',
      handler: 'handler',
      description: 'Converts yaml file to json',
      functionName: `${props.uid}-convert-yaml-2-json`,
      timeout: Duration.seconds(30)
    })
    myLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: ["s3:*"],
      resources: [myBucket.bucketArn],
      effect: iam.Effect.ALLOW,
    }))

    // Grant access to bucket
    myBucket.grantReadWrite(myLambda);
  }
}
