-- Clean Gnosis Database Schema (without database creation)
-- Run this after creating the 'Gnosis' database

-- General Settings
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

-- Default Storage Settings
SET default_tablespace = '';
SET default_table_access_method = heap;

-- USERS TABLE
CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) DEFAULT 'user'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    xp integer DEFAULT 0
);

CREATE SEQUENCE public.users_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

-- PRACTICE_QUIZZES TABLE
CREATE TABLE public.practice_quizzes (
    id integer NOT NULL,
    title text NOT NULL,
    topic text NOT NULL,
    file_url text NOT NULL,
    description text,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT practice_quizzes_topic_check CHECK ((topic = ANY (ARRAY['MELA', 'SPORTS', 'INDIA', 'GEN', 'BIZTECH', 'OTHERS'])))
);

CREATE SEQUENCE public.practice_quizzes_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE public.practice_quizzes_id_seq OWNED BY public.practice_quizzes.id;
ALTER TABLE ONLY public.practice_quizzes ALTER COLUMN id SET DEFAULT nextval('public.practice_quizzes_id_seq'::regclass);

-- USER_XP TABLE
CREATE TABLE public.user_xp (
    id integer NOT NULL,
    user_id integer,
    xp integer DEFAULT 0,
    level integer DEFAULT 1
);

CREATE SEQUENCE public.user_xp_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE public.user_xp_id_seq OWNED BY public.user_xp.id;
ALTER TABLE ONLY public.user_xp ALTER COLUMN id SET DEFAULT nextval('public.user_xp_id_seq'::regclass);

-- NEWS TABLE
CREATE TABLE public.news (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE SEQUENCE public.news_id_seq
    START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;
ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);

-- PRIMARY KEYS & CONSTRAINTS
ALTER TABLE ONLY public.users ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users ADD CONSTRAINT users_username_key UNIQUE (username);

ALTER TABLE ONLY public.practice_quizzes ADD CONSTRAINT practice_quizzes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_xp ADD CONSTRAINT user_xp_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.news ADD CONSTRAINT news_pkey PRIMARY KEY (id);

-- FOREIGN KEYS
ALTER TABLE ONLY public.user_xp
    ADD CONSTRAINT user_xp_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- SAMPLE DATA
-- ✅ 1 test user
INSERT INTO public.users (username, email, password, role, created_at, xp)
VALUES ('testuser', 'test@example.com', 'testpassword', 'user', NOW(), 100);

-- ✅ 1 XP row for testuser
INSERT INTO public.user_xp (user_id, xp, level)
VALUES (1, 100, 2);

-- ✅ Quizzes
INSERT INTO public.practice_quizzes (title, topic, file_url, description, uploaded_at) VALUES
('IPL 2023 Archives', 'SPORTS', 'https://drive.google.com/file/d/ipl2023quiz', 'Quiz set based on IPL 2023', NOW()),
('Startup India Set', 'BIZTECH', 'https://drive.google.com/file/d/biztechstartups', 'Quiz set on startups and unicorns in India', NOW()),
('Freedom Fighters', 'INDIA', 'https://drive.google.com/file/d/indianfreedom', 'Quiz on Indian independence movement', NOW()),
('Festival Mania', 'MELA', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'Quiz covering Indian fairs and festivals', NOW()),
('Mixed Bag - 2022', 'GEN', 'https://drive.google.com/file/d/mixedbag2022', 'General trivia from 2022', NOW()),
('SpaceX Launches', 'OTHERS', 'https://drive.google.com/file/d/spacexlaunches', 'Quirky quiz on modern space tech', NOW());

-- ✅ News
INSERT INTO public.news (title, content, date) VALUES
('New Quiz Categories Added!', 'We have added 5 new quiz categories like Astronomy and World History.', NOW()),
('Upcoming Quiz Club Meet!', 'Join us this Friday for an exciting discussion on quizzing.', NOW()),
('Winners Announced', 'Team Brainiacs have won the intercollege quiz championship!', NOW()),
('New Feature Announcement', 'We''re launching a new leaderboard system this weekend!', NOW());

-- ✅ Fix sequences (critical)
SELECT pg_catalog.setval('public.users_id_seq', (SELECT MAX(id) FROM public.users), true);
SELECT pg_catalog.setval('public.user_xp_id_seq', (SELECT MAX(id) FROM public.user_xp), true);
SELECT pg_catalog.setval('public.practice_quizzes_id_seq', (SELECT MAX(id) FROM public.practice_quizzes), true);
SELECT pg_catalog.setval('public.news_id_seq', (SELECT MAX(id) FROM public.news), true);
