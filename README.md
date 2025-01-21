# Task Force Pro Edition: Wallet Web Application

This project is a web application designed to help users manage their finances efficiently by tracking income and expenses across multiple accounts, generating reports, setting budgets, and visualizing transaction summaries. It is built using Django for the backend and React with TypeScript (TSX) for the frontend.
## Deployment
This application is hosted on [render.com]. The live application can be accessed at:

[Live Application Link](https://wallet-app-coa.onrender.com/)
The bacend


## Features
1. **Transaction Tracking**:
   - Track all incoming and outgoing transactions from multiple accounts (e.g., bank accounts, mobile money, cash).
2. **Report Generation**:
   - Generate reports based on a specified time range.
3. **Budget Management**:
   - Set budgets with notifications triggered when limits are exceeded.
4. **Categories and Subcategories**:
   - Add categories and subcategories for expenses.
   - Link transactions to specific categories or subcategories.
5. **Visualization**:
   - Display transaction summaries in a visualized manner (e.g., charts and graphs).

## Getting Started
### Prerequisites
Ensure you have the following installed on your system:
- **Python** (>= 3.9)
- **Node.js** (>= 16.0) and **npm** or **yarn**
- **PostgreSQL** (or another preferred database for Django)

### Backend Setup (Django)
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up the database:
   - Update the database configuration in `settings.py`.
   - Run migrations:
     ```bash
     python manage.py migrate
     ```
5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup (React TSX  and Vite)
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install  # Or use `yarn install`
   ```
3. Start the React development server:
   ```bash
   npm run dev # Or use `yarn start`
   ```

### Running the Application
1. Start the Django backend server (as shown above).
2. Start the React frontend server (as shown above).
3. Open your browser and navigate to `http://localhost:3000` for the frontend.

## Functionalities Overview
- **Transaction Tracking**: Add, view, edit, and delete transactions.
- **Reporting**: Generate customizable reports based on time ranges.
- **Budgeting**: Define budget limits and receive notifications when exceeded.
- **Category Management**: Create and manage categories/subcategories for transactions.
- **Visualizations**: View transaction summaries as graphs or charts.

## Contributing
Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Screenshots

![App Home Page](https://raw.githubusercontent.com/AganzeFelicite/wallet_app_coa/refs/heads/main/screen_shots/Pasted%20image%20(2).png)

![App Dash board](https://raw.githubusercontent.com/AganzeFelicite/wallet_app_coa/refs/heads/main/screen_shots/Pasted%20image%20(3).png)


![App Dash board](https://raw.githubusercontent.com/AganzeFelicite/wallet_app_coa/refs/heads/main/screen_shots/Pasted%20image%20(5).png)


![App Dash logn](https://raw.githubusercontent.com/AganzeFelicite/wallet_app_coa/refs/heads/main/screen_shots/Pasted%20image.png)
