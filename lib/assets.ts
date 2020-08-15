import * as cdk from '@aws-cdk/core';
import ecr = require('@aws-cdk/aws-ecr');
import assets = require('@aws-cdk/aws-ecr-assets');
import ssm = require('@aws-cdk/aws-ssm');
import { ResourceName } from './resource_name';
const path = require('path');

export interface AssetsStackProps extends cdk.StackProps {
    resourceName: ResourceName;
}

export class AssetsStack extends cdk.Stack {

    constructor(scope: cdk.Construct, id: string, props: AssetsStackProps) {
        super(scope, id, props);
        //======================================================================
        // refer ecr repository from repository stack
        //======================================================================
        const reposName = ssm.StringParameter.valueForStringParameter(
            this, props.resourceName.ssmParamName(`repository/name`)
        );
        const repos = ecr.Repository.fromRepositoryName(this, `repository`, reposName);
        //======================================================================
        // refer ecr repository from repository stack
        //======================================================================

        //======================================================================
        // Docker image assets
        //======================================================================
        const imageAsset = new assets.DockerImageAsset(this, `docker-image`, {
            directory: path.join(__dirname, 'containers'),
        });
        //======================================================================
        // Docker image assets end
        //======================================================================
    }
}
