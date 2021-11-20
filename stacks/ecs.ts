import * as cdk from '@aws-cdk/core';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ec2 from '@aws-cdk/aws-ec2';

export class ECSStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);

        const clusterName: string = props.ecsId + '-cluster';
        const cluster = new ecs.Cluster(this, clusterName, {
            clusterName: clusterName,
            containerInsights: true,
            vpc: props.vpc
        })

        const loadBalancedEcsService = new ecsPatterns.ApplicationLoadBalancedEc2Service(this, props.ecsId + '-service', {
            cluster: cluster,
            memoryLimitMiB: 1024,
            taskImageOptions: {
              image: props.image,
              environment: props.environment,
            //   {
            //       SPRING_PROFILES_ACTIVE: "production",
            //       EUREKA_URL: "http://eureka-dev.cashfriends.io/eureka/",
            //   },
            },
            desiredCount: 2,
            vpc: props.vpc
          });
    }
}

interface MatildaProps extends cdk.StackProps {
    ecsId: String;
    vpc: ec2.IVpc;
    image: ecs.ContainerImage;
    environment: { [key: string]: string };
}