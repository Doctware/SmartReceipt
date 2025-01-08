#!/usr/bin/env python3
""" this module contains the receipt rout """
from flask import Blueprint, jsonify, request
from flask_limiter.util import get_remote_address
from flask_limiter import Limiter
from models.receipt import Receipt
from models.users import User
from app import db, limiter
import uuid
from flask_jwt_extended import jwt_required, get_jwt_identity


receipt_bp = Blueprint('receipt_bp', __name__)
limiter = Limiter(key_func=get_remote_address)


@limiter.limit('15 per minute')
@receipt_bp.route('/create', methods=['POST'])
@jwt_required()
def create_receipt():
    """ creating new receipt """
    data = request.get_json()
    required_fields = ['item_name', 'amount', 'address', 'seller_id']

    # validate require field
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"Misding field or empty: {field}"}), 400

    item_name = data.get('item_name')
    amount = data.get('amount')
    description = data.get('description', None)
    address = data.get('address')
    seller_id = data.get('seller_id')
    business_name = data.get('business_name')

    # validating user existence
    seller = User.query.get(seller_id)
    if not seller:
        return jsonify({"error": "Ops!! your'e not a smart user"})

    # now creating receipt if above condtions met
    try:
        receipt = Receipt(
                item_name=item_name,
                amount=amount,
                description=description,
                address=address,
                seller_id=seller_id,
                business_name=business_name
        )
        db.session.add(receipt)
        db.session.commit()

        return jsonify({
            "message": "Smart!!, Reciept, created successfully",
            "receipt_id": receipt.id,
            "access_code": receipt.access_code
        }), 201

    except Exception as err:
        db.session.rollback()
        return jsonify({"error": str(err)}), 500

""" veiwing recept with access code """
@limiter.limit('20 per minute')
@receipt_bp.route('/receipt/view/<access_code>', methods=['GET'])
def view_receipt(access_code):
    """ this function is used to view receipt """
    receipt = Receipt.query.filter_by(access_code=access_code).first()

    if not receipt:
        return jsonify({"error": "Reciept not found"}), 404

    return jsonify({
        "item_name": receipt.item_name,
        "date_sold": receipt.date_sold,
        "business_name": receipt.business_name,
        "address": receipt.address,
        "buyer_signature": receipt.buyer_signature,
        "locked": receipt.locked
    }), 200

""" now locking generated receipt """
@limiter.limit('10 per minute')
@receipt_bp.route('/receipt/lock/<access_code>', methods=['PATCH'])
@jwt_required()
def lock_recept(access_code):
    """ this function is use to lock the receipt """
    receipt = Receipt.query.filter_by(access_code=access_code).first()

    if not receipt:
        return jsonify({"error": "receipt not found"}), 404

    if receipt.locked:
        return jsonify({"error": "receipt already locked"}), 400

    # lock receipt
    try:
        receipt.lock_receipt()
        db.session.commit()
        return jsonify({"message": "Receipt Locked successfully"}), 200
    except Exception as err:
        return jsonify({"error": str(err)}), 500
