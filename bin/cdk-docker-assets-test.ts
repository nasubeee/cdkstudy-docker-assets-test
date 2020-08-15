#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkDockerAssetsTestStack } from '../lib/cdk-docker-assets-test-stack';

const app = new cdk.App();
new CdkDockerAssetsTestStack(app, 'CdkDockerAssetsTestStack');
