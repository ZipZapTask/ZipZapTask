from flask import Flask, render_template

app = Flask(__name__)

@app.context_processor
def inject_nav_items():
    nav_items = [
        {
            'name': 'Home',
            'url': 'home'
        },
        {
            'name': 'Profile',
            'url': 'profile'
        },
        # Add more items here
    ]
    return dict(nav_items=nav_items)  # Now passing the list directly

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/profile')
def profile():
    return render_template("profile.html")


if __name__ == '__main__':
    app.run()
