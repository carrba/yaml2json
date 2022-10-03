# yaml2json
AWS CDK project to convert yaml to yson in S3 via lambda

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Example Deploy
Update bin/yaml2json.ts with AWS account and region values

cdk deploy -c uid=<unique-identifier>