const { config } = require('dotenv');
config();
const SOURCE_PATH = process.env.NODE_ENV !== 'production' ? 'src' : 'build/src';

// const isProduction = process.env.NODE_ENV === "production";

// const ormconfig = {
//   type: 'postgres',
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   username: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASS,
//   database: process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST_NAME : process.env.DATABASE_NAME,
//   ssl: process.env.DATABASE_SSL !== 'false' ?
//     process.env.CA_CERT ? {
//       rejectUnauthorized: true,
//       ca: process.env.CA_CERT,
//     } : {
//       rejectUnauthorized: false,
//     } : false,
//   entities: [`${SOURCE_PATH}/**/*.entity.{ts,js}`],
//   migrations: [`${SOURCE_PATH}/migrations/*.{ts,js}`],
//   extra: {
//     max: process.env.DATABASE_MAX_CONNECTIONS || 5,
//   },
//   synchronize: false,
//   logging: process.env.NODE_ENV !== 'test',
//   cli: {
//     migrationsDir: `${SOURCE_PATH}/migrations`,
//   },
// };

export default () => ({
    database: {
      url: process.env.DATABASE_URL,
      // url: isProduction ? process.env.DATABASE_URL
      //   : `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASS}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`
      // ca: process.env.CA_CERT,

      // host: process.env.DATABASE_HOST,
      // port: process.env.DATABASE_PORT,
      // username: process.env.DATABASE_USER,
      // password: process.env.DATABASE_PASS,
      // database: process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST_NAME : process.env.DATABASE_NAME,
      ssl: process.env.DATABASE_SSL !== 'false' ?
        process.env.CA_CERT ? {
          rejectUnauthorized: true,
          ca: process.env.CA_CERT,
        } : {
          rejectUnauthorized: false,
        } : false,
      entities: [`${SOURCE_PATH}/**/*.entity.{ts,js}`],
      migrations: [`${SOURCE_PATH}/migrations/*.{ts,js}`],
      extra: {
        max: process.env.DATABASE_MAX_CONNECTIONS || 5,
      },
      synchronize: false,
      logging: process.env.NODE_ENV !== 'test',
      cli: {
        migrationsDir: `${SOURCE_PATH}/migrations`,
      },
    },
    token: process.env.JWT_TOKEN,
    bucket: {
      region: process.env.IMAGE_S3_REGION,
      spaces: process.env.SPACES,
      accesskeyid: process.env.IMAGE_S3_KEY_ID,
      secretacceskey: process.env.IMAGE_S3_ACCESS_KEY
    },
    mail: {
      from: {
        name: process.env.MAIL_FROM_NAME,
        email: process.env.MAIL_FROM_EMAIL,
      },
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      username: process.env.MAIL_USERNAME,
      password: process.env.MAIL_PASSWORD,
    },
    vapidKeys: {
      publicKey: process.env.PUBLICKEY,
      privateKey: process.env.PRIVATEKEY
    }

  }
);
