import * as cdk from '@aws-cdk/core';
import ssm = require('@aws-cdk/aws-ssm');
import assets = require('@aws-cdk/aws-ecr-assets');
import { ResourceName } from './resource_name';
const path = require('path');

export interface AssetsStackProps extends cdk.StackProps {
    resourceName: ResourceName;
    reposName: string,
    imageHash: string;
}

export class AssetsStack extends cdk.Stack {

    constructor(scope: cdk.Construct, id: string, props: AssetsStackProps) {
        super(scope, id, props);

        //======================================================================
        // [@aws-cdk/aws-ecr-assets] Docker image assets
        //======================================================================
        // pushed to the aws-cdk/assets repository
        // const imageAsset = new assets.DockerImageAsset(this, `docker-image`, {
        //     directory: path.join(__dirname, 'containers'),
        // });
        //======================================================================
        // [@aws-cdk/aws-ecr-assets] Docker image assets end
        //======================================================================

        //======================================================================
        // [@aws-cdk/aws-ecr-assets] Docker image assets - repository specification
        //======================================================================
        // [Warning at /assets/docker-image] DockerImageAsset.repositoryName is deprecated. Override "core.Stack.addDockerImageAsset" to control asset locations
        // const imageAsset = new assets.DockerImageAsset(this, `docker-image`, {
        //     directory: path.join(__dirname, 'containers'),
        //     repositoryName: props.reposName,
        //     extraHash: props.imageHash,
        // });
        //======================================================================
        // [@aws-cdk/aws-ecr-assets] Docker image assets - repository specification end
        //======================================================================

        //======================================================================
        // [@aws-cdk/core Stack.synthesizer] Docker image assets - repository specification
        //======================================================================
        this.synthesizer.addDockerImageAsset({
            directoryName: path.join(__dirname, 'containers'),
            sourceHash: props.imageHash,
            repositoryName: props.reposName
        });
        //======================================================================
        // [@aws-cdk/core Stack.synthesizer] Docker image assets - repository specification end
        //======================================================================

        //======================================================================
        // NG PATTERN Docker image assets - repository specification
        //======================================================================
        // const reposNameFromSSM = ssm.StringParameter.valueForStringParameter(
        //     this, props.resourceName.ssmParamName(`repository/name`)
        // );
        // this.synthesizer.addDockerImageAsset({
        //     directoryName: path.join(__dirname, 'containers'),
        //     sourceHash: props.imageHash,
        //     // Failed to deploy. Cannot use string value from ssm parameter store.
        //     repositoryName: reposNameFromSSM
        // });
        // //======================================================================
        // NG PATTERN Docker image assets - repository specification end
        //======================================================================    
    }
}