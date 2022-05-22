from website import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String(100), unique=True)
    name = db.Column(db.String(100))
    password = db.Column(db.String(100))
    description = db.Column(db.String(1000))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(50))
    partner_id = db.Column(db.Integer)
    is_searching= db.Column(db.Boolean)
    city= db.Column(db.String(50))

    meeting_location = db.Column(db.String(100))
    meeting_coords = db.Column(db.String(100))
    meeting_lat = db.Column(db.Integer)
    meeting_lng = db.Column(db.Integer)
    meeting_date = db.Column(db.String(100))
