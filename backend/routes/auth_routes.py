#!/usr/bin/env python3
"""This module contains the authentication routes."""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.users import User
from app import db

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """Authenticating user and returning a JWT."""
    data = request.json

    # Validate input
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Find user by email
    user = User.query.filter_by(email=email).first()

    # Check password and generate token
    if user and user.check_password(password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"access_token": access_token}), 200

    return jsonify({"error": "Invalid credentials, are you a smart user?"}), 401


@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    """Initiating protection on routes."""
    user_id = get_jwt_identity()
    return jsonify({"message": f"Hi!! smart user {user_id}!"}), 200
