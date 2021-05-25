module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
<<<<<<< HEAD
    REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL || "http://localhost:8000",
    CLIENT_ORIGIN: 'https://pick-me-up-app.vercel.app/',
=======
>>>>>>> 5a6a73339ad65d134be505f0d5928ce0a9b587c8
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/pick-me-upp',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost/pick-me-upp-test',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
  }