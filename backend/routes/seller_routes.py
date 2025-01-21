#!/usr/bin/env python3
""" the sellers routes """
from flask import Blueprint, jsonify, request
from flask_limiter.util import get_remote_address
from registration_form import RegistrationForm
from models.users import User
from app import db, limiter
import logging


logging.basicConfig(level=logging.ERROR)

seller_bp = Blueprint('seller_bp', __name__)

@limiter.limit('15 per minute', key_func=get_remote_address)
@seller_bp.route('/register', methods=['POST'])
def register_seller():
    """ Register a seller """
    form = RegistrationForm(data=request.json)

    if not form.validate():
        return jsonify({"error": "Ow!! input not valid ⛔", "detail": form.errors}), 400

    """ extrating field """
    full_name = form.full_name.data
    business_name = form.business_name.data
    address = form.address.data
    po_box = form.po_box.data
    email = form.email.data
    passwd = form.passwd.data

    """ checking if emial not on database already """
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "oops! we have your email already 🤩"}), 409

    """ now creating user account if no exception"""
    try:
        user = User(
            full_name = full_name,
            business_name = business_name,
            address = address,
            po_box = po_box,
            email = email,
            passwd = passwd
        )

        user.set_password(passwd)
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "Success you're now a smart user!! ✅"}), 201
    except Exception as err:
        db.session.rollback()
        return jsonify({"error": str(err)}), 500
