#!/usr/bin/env python3
""" the users model """
from app import db, bcrypt
from flask_login import UserMixin
from models.base_model import BaseModel


class User(BaseModel, UserMixin):
    __tablename__ = 'users'

    """ creating users model """
    full_name = db.Column(db.String(120), nullable=False)
    business_name = db.Column(db.String(120), nullable=True)
    address = db.Column(db.String(250), nullable=False)
    po_box = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    passwd = db.Column(db.String(128), nullable=False)


    def set_password(self, password):
        """ setting Hashed password """
        self.passwd = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        """ validating the provided password """
        return bcrypt.check_password_hash(self.passwd, password)
