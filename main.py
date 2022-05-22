from website import create_app
from flask_cors import cross_origin
from flask.helpers import send_from_directory

app = create_app()

@app.route('/')
@cross_origin()
def serve():
    print("try to access")
    print(app.static_folder)
    return send_from_directory(app.static_folder, 'index.html')


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True, port=5000)
