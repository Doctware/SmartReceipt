#!/usr/bin/env python3
""" the app runner """

from app import db, create_app
app = create_app()
if __name__ == "__main__":

    with app.app_context():
        db.create_all()
        print("table create successfully")

    # running flask app
    app.run(host='0.0.0.0', port=5003, debug=True)
