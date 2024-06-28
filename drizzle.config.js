/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    out:"./drizzle",
    dialect: 'postgresql',
    dbCredentials: {
      url:'postgresql://MockInterview_owner:TX7UmNARf6sI@ep-tight-truth-a24zppwr.eu-central-1.aws.neon.tech/MockInterview?sslmode=require'
    }
  };
  