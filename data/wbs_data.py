from dataclasses import dataclass
from typing import List



@dataclass
class WBSItem:
    title: str
    description: str

@dataclass
class WBSData:
    title: str
    color: str
    items: List[WBSItem]

wbs_data = [
    {
        "title": "Home Page",
        "color": "indigo",
        "items": [
            {
                "title": "Welcome Header",
                "description": "Warm welcome with a small description of what the website does."
            },
            {
                "title": "Navigation Header",
                "description": "Has options to redirect any page"
            },
            {
                "title": "Learn About Team",
                "description": "Selecting the button redirects to the About Me page."
            }
        ]
    },
    {
        "title": "WBS",
        "color": "pink",
        "items": [
            {
                "title": "Work Breakdown Page",
                "description": "This page will feature a Live updated version of this WBS as we add new features and pages to our app."
            }
        ]
    },
   
    {
        "title": "Gantt Chart",
        "color": "purple",
        "items": [
            {
                "title": "Format",
                "description": "The Gantt Chart will have the correct format required for this project"
            },
            {
                "title": "Schedule",
                "description": "The schedule will have the correct dates listed for each section"
            },
            {
                "title": "Interactive Timeline",
                "description": "It is a live timeline of our website."
            }
        ]
    },
    {
        "title": "Functionality",
        "color": "orange",
        "items": [
            {
                "title": "Login",
                "description": "A login page where a user has to create an account."
            },
            {
                "title": "Create Task",
                "description": "Create tasks with time and priority settings."
            },
            {
                "title": "Calendar View",
                "description": "Monthly calendar view with all scheduled tasks."
            }
        ]
    }
]

converted_data = [
    WBSData(
        title=section["title"],
        color=section["color"],
        items=[WBSItem(title=item["title"], description=item["description"]) for item in section["items"]]
    )
    for section in wbs_data
]