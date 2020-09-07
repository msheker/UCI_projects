from flask import Flask, jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from datetime import date, timedelta

def convert_date(d):
    return [int(d.split("-")[0]),int(d.split("-")[1]),int(d.split("-")[2])]

eng = create_engine("sqlite:///Resources/hawaii.sqlite")
s = Session(bind=eng)

B = automap_base()
B.prepare(eng, reflect=True)
meas = B.classes.measurement
stat = B.classes.station

app = Flask(__name__)



@app.route("/")
def index():
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/[start]<br/>"
        f"/api/v1.0/[start]/[end]<br/>"
    )

@app.route("/api/v1.0/precipitation")
def precipitation():
    res = dict()
    recent = date(1000,1,1)

    sel = [meas.date, func.sum(meas.prcp)]
    for x in s.query(*sel).group_by(meas.date).order_by(meas.date.desc()).all():
        cur = date(*convert_date(x[0]))
        if  cur > recent:
            recent = cur
        if recent - timedelta(days=365) >= cur:
            break
        res[x[0]] = x[1]
    return jsonify(res)

@app.route("/api/v1.0/stations")
def stations():
    res = []
    for x in s.query(stat.name).all():
        res.append(x)
    return jsonify(res)

@app.route("/api/v1.0/tobs")
def tobs():
    res = dict()
    recent = date(1000,1,1)

    sel = [meas.date, meas.tobs]
    for x in s.query(*sel).filter(meas.station == 'USC00519281').group_by(meas.date).order_by(meas.date.desc()).all():
        cur = date(*convert_date(x[0]))
        if  cur > recent:
            recent = cur
        if recent - timedelta(days=365) >= cur:
            break
        res[x[0]] = x[1]
    return jsonify(res)

@app.route("/api/v1.0/<start>/<end>")
def f(start, end):
    sel = [func.min(meas.tobs),func.avg(meas.tobs), func.max(meas.tobs)]

    res = []
    for x in s.query(*sel).filter(meas.date <= date(*convert_date(end))).filter(meas.date >= date(*convert_date(start))).all():

        res.append(x)
    return jsonify(res)

@app.route("/api/v1.0/<start>")
def f2(start):
    return f(start, "2017-8-23")


if __name__ == '__main__':
    app.run(debug=True)
