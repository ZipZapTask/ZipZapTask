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
        {
            'name': 'Project Charter',
            'url': 'projectCharter'
        },
        # Add more items here
    ]
    return dict(nav_items=nav_items)  # Now passing the list directly

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/projectCharter')
def projectCharter():
    return render_template("projectCharter.html")

@app.route('/profile')
def profile():
    team_members = [
        {
            'name': 'Sam Powers',
            'role': 'Project manager',
            'description': 'This is some sample content for the card. You can put any text or additional elements here.',
            'image_url': 'media/team/sam_powers.jpeg'
        },
        {
            'name': 'Vinay Thamara',
            'role': 'Developer',
            'description': 'This is some sample content for the card. You can put any text or additional elements here.',
            'image_url': 'https://placehold.co/100x100'
        },
        {
            'name': 'Sebastian Tovar',
            'role': 'Developer',
            'description': 'This is some sample content for the card. You can put any text or additional elements here.',
            'image_url': 'media/team/sebastian_tovar.jpeg'
        },
        {
            'name': 'Alex Jones',
            'role': 'Developer',
            'description': 'This is some sample content for the card. You can put any text or additional elements here.',
            'image_url': 'media/team/alex_jones.jpeg'
        },
        {
            'name': 'Jaecar Ly',
            'role': 'Designer',
            'description': 'This is some sample content for the card. You can put any text or additional elements here.',
            'image_url': 'media/team/jaecar_ly.jpeg'
        },
        {
            'name': 'Eric Atkins',
            'role': 'Research & Design',
            'description': 'This is some sample content for the card. You can put any text or additional elements here.',
            'image_url': 'media/team/eric_atkins.jpeg'
        },
        {
            'name': 'Zach Cobb',
            'role': 'Research',
            'description': 'This is some sample content for the card. You can put any text or additional elements here.',
            'image_url': 'https://placehold.co/100x100'
        },
        {
            'name': 'Nick Blank',
            'role': 'Research',
            'description': 'This is some sample content for the card. You can put any text or additional elements here.',
            'image_url': 'media/team/nick_blank.jpeg'
        }
    ]
    return render_template("profile.html", team_members=team_members)


if __name__ == '__main__':
    app.run()
