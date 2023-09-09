[video demo](https://youtu.be/WSbnVznVOK8)

[See images of final app](https://docs.google.com/document/d/1cg5DogL1P8y5i2rO2YBmQABbFFfQXQmMwu-PH0de-Ic/edit?usp=sharing)

 

# Reminder App

A full-stack application that helps users set and manage reminders.

## Features

- User Authentication: Sign up, log in, and log out.
- Reminder Management: Create, modify, delete, and view reminders.
- Notifications: Receive reminder notifications via email or SMS.

## Tech Stack

- **Frontend**: React with Material-UI for styling.
- **Backend**: Django with the Django Rest Framework.

## Getting Started

### Prerequisites

- Python (3.8 or newer recommended)
- Node.js
- npm or yarn

### Setting Up the Backend

1. Clone the repository:

   \```
   git clone [your-repository-link]
   cd backend   # navigate into the backend directory
   \```

2. Set up a virtual environment and activate it:

   \```
   python -m venv venv
   # For Windows:
   .\venv\Scripts\activate
   # For Mac/Linux:
   source venv/bin/activate
   \```

3. Install the required Python packages:

   \```
   pip install -r requirements.txt
   \```

4. Apply migrations:

   \```
   python manage.py migrate
   \```

5. Run the development server:

   \```
   python manage.py runserver
   \```

### Setting Up the Frontend

1. Navigate to the frontend directory:

   \```
   cd frontend
   \```

2. Install dependencies:

   \```
   npm install
   # or
   yarn
   \```

3. Start the development server:

   \```
   npm start
   # or
   yarn start
   \```

The app should now be running on `http://localhost:3000/`.

 
 
## License

[MIT](https://choosealicense.com/licenses/mit/)
