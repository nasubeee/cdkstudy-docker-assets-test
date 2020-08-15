#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ResourceName } from '../lib/resource_name';
import { RepositoryStack } from '../lib/repository';
import { AssetsStack } from '../lib/assets';
import { prependOnceListener } from 'process';

const app = new cdk.App();

//==============================================================================
// Get Context and define stack env
//==============================================================================
const systemName = app.node.tryGetContext("system_name");
const systemEnv = app.node.tryGetContext("system_env");
const resourceName = new ResourceName(systemName, systemEnv);
const stackEnv = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
};
const imageHash = app.node.tryGetContext("image_hash");
//==============================================================================
// Get Context and define stack env end
//==============================================================================

//==============================================================================
// generate repository
//==============================================================================
const reposStack = new RepositoryStack(app, 'repository', {
    stackName: resourceName.stackName(`repository`),
    description: `${resourceName.systemName}`,
    env: stackEnv,
    resourceName: resourceName
});
//==============================================================================
// generate repository end
//==============================================================================

//==============================================================================
// generate docker image assets
//==============================================================================
const assetsStack = new AssetsStack(app, 'assets', {
    stackName: resourceName.stackName(`assets`),
    description: `${resourceName.systemName}`,
    env: stackEnv,
    resourceName: resourceName,
    reposName: reposStack.reposName,
    imageHash: imageHash,
});
//==============================================================================
// generate docker image assets end
//==============================================================================