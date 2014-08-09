--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: anchor_text; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE anchor_text (
    anchor_text_id integer NOT NULL,
    text text NOT NULL,
    indexed tsvector,
    segmented text
);


ALTER TABLE public.anchor_text OWNER TO kals;

--
-- Name: TABLE anchor_text; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE anchor_text IS '錨點文字';


--
-- Name: anchor_text_anchor_text_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE anchor_text_anchor_text_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.anchor_text_anchor_text_id_seq OWNER TO kals;

--
-- Name: anchor_text_anchor_text_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE anchor_text_anchor_text_id_seq OWNED BY anchor_text.anchor_text_id;


--
-- Name: annotation; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE annotation (
    annotation_id integer NOT NULL,
    create_timestamp timestamp with time zone DEFAULT now() NOT NULL,
    update_timestamp timestamp with time zone DEFAULT now() NOT NULL,
    deleted boolean DEFAULT false NOT NULL,
    user_id integer NOT NULL,
    annotation_type_id integer DEFAULT 1 NOT NULL,
    note text,
    note_index tsvector,
    topic_id integer
);


ALTER TABLE public.annotation OWNER TO kals;

--
-- Name: TABLE annotation; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE annotation IS '標註資料';


--
-- Name: annotation2scope; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE annotation2scope (
    annotation2scope_id integer NOT NULL,
    annotation_id integer NOT NULL,
    scope_id integer NOT NULL
);


ALTER TABLE public.annotation2scope OWNER TO kals;

--
-- Name: scope; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE scope (
    scope_id integer NOT NULL,
    webpage_id integer NOT NULL,
    from_index integer NOT NULL,
    to_index integer NOT NULL,
    anchor_text_id integer NOT NULL
);


ALTER TABLE public.scope OWNER TO kals;

--
-- Name: TABLE scope; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE scope IS '標註範圍';


--
-- Name: annotation2anchor_text; Type: VIEW; Schema: public; Owner: kals
--

CREATE VIEW annotation2anchor_text AS
    SELECT annotation.annotation_id, anchor_text.anchor_text_id, anchor_text.text, anchor_text.indexed, anchor_text.segmented FROM (((annotation JOIN annotation2scope USING (annotation_id)) JOIN scope USING (scope_id)) JOIN anchor_text USING (anchor_text_id));


ALTER TABLE public.annotation2anchor_text OWNER TO kals;

--
-- Name: VIEW annotation2anchor_text; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON VIEW annotation2anchor_text IS '標註對應的錨點文字';


--
-- Name: annotation2like; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE annotation2like (
    annotation2like_id integer NOT NULL,
    annotation_id integer NOT NULL,
    user_id integer NOT NULL,
    create_time timestamp with time zone DEFAULT now() NOT NULL,
    canceled boolean DEFAULT false NOT NULL,
    update_time timestamp with time zone DEFAULT now() NOT NULL,
    create_timestamp timestamp with time zone,
    update_timestamp timestamp with time zone
);


ALTER TABLE public.annotation2like OWNER TO kals;

--
-- Name: annotation2like_annotation2like_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE annotation2like_annotation2like_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.annotation2like_annotation2like_id_seq OWNER TO kals;

--
-- Name: annotation2like_annotation2like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE annotation2like_annotation2like_id_seq OWNED BY annotation2like.annotation2like_id;


--
-- Name: annotation2like_count; Type: VIEW; Schema: public; Owner: kals
--

CREATE VIEW annotation2like_count AS
    SELECT annotation.annotation_id, count(annotation2like.user_id) AS like_count FROM (annotation LEFT JOIN annotation2like ON ((((annotation.annotation_id = annotation2like.annotation_id) AND (annotation2like.canceled = false)) AND (annotation.user_id <> annotation2like.user_id)))) GROUP BY annotation.annotation_id ORDER BY annotation.annotation_id;


ALTER TABLE public.annotation2like_count OWNER TO kals;

--
-- Name: VIEW annotation2like_count; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON VIEW annotation2like_count IS '標註對應的喜愛次數';


--
-- Name: annotation2respond; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE annotation2respond (
    annotation2respond_id integer NOT NULL,
    annotation_id integer NOT NULL,
    respond_to integer NOT NULL
);


ALTER TABLE public.annotation2respond OWNER TO kals;

--
-- Name: annotation2respond_annotation2respond_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE annotation2respond_annotation2respond_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.annotation2respond_annotation2respond_id_seq OWNER TO kals;

--
-- Name: annotation2respond_annotation2respond_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE annotation2respond_annotation2respond_id_seq OWNED BY annotation2respond.annotation2respond_id;


--
-- Name: annotation2respond_count; Type: VIEW; Schema: public; Owner: kals
--

CREATE VIEW annotation2respond_count AS
    SELECT annotation.annotation_id, count(annotation2respond.annotation_id) AS responded_count FROM (annotation LEFT JOIN annotation2respond ON ((annotation.annotation_id = annotation2respond.respond_to))) GROUP BY annotation.annotation_id;


ALTER TABLE public.annotation2respond_count OWNER TO kals;

--
-- Name: VIEW annotation2respond_count; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON VIEW annotation2respond_count IS '標註對應的回應次數';


--
-- Name: annotation2scope_annotation2scope_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE annotation2scope_annotation2scope_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.annotation2scope_annotation2scope_id_seq OWNER TO kals;

--
-- Name: annotation2scope_annotation2scope_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE annotation2scope_annotation2scope_id_seq OWNED BY annotation2scope.annotation2scope_id;


--
-- Name: scope2length; Type: VIEW; Schema: public; Owner: kals
--

CREATE VIEW scope2length AS
    SELECT scope.scope_id, ((scope.to_index - scope.from_index) + 1) AS length FROM scope;


ALTER TABLE public.scope2length OWNER TO kals;

--
-- Name: VIEW scope2length; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON VIEW scope2length IS '範圍的長度';


--
-- Name: annotation2scope_length; Type: VIEW; Schema: public; Owner: kals
--

CREATE VIEW annotation2scope_length AS
    SELECT annotation2scope.annotation_id, sum(scope2length.length) AS scope_length FROM (annotation2scope JOIN scope2length USING (scope_id)) GROUP BY annotation2scope.annotation_id;


ALTER TABLE public.annotation2scope_length OWNER TO kals;

--
-- Name: VIEW annotation2scope_length; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON VIEW annotation2scope_length IS '標註範圍的長度';


--
-- Name: score; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE score (
    score_id integer NOT NULL,
    annotation_id integer NOT NULL,
    score_type_id integer DEFAULT 1 NOT NULL,
    score numeric NOT NULL
);


ALTER TABLE public.score OWNER TO kals;

--
-- Name: TABLE score; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE score IS '優質標註分數記錄';


--
-- Name: annotation2score; Type: VIEW; Schema: public; Owner: kals
--

CREATE VIEW annotation2score AS
    SELECT annotation.annotation_id, CASE WHEN (score.score IS NOT NULL) THEN score.score ELSE (0)::numeric END AS score FROM (annotation LEFT JOIN score ON (((annotation.annotation_id = score.annotation_id) AND (score.score_type_id = 0)))) ORDER BY annotation.annotation_id;


ALTER TABLE public.annotation2score OWNER TO kals;

--
-- Name: VIEW annotation2score; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON VIEW annotation2score IS '優質標註分數';


--
-- Name: annotation2topic_respond_count; Type: VIEW; Schema: public; Owner: kals
--

CREATE VIEW annotation2topic_respond_count AS
    SELECT annotation_topic.annotation_id, count(annotation_respond.annotation_id) AS topic_responded_count FROM (annotation annotation_topic LEFT JOIN annotation annotation_respond ON ((((annotation_respond.topic_id = annotation_topic.annotation_id) AND (annotation_respond.deleted IS FALSE)) AND (annotation_respond.topic_id IS NOT NULL)))) GROUP BY annotation_topic.annotation_id ORDER BY annotation_topic.annotation_id;


ALTER TABLE public.annotation2topic_respond_count OWNER TO kals;

--
-- Name: VIEW annotation2topic_respond_count; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON VIEW annotation2topic_respond_count IS '僅有主題標註被回應的次數';


--
-- Name: annotation_annotation_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE annotation_annotation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.annotation_annotation_id_seq OWNER TO kals;

--
-- Name: annotation_annotation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE annotation_annotation_id_seq OWNED BY annotation.annotation_id;


--
-- Name: annotation_consensus; Type: VIEW; Schema: public; Owner: kals
--

CREATE VIEW annotation_consensus AS
    SELECT main.annotation_id, count(consensus.annotation_id) AS count FROM ((SELECT annotation.annotation_id, annotation.user_id, annotation2scope.scope_id FROM (annotation JOIN annotation2scope USING (annotation_id)) WHERE ((annotation.topic_id IS NULL) AND (annotation.deleted IS FALSE))) main LEFT JOIN (SELECT annotation.annotation_id, annotation.user_id, annotation2scope.scope_id FROM (annotation JOIN annotation2scope USING (annotation_id)) WHERE ((annotation.topic_id IS NULL) AND (annotation.deleted IS FALSE))) consensus ON ((((main.scope_id = consensus.scope_id) AND (main.annotation_id <> consensus.annotation_id)) AND (main.user_id <> consensus.user_id)))) GROUP BY main.annotation_id ORDER BY main.annotation_id;


ALTER TABLE public.annotation_consensus OWNER TO kals;

--
-- Name: VIEW annotation_consensus; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON VIEW annotation_consensus IS '標註共識的統計表';


--
-- Name: c_score; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE c_score (
    c1 numeric DEFAULT 1,
    c2 numeric DEFAULT 1,
    c3 numeric DEFAULT 1,
    uc1 numeric DEFAULT 1,
    uc2 numeric DEFAULT 1,
    uc3 numeric DEFAULT 1
);


ALTER TABLE public.c_score OWNER TO kals;

--
-- Name: ci_sessions; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE ci_sessions (
    session_id character varying(40) DEFAULT 0 NOT NULL,
    ip_address character varying(16) DEFAULT 0 NOT NULL,
    user_agent character varying(50) NOT NULL,
    last_activity integer DEFAULT 0 NOT NULL,
    user_data text
);


ALTER TABLE public.ci_sessions OWNER TO kals;

--
-- Name: TABLE ci_sessions; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE ci_sessions IS 'CodeIgnitor使用的SESSION資料表';


--
-- Name: domain; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE domain (
    domain_id integer NOT NULL,
    host character varying(2083) NOT NULL,
    title text
);


ALTER TABLE public.domain OWNER TO kals;

--
-- Name: TABLE domain; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE domain IS '網域：用於使用者帳戶與網頁管理';


--
-- Name: domain_domain_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE domain_domain_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.domain_domain_id_seq OWNER TO kals;

--
-- Name: domain_domain_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE domain_domain_id_seq OWNED BY domain.domain_id;


--
-- Name: feature; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE feature (
    feature_id integer NOT NULL,
    annotation_id integer NOT NULL,
    feature_type_id integer NOT NULL,
    value text
);


ALTER TABLE public.feature OWNER TO kals;

--
-- Name: TABLE feature; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE feature IS '標註的特徵資料';


--
-- Name: feature_feature_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE feature_feature_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feature_feature_id_seq OWNER TO kals;

--
-- Name: feature_feature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE feature_feature_id_seq OWNED BY feature.feature_id;


--
-- Name: group; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE "group" (
    group_id integer NOT NULL,
    name text,
    domain_id integer NOT NULL
);


ALTER TABLE public."group" OWNER TO kals;

--
-- Name: group2actor; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE group2actor (
    group2actor_id integer NOT NULL,
    group_id integer NOT NULL,
    actor_type_id integer NOT NULL,
    actor_id integer NOT NULL
);


ALTER TABLE public.group2actor OWNER TO kals;

--
-- Name: group2actor_group2actor_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE group2actor_group2actor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.group2actor_group2actor_id_seq OWNER TO kals;

--
-- Name: group2actor_group2actor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE group2actor_group2actor_id_seq OWNED BY group2actor.group2actor_id;


--
-- Name: group_group_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE group_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.group_group_id_seq OWNER TO kals;

--
-- Name: group_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE group_group_id_seq OWNED BY "group".group_id;


--
-- Name: langvar; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE langvar (
    langvar_id integer NOT NULL,
    webpage_id integer NOT NULL,
    langvar_type_id integer NOT NULL,
    function_variables text,
    threshold numeric,
    record numeric,
    weight numeric,
    updated boolean DEFAULT false NOT NULL
);


ALTER TABLE public.langvar OWNER TO kals;

--
-- Name: TABLE langvar; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE langvar IS '優質標註分數的語言變數';


--
-- Name: langvar_langvar_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE langvar_langvar_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.langvar_langvar_id_seq OWNER TO kals;

--
-- Name: langvar_langvar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE langvar_langvar_id_seq OWNED BY langvar.langvar_id;


--
-- Name: log; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE log (
    log_id bigint NOT NULL,
    user_id integer,
    log_timestamp timestamp with time zone DEFAULT now() NOT NULL,
    webpage_id integer,
    action integer,
    note text,
    user_ip text
);


ALTER TABLE public.log OWNER TO kals;

--
-- Name: TABLE log; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE log IS '1=檢查登入成功	//記得要取得瀏覽器資料
2=檢查登入失敗
3=輸入登入成功
4=輸入登入失敗
5=內嵌登入成功
6=內嵌登入失敗
7=登出
8=註冊成功
9=註冊失敗
10=變更帳戶
11=變更密碼
12=瀏覽標註: 範圍
13=新增標註沒有建議:type;note
14=新增標註具有建議:type;note;recommend_id
15=修改標註:type:note
16=瀏覽討論
17=未登入者瀏覽
18=未登入者瀏覽討論
19=刪除標註:annotation_id
20=新增回應標註:type;topic_id;respond_id_list;note
21=修改回應標註:type;topic_id;respond_id_list;note
22=加入喜愛清單:被喜愛的annotation_id
23=移除喜愛清單:被移除的annotation_id
24=接受建議，沒有推薦:recommend_id
25=接受建議，有推薦:recommend_id
26=拒絕建議:recommend_id
27=發生錯誤:錯誤內容
28=查看說明';


--
-- Name: log_log_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE log_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.log_log_id_seq OWNER TO kals;

--
-- Name: log_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE log_log_id_seq OWNED BY log.log_id;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE notification (
    notification_id integer NOT NULL,
    create_timestamp timestamp with time zone DEFAULT now() NOT NULL,
    read boolean DEFAULT false NOT NULL,
    update_timestamp timestamp with time zone DEFAULT now() NOT NULL,
    trigger_actor_type_id integer DEFAULT 1,
    trigger_actor_id integer,
    trigger_resource_type_id integer DEFAULT 3 NOT NULL,
    trigger_resource_id integer NOT NULL,
    notification_type_id integer NOT NULL,
    association_user_id integer NOT NULL
);


ALTER TABLE public.notification OWNER TO kals;

--
-- Name: TABLE notification; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE notification IS '標註動作的通知記錄';


--
-- Name: notification_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE notification_notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notification_notification_id_seq OWNER TO kals;

--
-- Name: notification_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE notification_notification_id_seq OWNED BY notification.notification_id;


--
-- Name: policy; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE policy (
    policy_id integer NOT NULL,
    action_id integer NOT NULL,
    resource_type_id integer NOT NULL,
    resource_id integer NOT NULL
);


ALTER TABLE public.policy OWNER TO kals;

--
-- Name: TABLE policy; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE policy IS '權限';


--
-- Name: policy2actor; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE policy2actor (
    policy2actor_id integer NOT NULL,
    policy_id integer NOT NULL,
    actor_type_id integer NOT NULL,
    actor_id integer NOT NULL
);


ALTER TABLE public.policy2actor OWNER TO kals;

--
-- Name: TABLE policy2actor; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE policy2actor IS '權限與對應使用者或群組的關連資料表';


--
-- Name: policy2actor_policy2actor_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE policy2actor_policy2actor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.policy2actor_policy2actor_id_seq OWNER TO kals;

--
-- Name: policy2actor_policy2actor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE policy2actor_policy2actor_id_seq OWNED BY policy2actor.policy2actor_id;


--
-- Name: policy_policy_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE policy_policy_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.policy_policy_id_seq OWNER TO kals;

--
-- Name: policy_policy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE policy_policy_id_seq OWNED BY policy.policy_id;


--
-- Name: recommend_recommend_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE recommend_recommend_id_seq
    START WITH 945
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recommend_recommend_id_seq OWNER TO kals;

--
-- Name: recommend; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE recommend (
    recommend_id integer DEFAULT nextval('recommend_recommend_id_seq'::regclass) NOT NULL,
    recommended_annotation_id integer NOT NULL,
    recommended_webpage_id integer,
    create_time timestamp with time zone DEFAULT now() NOT NULL,
    checked_time timestamp with time zone,
    accept boolean,
    recommend_by_annotation_id integer,
    deleted boolean DEFAULT false NOT NULL,
    create_timestamp timestamp with time zone,
    checked_timestamp timestamp with time zone
);


ALTER TABLE public.recommend OWNER TO kals;

--
-- Name: TABLE recommend; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE recommend IS '優質標註建議';


--
-- Name: scope_scope_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE scope_scope_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.scope_scope_id_seq OWNER TO kals;

--
-- Name: scope_scope_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE scope_scope_id_seq OWNED BY scope.scope_id;


--
-- Name: score_score_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE score_score_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.score_score_id_seq OWNER TO kals;

--
-- Name: score_score_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE score_score_id_seq OWNED BY score.score_id;


--
-- Name: top_annotation_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE top_annotation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.top_annotation_id_seq OWNER TO kals;

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
-- Name: user; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE "user" (
    user_id integer NOT NULL,
    name text NOT NULL,
    email text,
    sex integer DEFAULT 0 NOT NULL,
    photo boolean DEFAULT false NOT NULL,
    locale character varying(20),
    style text,
    password text,
    deleted boolean DEFAULT false NOT NULL,
    domain_id integer NOT NULL
);


ALTER TABLE public."user" OWNER TO kals;

--
-- Name: TABLE "user"; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE "user" IS '使用者';


--
-- Name: webpage2annotation; Type: VIEW; Schema: public; Owner: kals
--

CREATE VIEW webpage2annotation AS
    SELECT DISTINCT scope.webpage_id, annotation.annotation_id FROM ((annotation JOIN annotation2scope ON ((annotation.annotation_id = annotation2scope.annotation_id))) JOIN scope ON ((annotation2scope.scope_id = scope.scope_id))) ORDER BY scope.webpage_id;


ALTER TABLE public.webpage2annotation OWNER TO kals;

--
-- Name: VIEW webpage2annotation; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON VIEW webpage2annotation IS '網頁與標註的關聯表';


--
-- Name: top_ranking; Type: VIEW; Schema: public; Owner: kals
--

CREATE VIEW top_ranking AS
    SELECT webpage2annotation.webpage_id, "user".user_id, "user".name AS user_name, avg(top.t_score) AS t_score_avg FROM webpage2annotation, top, "user" WHERE ((top.user_id = "user".user_id) AND (webpage2annotation.annotation_id = top.topic_id)) GROUP BY "user".user_id, webpage2annotation.webpage_id, "user".name HAVING (count(top.t_score) >= 5) ORDER BY avg(top.t_score) DESC;


ALTER TABLE public.top_ranking OWNER TO kals;

--
-- Name: type; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE type (
    type_id integer NOT NULL,
    name text NOT NULL,
    basic boolean DEFAULT false NOT NULL
);


ALTER TABLE public.type OWNER TO kals;

--
-- Name: TABLE type; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE type IS '標註類型';


--
-- Name: type_type_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE type_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.type_type_id_seq OWNER TO kals;

--
-- Name: type_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE type_type_id_seq OWNED BY type.type_id;


--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_user_id_seq OWNER TO kals;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE user_user_id_seq OWNED BY "user".user_id;


--
-- Name: webpage; Type: TABLE; Schema: public; Owner: kals; Tablespace: 
--

CREATE TABLE webpage (
    webpage_id integer NOT NULL,
    uri character varying(2083) NOT NULL,
    title text,
    domain_id integer NOT NULL
);


ALTER TABLE public.webpage OWNER TO kals;

--
-- Name: TABLE webpage; Type: COMMENT; Schema: public; Owner: kals
--

COMMENT ON TABLE webpage IS '網頁的資料';


--
-- Name: webpage_webpage_id_seq; Type: SEQUENCE; Schema: public; Owner: kals
--

CREATE SEQUENCE webpage_webpage_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.webpage_webpage_id_seq OWNER TO kals;

--
-- Name: webpage_webpage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: kals
--

ALTER SEQUENCE webpage_webpage_id_seq OWNED BY webpage.webpage_id;


--
-- Name: anchor_text_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY anchor_text ALTER COLUMN anchor_text_id SET DEFAULT nextval('anchor_text_anchor_text_id_seq'::regclass);


--
-- Name: annotation_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY annotation ALTER COLUMN annotation_id SET DEFAULT nextval('annotation_annotation_id_seq'::regclass);


--
-- Name: annotation2like_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY annotation2like ALTER COLUMN annotation2like_id SET DEFAULT nextval('annotation2like_annotation2like_id_seq'::regclass);


--
-- Name: annotation2respond_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY annotation2respond ALTER COLUMN annotation2respond_id SET DEFAULT nextval('annotation2respond_annotation2respond_id_seq'::regclass);


--
-- Name: annotation2scope_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY annotation2scope ALTER COLUMN annotation2scope_id SET DEFAULT nextval('annotation2scope_annotation2scope_id_seq'::regclass);


--
-- Name: domain_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY domain ALTER COLUMN domain_id SET DEFAULT nextval('domain_domain_id_seq'::regclass);


--
-- Name: feature_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY feature ALTER COLUMN feature_id SET DEFAULT nextval('feature_feature_id_seq'::regclass);


--
-- Name: group_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY "group" ALTER COLUMN group_id SET DEFAULT nextval('group_group_id_seq'::regclass);


--
-- Name: group2actor_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY group2actor ALTER COLUMN group2actor_id SET DEFAULT nextval('group2actor_group2actor_id_seq'::regclass);


--
-- Name: langvar_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY langvar ALTER COLUMN langvar_id SET DEFAULT nextval('langvar_langvar_id_seq'::regclass);


--
-- Name: log_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY log ALTER COLUMN log_id SET DEFAULT nextval('log_log_id_seq'::regclass);


--
-- Name: notification_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY notification ALTER COLUMN notification_id SET DEFAULT nextval('notification_notification_id_seq'::regclass);


--
-- Name: policy_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY policy ALTER COLUMN policy_id SET DEFAULT nextval('policy_policy_id_seq'::regclass);


--
-- Name: policy2actor_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY policy2actor ALTER COLUMN policy2actor_id SET DEFAULT nextval('policy2actor_policy2actor_id_seq'::regclass);


--
-- Name: scope_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY scope ALTER COLUMN scope_id SET DEFAULT nextval('scope_scope_id_seq'::regclass);


--
-- Name: score_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY score ALTER COLUMN score_id SET DEFAULT nextval('score_score_id_seq'::regclass);


--
-- Name: type_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY type ALTER COLUMN type_id SET DEFAULT nextval('type_type_id_seq'::regclass);


--
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY "user" ALTER COLUMN user_id SET DEFAULT nextval('user_user_id_seq'::regclass);


--
-- Name: webpage_id; Type: DEFAULT; Schema: public; Owner: kals
--

ALTER TABLE ONLY webpage ALTER COLUMN webpage_id SET DEFAULT nextval('webpage_webpage_id_seq'::regclass);


--
-- Name: anchor_text_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY anchor_text
    ADD CONSTRAINT anchor_text_pkey PRIMARY KEY (anchor_text_id);


--
-- Name: anchor_text_text_key; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY anchor_text
    ADD CONSTRAINT anchor_text_text_key UNIQUE (text);


--
-- Name: annotation2like_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY annotation2like
    ADD CONSTRAINT annotation2like_pkey PRIMARY KEY (annotation2like_id);


--
-- Name: annotation2respond_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY annotation2respond
    ADD CONSTRAINT annotation2respond_pkey PRIMARY KEY (annotation2respond_id);


--
-- Name: annotation2scope_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY annotation2scope
    ADD CONSTRAINT annotation2scope_pkey PRIMARY KEY (annotation2scope_id);


--
-- Name: annotation_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY annotation
    ADD CONSTRAINT annotation_pkey PRIMARY KEY (annotation_id);


--
-- Name: ci_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY ci_sessions
    ADD CONSTRAINT ci_sessions_pkey PRIMARY KEY (session_id);


--
-- Name: domain_pk; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY domain
    ADD CONSTRAINT domain_pk PRIMARY KEY (domain_id);


--
-- Name: feature_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY feature
    ADD CONSTRAINT feature_pkey PRIMARY KEY (feature_id);


--
-- Name: group2actor_group_id_key; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY group2actor
    ADD CONSTRAINT group2actor_group_id_key UNIQUE (group_id, actor_type_id, actor_id);


--
-- Name: group2actor_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY group2actor
    ADD CONSTRAINT group2actor_pkey PRIMARY KEY (group2actor_id);


--
-- Name: group_group_id_key; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY "group"
    ADD CONSTRAINT group_group_id_key UNIQUE (group_id, domain_id);


--
-- Name: group_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY "group"
    ADD CONSTRAINT group_pkey PRIMARY KEY (group_id);


--
-- Name: langvar_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY langvar
    ADD CONSTRAINT langvar_pkey PRIMARY KEY (langvar_id);


--
-- Name: langvar_webpage_id_key; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY langvar
    ADD CONSTRAINT langvar_webpage_id_key UNIQUE (webpage_id, langvar_type_id);


--
-- Name: log_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY log
    ADD CONSTRAINT log_pkey PRIMARY KEY (log_id);


--
-- Name: notification_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (notification_id);


--
-- Name: notification_trigger_actor_type_id_key; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT notification_trigger_actor_type_id_key UNIQUE (trigger_actor_type_id, trigger_actor_id, trigger_resource_type_id, trigger_resource_id, association_user_id, notification_type_id);


--
-- Name: policy2actor_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY policy2actor
    ADD CONSTRAINT policy2actor_pkey PRIMARY KEY (policy2actor_id);


--
-- Name: policy_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY policy
    ADD CONSTRAINT policy_pkey PRIMARY KEY (policy_id);


--
-- Name: recommend_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY recommend
    ADD CONSTRAINT recommend_pkey PRIMARY KEY (recommend_id);


--
-- Name: scope_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY scope
    ADD CONSTRAINT scope_pkey PRIMARY KEY (scope_id);


--
-- Name: score_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY score
    ADD CONSTRAINT score_pkey PRIMARY KEY (score_id);


--
-- Name: top_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY top
    ADD CONSTRAINT top_pkey PRIMARY KEY (top_id);


--
-- Name: type_pk_type_id; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY type
    ADD CONSTRAINT type_pk_type_id PRIMARY KEY (type_id);


--
-- Name: type_unique_name; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY type
    ADD CONSTRAINT type_unique_name UNIQUE (name);


--
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: webpage_pkey; Type: CONSTRAINT; Schema: public; Owner: kals; Tablespace: 
--

ALTER TABLE ONLY webpage
    ADD CONSTRAINT webpage_pkey PRIMARY KEY (webpage_id);


--
-- Name: fki_; Type: INDEX; Schema: public; Owner: kals; Tablespace: 
--

CREATE INDEX fki_ ON group2actor USING btree (group_id);


--
-- Name: fki_annotation2respond_respond_to; Type: INDEX; Schema: public; Owner: kals; Tablespace: 
--

CREATE INDEX fki_annotation2respond_respond_to ON annotation2respond USING btree (respond_to);


--
-- Name: fki_feature_2_annotation; Type: INDEX; Schema: public; Owner: kals; Tablespace: 
--

CREATE INDEX fki_feature_2_annotation ON feature USING btree (annotation_id);


--
-- Name: fki_notification_association_user_id; Type: INDEX; Schema: public; Owner: kals; Tablespace: 
--

CREATE INDEX fki_notification_association_user_id ON notification USING btree (association_user_id);


--
-- Name: annotation2like_annotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY annotation2like
    ADD CONSTRAINT annotation2like_annotation_id_fkey FOREIGN KEY (annotation_id) REFERENCES annotation(annotation_id);


--
-- Name: annotation2like_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY annotation2like
    ADD CONSTRAINT annotation2like_user_id_fkey FOREIGN KEY (user_id) REFERENCES "user"(user_id);


--
-- Name: annotation2respond_annotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY annotation2respond
    ADD CONSTRAINT annotation2respond_annotation_id_fkey FOREIGN KEY (annotation_id) REFERENCES annotation(annotation_id);


--
-- Name: annotation2respond_respond_to_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY annotation2respond
    ADD CONSTRAINT annotation2respond_respond_to_fkey FOREIGN KEY (respond_to) REFERENCES annotation(annotation_id);


--
-- Name: annotation2scope_annotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY annotation2scope
    ADD CONSTRAINT annotation2scope_annotation_id_fkey FOREIGN KEY (annotation_id) REFERENCES annotation(annotation_id);


--
-- Name: annotation2scope_scope_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY annotation2scope
    ADD CONSTRAINT annotation2scope_scope_id_fkey FOREIGN KEY (scope_id) REFERENCES scope(scope_id);


--
-- Name: feature_annotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY feature
    ADD CONSTRAINT feature_annotation_id_fkey FOREIGN KEY (annotation_id) REFERENCES annotation(annotation_id);


--
-- Name: group2actor_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY group2actor
    ADD CONSTRAINT group2actor_group_id_fkey FOREIGN KEY (group_id) REFERENCES "group"(group_id);


--
-- Name: langvar_webpage_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY langvar
    ADD CONSTRAINT langvar_webpage_id_fkey FOREIGN KEY (webpage_id) REFERENCES webpage(webpage_id);


--
-- Name: notification_association_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY notification
    ADD CONSTRAINT notification_association_user_id_fkey FOREIGN KEY (association_user_id) REFERENCES "user"(user_id);


--
-- Name: policy2actor_policy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY policy2actor
    ADD CONSTRAINT policy2actor_policy_id_fkey FOREIGN KEY (policy_id) REFERENCES policy(policy_id);


--
-- Name: recommend_recommend_by_annotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY recommend
    ADD CONSTRAINT recommend_recommend_by_annotation_id_fkey FOREIGN KEY (recommend_by_annotation_id) REFERENCES annotation(annotation_id);


--
-- Name: recommend_recommended_annotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY recommend
    ADD CONSTRAINT recommend_recommended_annotation_id_fkey FOREIGN KEY (recommended_annotation_id) REFERENCES annotation(annotation_id);


--
-- Name: recommend_recommended_webpage_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY recommend
    ADD CONSTRAINT recommend_recommended_webpage_id_fkey FOREIGN KEY (recommended_webpage_id) REFERENCES webpage(webpage_id);


--
-- Name: scope_anchor_text_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY scope
    ADD CONSTRAINT scope_anchor_text_id_fkey FOREIGN KEY (anchor_text_id) REFERENCES anchor_text(anchor_text_id);


--
-- Name: scope_webpage_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY scope
    ADD CONSTRAINT scope_webpage_id_fkey FOREIGN KEY (webpage_id) REFERENCES webpage(webpage_id);


--
-- Name: score_annotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: kals
--

ALTER TABLE ONLY score
    ADD CONSTRAINT score_annotation_id_fkey FOREIGN KEY (annotation_id) REFERENCES annotation(annotation_id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: annotation2anchor_text; Type: ACL; Schema: public; Owner: kals
--

REVOKE ALL ON TABLE annotation2anchor_text FROM PUBLIC;
REVOKE ALL ON TABLE annotation2anchor_text FROM kals;
GRANT ALL ON TABLE annotation2anchor_text TO kals;
GRANT ALL ON TABLE annotation2anchor_text TO postgres;
GRANT SELECT ON TABLE annotation2anchor_text TO PUBLIC;


--
-- Name: annotation2like_count; Type: ACL; Schema: public; Owner: kals
--

REVOKE ALL ON TABLE annotation2like_count FROM PUBLIC;
REVOKE ALL ON TABLE annotation2like_count FROM kals;
GRANT ALL ON TABLE annotation2like_count TO kals;
GRANT ALL ON TABLE annotation2like_count TO postgres;
GRANT SELECT ON TABLE annotation2like_count TO PUBLIC;


--
-- Name: annotation2respond_count; Type: ACL; Schema: public; Owner: kals
--

REVOKE ALL ON TABLE annotation2respond_count FROM PUBLIC;
REVOKE ALL ON TABLE annotation2respond_count FROM kals;
GRANT ALL ON TABLE annotation2respond_count TO kals;
GRANT ALL ON TABLE annotation2respond_count TO postgres;
GRANT SELECT ON TABLE annotation2respond_count TO PUBLIC;


--
-- PostgreSQL database dump complete
--

