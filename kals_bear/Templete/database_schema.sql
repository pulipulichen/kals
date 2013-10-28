-- Database: kals2010

-- DROP DATABASE kals2010;

CREATE DATABASE kals2010
  WITH OWNER = postgres
       ENCODING = 'UTF8';

-- Table: "domain"

-- DROP TABLE "domain";

CREATE TABLE "domain"
(
  domain_id serial NOT NULL,
  host character varying(2083) NOT NULL,
  title text,
  CONSTRAINT domain_pk PRIMARY KEY (domain_id)
)
WITH (OIDS=FALSE);
ALTER TABLE "domain" OWNER TO postgres;

-- Table: domain2webpage

-- DROP TABLE domain2webpage;

CREATE TABLE domain2webpage
(
  domain2webpage_id serial NOT NULL,
  domain_id integer NOT NULL,
  webpage_id integer NOT NULL,
  CONSTRAINT domain2webpage_pkey PRIMARY KEY (domain2webpage_id),
  CONSTRAINT domain2webpage_domain_id_fkey FOREIGN KEY (domain_id)
      REFERENCES "domain" (domain_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT domain2webpage_webpage_id_fkey FOREIGN KEY (webpage_id)
      REFERENCES webpage (webpage_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (OIDS=FALSE);
ALTER TABLE domain2webpage OWNER TO postgres;

-- Table: "user"

-- DROP TABLE "user";

CREATE TABLE "user"
(
  user_id serial NOT NULL,
  domain_id integer NOT NULL,
  "name" text NOT NULL,
  email text,
  sex integer NOT NULL DEFAULT 0,
  has_photo boolean NOT NULL DEFAULT false,
  locale character varying(20),
  style text,
  "password" text,
  CONSTRAINT user_pkey PRIMARY KEY (user_id),
  CONSTRAINT user_domain_id_fkey FOREIGN KEY (domain_id)
      REFERENCES "domain" (domain_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (OIDS=FALSE);
ALTER TABLE "user" OWNER TO postgres;

-- Table: webpage

-- DROP TABLE webpage;

CREATE TABLE webpage
(
  webpage_id serial NOT NULL,
  uri character varying(2083) NOT NULL,
  title text,
  CONSTRAINT webpage_pkey PRIMARY KEY (webpage_id)
)
WITH (OIDS=FALSE);
ALTER TABLE webpage OWNER TO postgres;

-- Table: webpage2annotation

-- DROP TABLE webpage2annotation;

CREATE TABLE webpage2annotation
(
  webpage2annotation_id serial NOT NULL,
  webpage_id integer NOT NULL,
  annotation_id integer NOT NULL,
  CONSTRAINT webpage2annotation_pkey PRIMARY KEY (webpage2annotation_id),
  CONSTRAINT webpage2annotation_webpage_id_fkey FOREIGN KEY (webpage_id)
      REFERENCES webpage (webpage_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (OIDS=FALSE);
ALTER TABLE webpage2annotation OWNER TO postgres;

-- Table: webpage2langvar

-- DROP TABLE webpage2langvar;

CREATE TABLE webpage2langvar
(
  webpage_id integer NOT NULL,
  langvar_id integer NOT NULL,
  membership_function text,
  record numeric,
  threshold numeric,
  weight numeric,
  webpage2langvar_id serial NOT NULL,
  CONSTRAINT webpage2langvar_pkey PRIMARY KEY (webpage2langvar_id),
  CONSTRAINT webpage2langvar_webpage_id_fkey FOREIGN KEY (webpage_id)
      REFERENCES webpage (webpage_id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (OIDS=FALSE);
ALTER TABLE webpage2langvar OWNER TO postgres;
