import * as cdk from '@aws-cdk/core';
import ecr = require('@aws-cdk/aws-ecr');
import { ResourceName } from './resource_name';

export interface RepositoryStackProps extends cdk.StackProps {
    resourceName: ResourceName;
}

export class RepositoryStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: RepositoryStackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
    }
}
