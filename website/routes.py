import json, datetime
from flask import jsonify, request, Blueprint, session
from flask_cors import cross_origin
from website import db
from website.models import User
from werkzeug.security import generate_password_hash, check_password_hash

routes = Blueprint('routes',__name__)


######################parteneri###########################


@cross_origin
@routes.route('/start_finding_partner', methods = ["POST"])
def start_finding_partner():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error":"unauthorized"}), 401

    user = User.query.filter_by(id = user_id).first()


    other_user_searching = User.query.filter_by(is_searching = True).filter(User.email != user.email).first()
    if not other_user_searching or other_user_searching.city != user.city:
        user.is_searching = True
        db.session.commit()
        
    elif user.email != other_user_searching.email:
        other_user_searching.is_searching = False
        user.is_searching = False
        other_user_searching.partner_id = user.id
        user.partner_id = other_user_searching.id

        file = open("./website/meetings.json")
        
        json_data = json.loads(file.read())
        date = str(datetime.datetime.now().year) + "-" + str(datetime.datetime.now().month) + "-" + str(datetime.datetime.now().day + 7) + " " + str( datetime.datetime.now().hour) + ":"+  str(datetime.datetime.now().minute)


        user.meeting_location = json_data[user.city]['nameOfTheLocation']
        user.meeting_coords = json_data[user.city]['location']
        user.meeting_lng = json_data[user.city]['lng']
        user.meeting_lat = json_data[user.city]['lat']
        user.meeting_date = date

        

        other_user_searching.meeting_location = json_data[user.city]['nameOfTheLocation']
        other_user_searching.meeting_coords = json_data[user.city]['location']
        other_user_searching.meeting_lng = json_data[user.city]['lng']
        other_user_searching.meeting_lat = json_data[user.city]['lat']
        other_user_searching.meeting_date = date 


        db.session.commit()

    print("3")
    return "200"

@cross_origin
@routes.route('/stop_finding_partner', methods = ["POST"])
def stop_finding_partner():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error":"unauthorized"}), 401

    user = User.query.filter_by(id = user_id).first()
    user.is_searching = False
    db.session.commit()
    return "200"

@cross_origin
@routes.route('/abandon_partner', methods = ["POST"])
def abandon_partner():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error":"unauthorized"}), 401

    user = User.query.filter_by(id = user_id).first()
    partner = User.query.filter_by(id = user.partner_id).first()

    user.is_searching = False
    user.partner_id = 0
    user.meeting_location = ""
    user.meeting_coords = ""
    user.meeting_lng = ""
    user.meeting_lat = ""
    user.meeting_date = ""

    partner.is_searching = False
    partner.partner_id = 0
    partner.meeting_location = ""
    partner.meeting_coords = ""
    partner.meeting_lng = ""
    partner.meeting_lat = ""
    partner.meeting_date = ""
    db.session.commit()

    return "200"






#########################auth############################

@cross_origin
@routes.route('/@me')
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error":"unauthorized"}), 401

    user = User.query.filter_by(id = user_id).first()
    return jsonify({"id": user.id, "name" : user.name, "partner_id":user.partner_id, "is_searching": user.is_searching, "details": user.description, "gender":user.gender, "age":user.age, "city":user.city, "meeting_location":user.meeting_location, "meeting_coords":user.meeting_coords, "meeting_lng":user.meeting_lng, "meeting_lat":user.meeting_lat , "meeting_date":user.meeting_date}) 


@cross_origin
@routes.route('/@user/<user_id>')
def get_user(user_id):
    print(user_id)
    if not user_id:
        return jsonify({"error":"unauthorized"}), 401

    user = User.query.filter_by(id = user_id).first()
    return jsonify({"id": user.id, "name" : user.name, "partner_id":user.partner_id, "is_searching": user.is_searching, "details": user.description, "gender":user.gender, "age":user.age, "city":user.city, "meeting_location":user.meeting_location, "meeting_coords":user.meeting_coords,"meeting_lng":user.meeting_lng, "meeting_lat":user.meeting_lat , "meeting_date":user.meeting_date}) 


@cross_origin
@routes.route('/update_account', methods = ['POST'])
def update_account():
    user_id = session.get("user_id")

    username = str(request.json['username'])
    details = str(request.json['details'])
    city = str(request.json['city'])
    
    user = User.query.filter_by(id = user_id).first()

    if not user:
        return jsonify({"error":"Unauthorized"}), 401

    if len(username) < 5 or len(details) < 20:
        return jsonify({"error":"username or description too small"}),

    user.name = username
    user.description = details
    user.city = city
    db.session.commit()

    return "200"



@cross_origin
@routes.route('/login', methods = ['POST'])
def login():
    email = str(request.json['email'])
    password = str(request.json['password'])
    
    user = User.query.filter_by(email = email).first()

    if not user:
        return jsonify({"error":"User not found!"})

    if check_password_hash(user.password, password):
        session['user_id'] = user.id

        return jsonify({"id": user.id, "name" : user.name})
    else:
        print("password incorect")
        return jsonify({"error":"Email or password incorect!"})  

        
@cross_origin
@routes.route('/signup', methods = ['POST'])
def sign_up():
    print("try to create new account")
    email = str(request.json['email'])
    
    username = str(request.json['username'])
    password = str(request.json['password'])
    repeat_password = str(request.json['repeat_password'])
    details = str(request.json['details'])   
    age = int(request.json['age'])
    gender = str(request.json['gender'])
    city = str(request.json['city'])

    user = User.query.filter_by(email = email).first()
    print(city)

    if user:
        return jsonify({"error":"User already exits!"})
    else:

        if password != repeat_password:
            return jsonify({"error":"Passwords didn't match!"})

        if len(password) < 4:
            return jsonify({"error":"Password too small!"})

        if len(username) < 4:
            return jsonify({"error":"Username too small!"})

        if len(details) < 4:
            return jsonify({"error":"Description too small!"})

        if not "@" in email or not ".com" in email:
            return jsonify({"error":"Email is wrong typed!"})

        new_user = User(email = email, name = username, password = generate_password_hash(password), description = details, age = age, gender = gender, partner_id = 0, is_searching = False, city = city, meeting_location="", meeting_coords = "",meeting_lng = "", meeting_lat ="", meeting_date = "")
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"id": new_user.id, "email" : new_user.email}),200


@cross_origin
@routes.route('/logout', methods =['POST'])
def logout():
    session.pop("user_id")
    return "200"