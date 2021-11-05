#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MatildaClusterStack } from './stack';

const primaryRegion = { account: '268926652121', region: 'ap-northeast-1' };
const secondRegion = { account: '268926652121', region: 'ap-southeast-1' };

const stackProps: cdk.StackProps = { env: primaryRegion };

const app = new cdk.App();
const matildaCluster = new MatildaClusterStack(app, 'matilda-cluster1', stackProps);

// const app2 = new cdk.App();
// const matildaCluster2 = new MatildaClusterStack(app2, 'matilda-cluster2', { stackProps: stackProps, vpc: matildaCluster.cluster.vpc });
