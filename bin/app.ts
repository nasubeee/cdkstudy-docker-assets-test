#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ResourceName } from '../lib/resource_name';
import { RepositoryStack } from '../lib/repository';
import { prependOnceListener } from 'process';

const app = new cdk.App();

//==============================================================================
// Get Context and define stack env
//==============================================================================
const systemName = app.node.tryGetContext("system_name");
const systemEnv = app.node.tryGetContext("env");
const resourceName = new ResourceName(systemName, systemEnv);
const stackEnv = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
};
//==============================================================================
// Get Context and define stack env end
//==============================================================================

//==============================================================================
// generate repository
//==============================================================================
const stack = new RepositoryStack(app, 'repository', {
    stackName: resourceName.stackName(),
    description: `${resourceName.systemName}`,
    env: stackEnv,
    resourceName: resourceName
});
//==============================================================================
// generate repository end
//==============================================================================
