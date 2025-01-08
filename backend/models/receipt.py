#!/usr/bin/env python3
""" the module contains receipt model """
from datetime import datetime
from app import db
import uuid


class Receipt(db.Model):
    """ the receipt model """
    __tablename__ = 'receipts'

    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    item_name = db.Column(db.String(120), nullable=False)
    amount = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(200), nullable=True)
    date_sold = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    business_name = db.Column(db.String(120), nullable=True)
    address = db.Column(db.String(250), nullable=False)
    access_code = db.Column(db.String(8), unique=True, nullable=False)
    buyer_signature = db.Column(db.String(120), nullable=True)
    locked = db.Column(db.Boolean, default=False, nullable=False)

    seller_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)

    def __init__(self, item_name, amount, description, address, seller_id, business_name=None):
        """ insialzing provided input """

        self.item_name = item_name
        self.amount = amount
        self.description = description
        self.address= address
        self.seller_id = seller_id
        self.businaess_name = business_name
        self.access_code = self.generate_access_code()

    def generate_access_code(self):
        """ Generate a unique 8-caharcter access code. """
        return str(uuid.uuid4())[:8]

    def lock_receipt(self):
        """ locking receipt to prevent futher editing """
        self.locked = True
