#!/usr/bin/env python3
""" the module contains receipt model """
from datetime import datetime
from app import db
import uuid


class Receipt(db.Model):
    """ the receipt model """
    __tablename__ = 'receipts'

    id = db.Column(db.String(36), primary_key=True, default=lambda: (uuid.uuid4()))
    item_name = db.Column(db.String(120), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200), nullable=True)
    date_sold = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    business_name = db.Column(db.String(120), nullable=True)
    address = db.Column(db.String(250), nullable=False)
    access_code = db.Column(db.String(8), unique=True, nullable=False)
    buyer_name = db.Column(db.String(120), nullable=False)
    buyer_signature = db.Column(db.Text, nullable=True)  # Use Text for base64 string
    locked = db.Column(db.Boolean, default=False, nullable=False)
    seller_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)

    def __init__(
            self, item_name, amount, description, buyer_name, address, seller_id, buyer_signature, date_sold=None, business_name=None
            ):
        """ initializing provided input """
        self.item_name = item_name
        self.amount = amount
        self.description = description
        self.date_sold = date_sold or datetime.utcnow()
        self.buyer_name = buyer_name
        self.address = address
        self.seller_id = seller_id
        self.business_name = business_name
        self.buyer_signature = buyer_signature
        self.access_code = self.generate_access_code()

    def generate_access_code(self):
        """ Generate a unique 8-character access code. """
        return str(uuid.uuid4())[:8]

    def lock_receipt(self):
        """ Locking receipt to prevent further editing """
        self.locked = True
