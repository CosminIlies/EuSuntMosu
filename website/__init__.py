from os import path
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_cors import CORS
import redis

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, static_folder = '../client/build', static_url_path ='')
    

    app.config['SECRET_KEY']= 'p8a6633359154493bed21f5808705a0345695c12d1c3787fcc0e75eba96b693f8'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    #app.config['SESSION_TYPE'] = 'redis'
    #app.config['SESSION_PERMANENT'] = False
    #app.config['SESSION_USE_SIGNER'] = True
    #app.config['SESSION_REDIS'] = redis.from_url("redis://:p8a6633359154493bed21f5808705a0345695c12d1c3787fcc0e75eba96b693f8@ec2-3-213-110-189.compute-1.amazonaws.com:9140")
    

    app.config['SESSION_TYPE'] = 'filesystem'
    app.config['SESSION_PERMANENT'] = False

    CORS(app)
    server_session = Session(app)

    db.init_app(app)

    from website.routes import routes
    app.register_blueprint(routes)

    from .models import User

    create_database(app)


    return app

def create_database(app):
    if not path.exists('website/database.db'):
        db.create_all(app=app)
        print('Database created!')