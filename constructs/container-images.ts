import * as cdk from '@aws-cdk/core'
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecr from '@aws-cdk/aws-ecr';

export class ContainerImages extends cdk.Construct {

    public readonly washedImage: ecs.ContainerImage;

    constructor(scope: cdk.Construct, id: string) {
        super(scope, id);

        this.washedImage = ecs.ContainerImage.fromEcrRepository(ecr.Repository.fromRepositoryName(this, 'washed-ecr', 'washed'), 'latest');
    }
}