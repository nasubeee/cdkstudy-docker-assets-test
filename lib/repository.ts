import * as cdk from '@aws-cdk/core';
import ecr = require('@aws-cdk/aws-ecr');
import ssm = require('@aws-cdk/aws-ssm');
import { ResourceName } from './resource_name';

export interface RepositoryStackProps extends cdk.StackProps {
    resourceName: ResourceName;
}

export class RepositoryStack extends cdk.Stack {
    public readonly repos: ecr.Repository;
    public readonly reposName: string;
    public readonly reposNameParam: ssm.StringParameter;

    constructor(scope: cdk.Construct, id: string, props: RepositoryStackProps) {
        super(scope, id, props);
        this.reposName = props.resourceName.ecrRepositoryName(`assets`);
        this.repos = new ecr.Repository(this, `repository`, {
            repositoryName: this.reposName,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });
        this.reposNameParam = new ssm.StringParameter(this, `repository-name`, {
            parameterName: props.resourceName.ssmParamName(`repository/name`),
            description: `${props.resourceName.systemName} ecr repository name`,
            type: ssm.ParameterType.STRING,
            stringValue: this.repos.repositoryName,
        });
    }
}
