

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE asl_signs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT,
  reference_image TEXT,
  reference_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE test_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  score_percentage INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT fk_test_attempt_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE test_sign_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  test_attempt_id UUID NOT NULL,
  sign_id UUID NOT NULL,
  is_correct BOOLEAN NOT NULL,

  CONSTRAINT fk_result_attempt
    FOREIGN KEY (test_attempt_id)
    REFERENCES test_attempts(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_result_sign
    FOREIGN KEY (sign_id)
    REFERENCES asl_signs(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_test_attempts_user_id
  ON test_attempts(user_id);

CREATE INDEX idx_test_sign_results_attempt_id
  ON test_sign_results(test_attempt_id);

CREATE INDEX idx_test_sign_results_sign_id
  ON test_sign_results(sign_id);
