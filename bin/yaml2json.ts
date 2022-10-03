#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { yaml2jsonStack, yaml2jsonStackProps } from '../lib/yaml2json-stack';

const app = new cdk.App();

const uid = app.node.tryGetContext("uid")||"briancarr";

const props: yaml2jsonStackProps = {
  env: {
    account: '',
    region: '',
  },
  uid: uid
};

new yaml2jsonStack(app, 'yaml2jsonStack', props)