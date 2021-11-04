CREATE TYPE "statuses" AS ENUM (
  'PENDING',
  'ACTIVE'
);

CREATE TABLE "admins" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "email" varchar(255) UNIQUE NOT NULL,
  "password" varchar(255) NOT NULL
);


CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "status" statuses,
  "email" varchar(255) UNIQUE NOT NULL,
  "password" varchar(255) NOT NULL,
  "phone" varchar(20),
  "created_by" int NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP(6)),
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP(6))
);

CREATE TABLE "user_verifications" (
  "token" varchar(36) PRIMARY KEY,
  "user_id" int NOT NULL,
  "verified_at" timestamp,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP(6)),
  "updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP(6))
);

ALTER TABLE "user_verifications" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

CREATE TABLE "admin_password_resets" (
  "token" varchar(36) PRIMARY KEY,
  "admin_id" int NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP(6)),
  "expires_at" timestamp NOT NULL,
  "verified_at" timestamp
);

ALTER TABLE "admin_password_resets" ADD FOREIGN KEY ("admin_id") REFERENCES "admins" ("id") ON DELETE CASCADE;

CREATE TABLE "user_devices" (
  "user_id" INT NOT NULL,
  "device_type" VARCHAR NOT NULL DEFAULT 'ios'::character VARYING,
  "device_token" VARCHAR(500) NOT NULL,
  "created_at" timestamp DEFAULT NOW(),

  PRIMARY KEY (user_id, device_token)
);

ALTER TABLE "user_devices" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

CREATE TABLE "user_password_resets" (
  "token" varchar(36) PRIMARY KEY,
  "user_id" int NOT NULL,
  "created_at" timestamp DEFAULT (CURRENT_TIMESTAMP(6)),
  "expires_at" timestamp NOT NULL,
  "verified_at" timestamp,

  CONSTRAINT "user_password_resets_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
);


ALTER TABLE users ADD COLUMN "deleted_at" timestamp;

ALTER TABLE "user_devices" ADD COLUMN "device_family" VARCHAR NULL;

ALTER TABLE "users" ADD COLUMN "last_login_at" timestamp DEFAULT NULL;

