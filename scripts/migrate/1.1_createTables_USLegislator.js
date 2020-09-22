module.exports = {
  seq: 1.1,
  label: 'create US Legislator tables',
  sql: `
    DROP TABLE IF EXISTS us_legislator_bio;
    CREATE TABLE us_legislator_bio
    (
        id UUID DEFAULT uuid_generate_v1(),
        bioguide_id VARCHAR(10) UNIQUE NOT NULL,
        gender varchar(1) NOT NULL,
        birthday date,
        religion text,
        PRIMARY KEY (id)
    );

    DROP TABLE IF EXISTS us_legislator_id;
    CREATE TABLE us_legislator_id
    (
        id UUID DEFAULT uuid_generate_v1(),
        bioguide_id VARCHAR(10) UNIQUE NOT NULL,
        fec jsonb,
        lis text,
        cspan integer,
        icpsr integer,
        thomas integer,
        govtrack integer,
        maplight integer,
        wikidata text,
        votesmart integer,
        wikipedia text,
        ballotpedia text,
        opensecrets text,
        house_history bigint,
        google_entity_id text,
        PRIMARY KEY (id)
    );  

    DROP TABLE IF EXISTS us_legislator_json;
    CREATE TABLE us_legislator_json
    (
        id UUID DEFAULT uuid_generate_v1(),
        bioguide_id VARCHAR(10) UNIQUE NOT NULL,
        id_json JSONB NOT NULL,
        name_json JSONB NOT NULL,
        bio_json JSONB NOT NULL,
        terms_json JSONB NOT NULL,
        PRIMARY KEY (id),
        UNIQUE (bioguide_id)
    );
    
    DROP TABLE IF EXISTS us_legislator_name;
    CREATE TABLE us_legislator_name
    (
        id UUID DEFAULT uuid_generate_v1(),
        bioguide_id VARCHAR(10) UNIQUE NOT NULL,
        last text NOT NULL,
        first text NOT NULL,
        middle text,
        suffix VARCHAR(4),
        nickname text,
        official_full text,
        PRIMARY KEY (id)
    );
    
    DROP TABLE IF EXISTS us_legislator_term;
    CREATE TABLE us_legislator_term
    (
        id UUID DEFAULT uuid_generate_v1(),
        bioguide_id VARCHAR(10) NOT NULL,
        type VARCHAR(3) NOT NULL,
        start_date date NOT NULL,
        end_date date NOT NULL,
        party text,
        state varchar(2) NOT NULL,
        district integer,
        class integer,
        state_rank varchar(6),
        phone text,
        fax text,
        office text,
        address text,
        contact_form text,
        url text,
        rss_url text,
        PRIMARY KEY (id)
    );
  `
}
