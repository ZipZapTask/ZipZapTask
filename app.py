from flask import Flask, render_template
from data.team_members import team_members
from data.routes import routes
from data.wbs_data import converted_data
from data.cost_sections import cost_sections, resources

app = Flask(__name__)

@app.context_processor
def inject_nav_items():
    return dict(nav_items=routes)

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/projectCharter')
def projectCharter():
    return render_template("projectCharter.html")

@app.route('/profile')
def profile():
    return render_template("profile.html", team_members=team_members)

@app.route('/wbs')
def wbs():
    return render_template("wbs.html", wbs_data=converted_data)

@app.route('/costEstimate')
def costEstimate():
    return render_template("costEstimate.html", cost_sections=cost_sections, resources=resources)

@app.route('/gantt')
def gantt():
    return render_template("gantt.html")
    
@app.route('/aoa')
def aoa():
    return render_template("aoa.html")

@app.route('/risk_assessment')
def risk_assessment():
    return render_template('risk.html')


if __name__ == '__main__':
    app.run()
