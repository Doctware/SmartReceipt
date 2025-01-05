#!/usr/bin/env python3
""" the Application module """
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS
from flask_login import LoginManager


""" Extentions """
db = SQLAlchemy()
jwt = JWTManager()
bcrypt = Bcrypt()
limiter = Limiter(key_func=get_remote_address, app=None)
login_manager = LoginManager()

def create_app():
    """ creating application """
    app = Flask(__name__)
    app.config.from_object('config.Config')

    # Insializing available extention
    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    limiter.init_app(app)
    CORS(app)
    login_manager.init_app(app)
    login_manager.login_view = 'auth_bp.login'

    """ Registering available blue print """
    from routes.seller_routes import seller_bp
    from routes.auth_routes import auth_bp

    app.register_blueprint(seller_bp, url_prefix='/api/vs1.0/seller')
    app.register_blueprint(auth_bp, url_prefix='/auth')

    return app
