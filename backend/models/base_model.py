#!/usr/bin/env python3
"""  the base model """
from datetime import datetime
from app import db


class BaseModel(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(
            db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
            )
