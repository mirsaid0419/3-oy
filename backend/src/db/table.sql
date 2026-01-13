CREATE TABLE "users"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "avatar" TEXT 
);
CREATE TABLE "files"(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "size" INTEGER NOT NULL,
    "user_id" INTEGER REFERENCES users(id) NOT NULL,
    "created_at" DATE DEFAULT now()
);
