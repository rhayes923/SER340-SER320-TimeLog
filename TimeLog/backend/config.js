module.exports = {
  secretKey: "12345-67890-09876-54321",
  database: process.env.DATABASE_NAME || "timelogDB",
  username: process.env.DATABASE_USER || "admin",
  password: process.env.DATABASE_PASSWORD || "node-app123",
  host:
    process.env.DATABASE_SERVER ||
    "cluster0.pff54.mongodb.net/timelogDB?retryWrites=true&w=majority",
};
