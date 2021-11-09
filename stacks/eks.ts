import * as cdk from '@aws-cdk/core';
import * as eks from '@aws-cdk/aws-eks';
import * as ec2 from '@aws-cdk/aws-ec2';

import { Tags } from '@aws-cdk/core';

export class MatildaClusterStack extends cdk.Stack {
    public readonly cluster: eks.Cluster;

    constructor(scope: cdk.Construct, id: string, props: MatildaProps) {
        super(scope, id, props);

        const cluster = new eks.Cluster(this, 'MatildaCluster', {
            version: eks.KubernetesVersion.V1_21,
            clusterName: id,
            defaultCapacity: 4,
            vpc: props.vpc
        });
        Tags.of(cluster).add("matilda-cluster", "it-s-me");

        cluster.awsAuth.addMastersRole(cluster.adminRole);

        Tags.of(cluster.adminRole).add("matilda-cluster", "admin");

        cluster.addNodegroupCapacity('matilda-node-group1', {
            desiredSize: 2,
            instanceTypes: [new ec2.InstanceType('m5.xlarge')],
            amiType: eks.NodegroupAmiType.AL2_X86_64,
        });

        cluster.addFargateProfile('matilda-fargate', {
            selectors: [{ namespace: '2048-game' }],
            fargateProfileName: 'matilda-fargate-profile',
        });

        Tags.of(cluster.clusterSecurityGroup).add("matilda-cluster", "sg");

        this.cluster = cluster;
    }
}

interface MatildaProps extends cdk.StackProps {
    vpc?: ec2.IVpc;
}