import os

class Config:
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY', 'you-will-never-guess')

    # SQLAlchemy settings
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        'sqlite:///db.sqlite'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Pagination
    HOUSES_PER_PAGE = int(os.environ.get('HOUSES_PER_PAGE', 10))
    ROOMMATES_PER_PAGE = int(os.environ.get('ROOMMATES_PER_PAGE', 20))

    # Geocoding API (optional)
    GEOCODING_API_KEY = os.environ.get('GEOCODING_API_KEY', None)
