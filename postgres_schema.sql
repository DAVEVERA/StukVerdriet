-- Create episodes table
CREATE TABLE IF NOT EXISTS episodes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    audio_url TEXT NOT NULL,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Create episode_tag many-to-many relationship table
CREATE TABLE IF NOT EXISTS episode_tag (
    episode_id INTEGER REFERENCES episodes(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (episode_id, tag_id)
);

-- Create bijsluiter_items table
CREATE TABLE IF NOT EXISTS bijsluiter_items (
    id SERIAL PRIMARY KEY,
    text VARCHAR(250) NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_episodes_published_at ON episodes(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);
CREATE INDEX IF NOT EXISTS idx_bijsluiter_approved ON bijsluiter_items(is_approved);
