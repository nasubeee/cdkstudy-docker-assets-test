#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkDockerAssetsTestStack } from '../lib/stack';

const app = new cdk.App();
new CdkDockerAssetsTestStack(app, 'CdkDockerAssetsTestStack');
