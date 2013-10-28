--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: top; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE top (
    top_id bigint DEFAULT nextval('top_annotation_id_seq'::regclass) NOT NULL,
    user_id integer,
    topic_id integer,
    action integer,
    create_timestamp timestamp without time zone DEFAULT now(),
    u_time timestamp without time zone DEFAULT now(),
    count integer,
    a_score numeric DEFAULT 1,
    f_score numeric DEFAULT 1,
    t_score numeric DEFAULT 1,
    top_c numeric,
    top_u numeric
);


ALTER TABLE public.top OWNER TO kals;

--
-- Name: top_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY top
    ADD CONSTRAINT top_pkey PRIMARY KEY (top_id);


--
-- PostgreSQL database dump complete
--

