const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  development: {
    connection: {
      database: "nc_news"
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`
  },
  test: {
    connection: {
      database: "nc_news_test"
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
