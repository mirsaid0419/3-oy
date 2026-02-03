CREATE TABLE "users"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "avatar" TEXT,
    "email" TEXT not NULL UNIQUE
);

CREATE TABLE "files"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "size" DECIMAL(10,2) NOT NULL,
    "user_id" INTEGER REFERENCES users(id) NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE Table "messages"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "message" TEXT NOT NULL,
    "to_id" INT REFERENCES users(id) NOT NULL,
    "from_id" INT REFERENCES users(id) NOT NULL,
    "file_name" VARCHAR(255) DEFAULT NULL,
    "created_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "file_type" VARCHAR(50)
);
