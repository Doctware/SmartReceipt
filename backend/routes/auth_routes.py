#!/usr/bin/env python3
""" this module contain the authentication routes """
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.users import User
from app import db


auth_bp = Blueprint('auth_bp', __name__)


@auth_bp.route('/login', methods=['POST'])
def login():
    """authenticating user and return a JWT """
    data = request.json
    emial = data.get('email')
    password = data.get('password')

    # find user email
    user = User.query.filter_by(emial=emial).first()

    if user and user.check_password(password):
        # create jwt
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token}), 200
    
    return jsonify({"error": "Invalid creddentials, are you a smart user?"})

@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    """ inisiating protection on routes """
    user_id = get_jwt_identity()
    return jsonify({"message": f"Hi!! smart user {user_id}!"}), 200
