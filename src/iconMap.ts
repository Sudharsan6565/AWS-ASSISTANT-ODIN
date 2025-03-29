import ec2 from './icons/ec2.svg';
import lambda from './icons/lambda.svg';
import s3 from './icons/s3.svg';
import cloudwatch from './icons/cloudwatch.svg';
import dynamodb from './icons/dynamodb.svg';
import sns from './icons/sns.svg';
import vpc from './icons/vpc.svg';
import costExplorer from './icons/cost-explorer.svg';
import route53 from './icons/route-53.svg';
import tax from './icons/tax.svg';

const iconMap: Record<string, string> = {
  'EC2': ec2,
  'Lambda': lambda,
  'S3': s3,
  'CloudWatch': cloudwatch,
  'DynamoDB': dynamodb,
  'SNS': sns,
  'VPC': vpc,
  'Cost Explorer': costExplorer,
  'Route 53': route53,
  'Tax': tax,
};

export default iconMap;

