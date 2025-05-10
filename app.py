from flask import Flask, render_template, jsonify, request
from models import House, Roommate  # SQLAlchemy models
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from config import Config
from models import db  # single SQLAlchemy instance

app = Flask(__name__)
app.config.from_object('config.Config')
db = SQLAlchemy(app)

@app.route('/')
def home():
    houses = House.query.all()
    # Prepare geo-data for map
    house_data = [
        {'id': h.id, 'lat': h.lat, 'lng': h.lng, 'title': h.title}
        for h in houses
    ]
    return render_template('home.html', houses=house_data)

@app.route('/house/<int:house_id>')
def detail(house_id):
    house = House.query.get_or_404(house_id)
    return render_template('detail.html', house=house)

@app.route('/api/roommates')
def roommates_api():
    # Return JSON list of roommates
    rms = Roommate.query.all()
    return jsonify([
        {'id': r.id, 'name': r.name, 'age': r.age, 'photo_url': r.photo_url}
        for r in rms
    ])

@app.route('/swipe')
def swipe():
    return render_template('swipe.html')

if __name__ == '__main__':
    app.run(debug=True)
