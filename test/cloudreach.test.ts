import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { yaml2jsonStack, yaml2jsonStackProps }from '../lib/yaml2json-stack';
import { App } from 'aws-cdk-lib';


const context = {
    "uid": "test-ab-123"
}

const installerStack = createInstallerStack(context);
const template = Template.fromStack(installerStack)

describe('Stack Tests', () => {
    test('StackName', () => {
        expect(installerStack.stackName).toBe('yaml2jsonStack')
    })
})

describe('Lambda Tests', () => {
    const lambdaCount = 2 // Because S3 auto delete also uses a Lambda function
    test('Lambda count should be ' + lambdaCount, () => {
        template.resourceCountIs('AWS::Lambda::Function', lambdaCount);
    })
    test('Lambda function name should be named with uid', () => {
        template.hasResourceProperties('AWS::Lambda::Function', {
            FunctionName: `${context.uid}-convert-yaml-2-json`
        })
    })
})

describe('S3 Bucket Tests', () => {
    const bucketCount = 1 // Because S3 auto delete also uses a Lambda function
    test('S3 bucket count should be ' + bucketCount, () => {
        template.resourceCountIs("AWS::S3::Bucket", bucketCount);
    })
})


function createInstallerStack(context: any) {
    const app = new App({
        context: context
    })

    const uid = app.node.tryGetContext("uid")||"briancarr";

    const props: yaml2jsonStackProps = {
    env: {
        account: '12345678',
        region: 'eu-west-1',
    },
    uid: uid
    };

    const stack = new yaml2jsonStack(app, 'yaml2jsonStack', props)
    return stack;
}
