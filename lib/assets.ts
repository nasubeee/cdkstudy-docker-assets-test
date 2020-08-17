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
        // refer ecr repository from repository stack
        //======================================================================
        const reposNameFromSSM = ssm.StringParameter.valueForStringParameter(
            this, props.resourceName.ssmParamName(`repository/name`)
        );
        //======================================================================
        // refer ecr repository from repository stack
        //======================================================================

        //======================================================================
        // Docker image assets
        //======================================================================
        // pushed to the aws-cdk/assets repository
        // const imageAsset = new assets.DockerImageAsset(this, `docker-image`, {
        //     directory: path.join(__dirname, 'containers'),
        // });
        //======================================================================
        // Docker image assets end
        //======================================================================


        //======================================================================
        // Docker image assets - repository specification
        //======================================================================
        this.synthesizer.addDockerImageAsset({
            directoryName: path.join(__dirname, 'containers'),
            sourceHash: props.imageHash,
            repositoryName: props.reposName
        });
        //======================================================================
        // Docker image assets - repository specification end
        //======================================================================

        //======================================================================
        // NG PATTERN Docker image assets - repository specification
        //======================================================================
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