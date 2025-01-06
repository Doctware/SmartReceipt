#!/usr/bin/env python3
"""This module contains the authentication routes."""
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.users import User
from app import db

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Registering a new user."""
    data = request.json

    # Validate input
    full_name = data.get('full_name')
    business_name = data.get('business_name', None)
    address = data.get('address')
    po_box = data.get('po_box', None)
    email = data.get('email')
    password = data.get('password')

    # Validate all required fields
    if not full_name or not address or not email or not password:
        return jsonify({"error": "Full name, address, email, and password are required"}), 400

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    # Create new user
    new_user = User(
        full_name=full_name,
        business_name=business_name,
        address=address,
        po_box=po_box,
        email=email
    )
    new_user.set_password(password)  # Hash the password before saving it

    # Save to database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201


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
