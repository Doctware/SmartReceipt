#!/usr/bin/env python3
""" the registration form """
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired, Email, Length


class RegistrationForm(FlaskForm):
    class Meta:
        csrf = False
    """ the registration form class """
    full_name = StringField('Full Name', validators=[InputRequired(), Length(max=120)])
    business_name = StringField('Business Name', validators=[Length(max=120)])
    address = StringField('Address', validators=[InputRequired(), Length(max=250)])
    po_box = StringField('PO Box', validators=[Length(max=50)])
    email = StringField('Email', validators=[InputRequired(), Email(), Length(max=120)])
    passwd = PasswordField('Password', validators=[InputRequired()])
