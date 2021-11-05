"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const eks = require("@aws-cdk/aws-eks");
const ec2 = require("@aws-cdk/aws-ec2");
const core_1 = require("@aws-cdk/core");
class MatildaClusterStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const cluster = new eks.Cluster(this, 'MatildaCluster', {
            version: eks.KubernetesVersion.V1_21,
            clusterName: id,
            defaultCapacity: 4,
            vpc: props.vpc
        });
        core_1.Tags.of(cluster).add("matilda-cluster", "it-s-me");
        cluster.awsAuth.addMastersRole(cluster.adminRole);
        core_1.Tags.of(cluster.adminRole).add("matilda-cluster", "admin");
        cluster.addNodegroupCapacity('matilda-node-group1', {
            desiredSize: 2,
            instanceTypes: [new ec2.InstanceType('m5.xlarge')],
            amiType: eks.NodegroupAmiType.AL2_X86_64,
        });
        cluster.addFargateProfile('matilda-fargate', {
            selectors: [{ namespace: '2048-game' }],
            fargateProfileName: 'matilda-fargate-profile',
        });
        core_1.Tags.of(cluster.clusterSecurityGroup).add("matilda-cluster", "sg");
        this.cluster = cluster;
    }
}
exports.MatildaClusterStack = MatildaClusterStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFxQztBQUNyQyx3Q0FBd0M7QUFDeEMsd0NBQXdDO0FBRXhDLHdDQUFxQztBQUVyQyxNQUFhLG1CQUFvQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBRzlDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBbUI7UUFDN0QsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUNwRCxPQUFPLEVBQUUsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEtBQUs7WUFDcEMsV0FBVyxFQUFFLEVBQUU7WUFDZixlQUFlLEVBQUUsQ0FBQztZQUNsQixHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7U0FDakIsQ0FBQyxDQUFDO1FBQ0gsV0FBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFbkQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWxELFdBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUzRCxPQUFPLENBQUMsb0JBQW9CLENBQUMscUJBQXFCLEVBQUU7WUFDaEQsV0FBVyxFQUFFLENBQUM7WUFDZCxhQUFhLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEQsT0FBTyxFQUFFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVO1NBQzNDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRTtZQUN6QyxTQUFTLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQztZQUN2QyxrQkFBa0IsRUFBRSx5QkFBeUI7U0FDaEQsQ0FBQyxDQUFDO1FBRUgsV0FBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFbkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQztDQUNKO0FBakNELGtEQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGVrcyBmcm9tICdAYXdzLWNkay9hd3MtZWtzJztcbmltcG9ydCAqIGFzIGVjMiBmcm9tICdAYXdzLWNkay9hd3MtZWMyJztcblxuaW1wb3J0IHsgVGFncyB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgTWF0aWxkYUNsdXN0ZXJTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gICAgcHVibGljIHJlYWRvbmx5IGNsdXN0ZXI6IGVrcy5DbHVzdGVyO1xuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBNYXRpbGRhUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgY29uc3QgY2x1c3RlciA9IG5ldyBla3MuQ2x1c3Rlcih0aGlzLCAnTWF0aWxkYUNsdXN0ZXInLCB7XG4gICAgICAgICAgICB2ZXJzaW9uOiBla3MuS3ViZXJuZXRlc1ZlcnNpb24uVjFfMjEsXG4gICAgICAgICAgICBjbHVzdGVyTmFtZTogaWQsXG4gICAgICAgICAgICBkZWZhdWx0Q2FwYWNpdHk6IDQsXG4gICAgICAgICAgICB2cGM6IHByb3BzLnZwY1xuICAgICAgICB9KTtcbiAgICAgICAgVGFncy5vZihjbHVzdGVyKS5hZGQoXCJtYXRpbGRhLWNsdXN0ZXJcIiwgXCJpdC1zLW1lXCIpO1xuXG4gICAgICAgIGNsdXN0ZXIuYXdzQXV0aC5hZGRNYXN0ZXJzUm9sZShjbHVzdGVyLmFkbWluUm9sZSk7XG5cbiAgICAgICAgVGFncy5vZihjbHVzdGVyLmFkbWluUm9sZSkuYWRkKFwibWF0aWxkYS1jbHVzdGVyXCIsIFwiYWRtaW5cIik7XG5cbiAgICAgICAgY2x1c3Rlci5hZGROb2RlZ3JvdXBDYXBhY2l0eSgnbWF0aWxkYS1ub2RlLWdyb3VwMScsIHtcbiAgICAgICAgICAgIGRlc2lyZWRTaXplOiAyLFxuICAgICAgICAgICAgaW5zdGFuY2VUeXBlczogW25ldyBlYzIuSW5zdGFuY2VUeXBlKCdtNS54bGFyZ2UnKV0sXG4gICAgICAgICAgICBhbWlUeXBlOiBla3MuTm9kZWdyb3VwQW1pVHlwZS5BTDJfWDg2XzY0LFxuICAgICAgICB9KTtcblxuICAgICAgICBjbHVzdGVyLmFkZEZhcmdhdGVQcm9maWxlKCdtYXRpbGRhLWZhcmdhdGUnLCB7XG4gICAgICAgICAgICBzZWxlY3RvcnM6IFt7IG5hbWVzcGFjZTogJzIwNDgtZ2FtZScgfV0sXG4gICAgICAgICAgICBmYXJnYXRlUHJvZmlsZU5hbWU6ICdtYXRpbGRhLWZhcmdhdGUtcHJvZmlsZScsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIFRhZ3Mub2YoY2x1c3Rlci5jbHVzdGVyU2VjdXJpdHlHcm91cCkuYWRkKFwibWF0aWxkYS1jbHVzdGVyXCIsIFwic2dcIik7XG5cbiAgICAgICAgdGhpcy5jbHVzdGVyID0gY2x1c3RlcjtcbiAgICB9XG59XG5cbmludGVyZmFjZSBNYXRpbGRhUHJvcHMgZXh0ZW5kcyBjZGsuU3RhY2tQcm9wcyB7XG4gICAgdnBjPzogZWMyLklWcGM7XG59Il19