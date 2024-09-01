/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'my-drizzle-app',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc('MyVpc');
    const rds = new sst.aws.Postgres('MyPostgres', { vpc });

    const api = new sst.aws.Function('MyApi', {
      url: true,
      link: [rds],
      handler: 'src/api.handler',
    });

    return {
      api: api.url,
    };
  },
});
