-- Clean Gnosis Database Schema (without database creation)
-- Run this after creating the 'Gnosis' database

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

-- Create Tables

-- Users table
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
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

-- Practice Quizzes table
CREATE TABLE public.practice_quizzes (
    id integer NOT NULL,
    title text NOT NULL,
    topic text NOT NULL,
    file_url text NOT NULL,
    description text,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT practice_quizzes_topic_check CHECK ((topic = ANY (ARRAY['MELA'::text, 'SPORTS'::text, 'INDIA'::text, 'GEN'::text, 'BIZTECH'::text, 'OTHERS'::text])))
);

CREATE SEQUENCE public.practice_quizzes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.practice_quizzes_id_seq OWNED BY public.practice_quizzes.id;
ALTER TABLE ONLY public.practice_quizzes ALTER COLUMN id SET DEFAULT nextval('public.practice_quizzes_id_seq'::regclass);

-- User XP table
CREATE TABLE public.user_xp (
    id integer NOT NULL,
    user_id integer,
    xp integer DEFAULT 0,
    level integer DEFAULT 1
);

CREATE SEQUENCE public.user_xp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.user_xp_id_seq OWNED BY public.user_xp.id;
ALTER TABLE ONLY public.user_xp ALTER COLUMN id SET DEFAULT nextval('public.user_xp_id_seq'::regclass);

-- News table
CREATE TABLE public.news (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;
ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);

-- Add Primary Keys
ALTER TABLE ONLY public.users ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users ADD CONSTRAINT users_username_key UNIQUE (username);

ALTER TABLE ONLY public.practice_quizzes ADD CONSTRAINT practice_quizzes_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_xp ADD CONSTRAINT user_xp_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.news ADD CONSTRAINT news_pkey PRIMARY KEY (id);

-- Add Foreign Keys
ALTER TABLE ONLY public.user_xp ADD CONSTRAINT user_xp_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Insert Sample Data
INSERT INTO public.users VALUES 
    (3, 'updateduser22', 'updatedemail@example.com', 'newpassword123', 'user', '2025-04-23 01:03:53.33824', 0),
    (5, 'Alice', 'alic2e@example.com', '12344', 'user', '2025-06-07 15:47:32.668807', 0),
    (6, 'Bob', 'bob@example.com', '4535435', 'user', '2025-06-07 15:47:32.668807', 0),
    (7, 'Charlie', 'charlie@example.com', '324324', 'user', '2025-06-07 15:47:32.668807', 0);

INSERT INTO public.practice_quizzes VALUES 
    (1, 'IPL 2023 Archives', 'SPORTS', 'https://drive.google.com/file/d/ipl2023quiz', 'Quiz set based on IPL 2023', '2025-05-06 11:41:04.166885'),
    (2, 'Startup India Set', 'BIZTECH', 'https://drive.google.com/file/d/biztechstartups', 'Quiz set on startups and unicorns in India', '2025-05-06 11:41:04.166885'),
    (3, 'Freedom Fighters', 'INDIA', 'https://drive.google.com/file/d/indianfreedom', 'Quiz on Indian independence movement', '2025-05-06 11:41:04.166885'),
    (4, 'Festival Mania', 'MELA', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'Quiz covering Indian fairs and festivals', '2025-05-06 11:41:04.166885'),
    (5, 'Mixed Bag - 2022', 'GEN', 'https://drive.google.com/file/d/mixedbag2022', 'General trivia from 2022', '2025-05-06 11:41:04.166885'),
    (6, 'SpaceX Launches', 'OTHERS', 'https://drive.google.com/file/d/spacexlaunches', 'Quirky quiz on modern space tech', '2025-05-06 11:41:04.166885'),
    (7, 'MELA Archive Set 2023', 'MELA', 'https://example.com/mela-set.pdf', NULL, '2025-05-06 11:51:52.866002'),
    (13, 'testing quiz', 'GEN', 'https://example.com/test-set.pdf', 'new testing', '2025-05-06 12:29:06.813577'),
    (14, 'MELA Dummy Quiz Set', 'MELA', 'https://www.africau.edu/images/default/sample.pdf', 'Sample test PDF to verify quiz opening', '2025-06-21 14:17:12.266293');

INSERT INTO public.user_xp VALUES 
    (3, 3, 8860, 89),
    (5, 5, 80, 1);

INSERT INTO public.news VALUES 
    (1, 'New Quiz Categories Added!', 'We have added 5 new quiz categories like Astronomy and World History.', '2025-07-01 16:31:21.486357'),
    (2, 'Upcoming Quiz Club Meet!', 'Join us this Friday for an exciting discussion on quizzing.', '2025-07-01 16:31:21.486357'),
    (3, 'Winners Announced', 'Team Brainiacs have won the intercollege quiz championship!', '2025-07-01 16:31:21.486357'),
    (4, 'New Feature Announcement', 'We''re launching a new leaderboard system this weekend!', '2025-07-01 16:35:26.521462');

-- Update sequences to current values
SELECT pg_catalog.setval('public.news_id_seq', 4, true);
SELECT pg_catalog.setval('public.practice_quizzes_id_seq', 14, true);
SELECT pg_catalog.setval('public.user_xp_id_seq', 8, true);
SELECT pg_catalog.setval('public.users_id_seq', 7, true);