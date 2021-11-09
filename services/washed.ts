#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Apne1Dev } from '../stages/apne1/dev';

const app = new cdk.App();
new Apne1Dev(app, 'apne1-dev', {});