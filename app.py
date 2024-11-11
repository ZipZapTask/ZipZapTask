from flask import Flask, render_template
from data.team_members import team_members
from data.routes import routes

app = Flask(__name__)

@app.context_processor
def inject_nav_items():
    return dict(nav_items=routes)

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/profile')
def profile():
    return render_template("profile.html", team_members=team_members)

if __name__ == '__main__':
    app.run()
