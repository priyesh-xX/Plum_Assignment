--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2025-07-01 18:25:20

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "Gnosis";
--
-- TOC entry 3368 (class 1262 OID 24672)
-- Name: Gnosis; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Gnosis" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE "Gnosis" OWNER TO postgres;

\connect "Gnosis"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 24730)
-- Name: news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.news OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24729)
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.news_id_seq OWNER TO postgres;

--
-- TOC entry 3369 (class 0 OID 0)
-- Dependencies: 220
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- TOC entry 217 (class 1259 OID 24705)
-- Name: practice_quizzes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.practice_quizzes (
    id integer NOT NULL,
    title text NOT NULL,
    topic text NOT NULL,
    file_url text NOT NULL,
    description text,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT practice_quizzes_topic_check CHECK ((topic = ANY (ARRAY['MELA'::text, 'SPORTS'::text, 'INDIA'::text, 'GEN'::text, 'BIZTECH'::text, 'OTHERS'::text])))
);


ALTER TABLE public.practice_quizzes OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 24704)
-- Name: practice_quizzes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.practice_quizzes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.practice_quizzes_id_seq OWNER TO postgres;

--
-- TOC entry 3370 (class 0 OID 0)
-- Dependencies: 216
-- Name: practice_quizzes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.practice_quizzes_id_seq OWNED BY public.practice_quizzes.id;


--
-- TOC entry 219 (class 1259 OID 24716)
-- Name: user_xp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_xp (
    id integer NOT NULL,
    user_id integer,
    xp integer DEFAULT 0,
    level integer DEFAULT 1
);


ALTER TABLE public.user_xp OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24715)
-- Name: user_xp_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_xp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_xp_id_seq OWNER TO postgres;

--
-- TOC entry 3371 (class 0 OID 0)
-- Dependencies: 218
-- Name: user_xp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_xp_id_seq OWNED BY public.user_xp.id;


--
-- TOC entry 215 (class 1259 OID 24674)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    xp integer DEFAULT 0
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 24673)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3372 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3197 (class 2604 OID 24733)
-- Name: news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- TOC entry 3192 (class 2604 OID 24708)
-- Name: practice_quizzes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.practice_quizzes ALTER COLUMN id SET DEFAULT nextval('public.practice_quizzes_id_seq'::regclass);


--
-- TOC entry 3194 (class 2604 OID 24719)
-- Name: user_xp id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_xp ALTER COLUMN id SET DEFAULT nextval('public.user_xp_id_seq'::regclass);


--
-- TOC entry 3188 (class 2604 OID 24677)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3362 (class 0 OID 24730)
-- Dependencies: 221
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.news VALUES (1, 'New Quiz Categories Added!', 'We have added 5 new quiz categories like Astronomy and World History.', '2025-07-01 16:31:21.486357');
INSERT INTO public.news VALUES (2, 'Upcoming Quiz Club Meet!', 'Join us this Friday for an exciting discussion on quizzing.', '2025-07-01 16:31:21.486357');
INSERT INTO public.news VALUES (3, 'Winners Announced', 'Team Brainiacs have won the intercollege quiz championship!', '2025-07-01 16:31:21.486357');
INSERT INTO public.news VALUES (4, 'New Feature Announcement', 'We''re launching a new leaderboard system this weekend!', '2025-07-01 16:35:26.521462');


--
-- TOC entry 3358 (class 0 OID 24705)
-- Dependencies: 217
-- Data for Name: practice_quizzes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.practice_quizzes VALUES (1, 'IPL 2023 Archives', 'SPORTS', 'https://drive.google.com/file/d/ipl2023quiz', 'Quiz set based on IPL 2023', '2025-05-06 11:41:04.166885');
INSERT INTO public.practice_quizzes VALUES (2, 'Startup India Set', 'BIZTECH', 'https://drive.google.com/file/d/biztechstartups', 'Quiz set on startups and unicorns in India', '2025-05-06 11:41:04.166885');
INSERT INTO public.practice_quizzes VALUES (3, 'Freedom Fighters', 'INDIA', 'https://drive.google.com/file/d/indianfreedom', 'Quiz on Indian independence movement', '2025-05-06 11:41:04.166885');
INSERT INTO public.practice_quizzes VALUES (5, 'Mixed Bag - 2022', 'GEN', 'https://drive.google.com/file/d/mixedbag2022', 'General trivia from 2022', '2025-05-06 11:41:04.166885');
INSERT INTO public.practice_quizzes VALUES (6, 'SpaceX Launches', 'OTHERS', 'https://drive.google.com/file/d/spacexlaunches', 'Quirky quiz on modern space tech', '2025-05-06 11:41:04.166885');
INSERT INTO public.practice_quizzes VALUES (7, 'MELA Archive Set 2023', 'MELA', 'https://example.com/mela-set.pdf', NULL, '2025-05-06 11:51:52.866002');
INSERT INTO public.practice_quizzes VALUES (13, 'testing quiz', 'GEN', 'https://example.com/test-set.pdf', 'new testing', '2025-05-06 12:29:06.813577');
INSERT INTO public.practice_quizzes VALUES (4, 'Festival Mania', 'MELA', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'Quiz covering Indian fairs and festivals', '2025-05-06 11:41:04.166885');
INSERT INTO public.practice_quizzes VALUES (14, 'MELA Dummy Quiz Set', 'MELA', 'https://www.africau.edu/images/default/sample.pdf', 'Sample test PDF to verify quiz opening', '2025-06-21 14:17:12.266293');


--
-- TOC entry 3360 (class 0 OID 24716)
-- Dependencies: 219
-- Data for Name: user_xp; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_xp VALUES (3, 3, 8860, 89);
INSERT INTO public.user_xp VALUES (5, 5, 80, 1);


--
-- TOC entry 3356 (class 0 OID 24674)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (3, 'updateduser22', 'updatedemail@example.com', 'newpassword123', 'user', '2025-04-23 01:03:53.33824', 0);
INSERT INTO public.users VALUES (6, 'Bob', 'bob@example.com', '4535435', 'user', '2025-06-07 15:47:32.668807', 0);
INSERT INTO public.users VALUES (7, 'Charlie', 'charlie@example.com', '324324', 'user', '2025-06-07 15:47:32.668807', 0);
INSERT INTO public.users VALUES (5, 'Alice', 'alic2e@example.com', '12344', 'user', '2025-06-07 15:47:32.668807', 0);


--
-- TOC entry 3373 (class 0 OID 0)
-- Dependencies: 220
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 4, true);


--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 216
-- Name: practice_quizzes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.practice_quizzes_id_seq', 14, true);


--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 218
-- Name: user_xp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_xp_id_seq', 8, true);


--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- TOC entry 3211 (class 2606 OID 24738)
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


--
-- TOC entry 3207 (class 2606 OID 24714)
-- Name: practice_quizzes practice_quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.practice_quizzes
    ADD CONSTRAINT practice_quizzes_pkey PRIMARY KEY (id);


--
-- TOC entry 3209 (class 2606 OID 24723)
-- Name: user_xp user_xp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_xp
    ADD CONSTRAINT user_xp_pkey PRIMARY KEY (id);


--
-- TOC entry 3201 (class 2606 OID 24687)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3203 (class 2606 OID 24683)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3205 (class 2606 OID 24685)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 3212 (class 2606 OID 24724)
-- Name: user_xp user_xp_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_xp
    ADD CONSTRAINT user_xp_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2025-07-01 18:25:21

--
-- PostgreSQL database dump complete
--

