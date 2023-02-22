CREATE TYPE istatus AS ENUM('NotStarted', 'OnGoing', 'Completed');


CREATE TABLE todos
(
    id SERIAL,
    name text NOT NULL,
    description text,
    user_id SERIAL NOT NULL,
    created timestamptz NOT NULL,
    updated timestamptz NOT NULL,
    status istatus NOT NULL,
    CONSTRAINT todos_pkey PRIMARY KEY (id)
);

CREATE TABLE users
(
    id SERIAL,
    email text NOT NULL,
    password_hash text NOT NULL,
    created timestamptz NOT NULL,
    updated timestamptz NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);
