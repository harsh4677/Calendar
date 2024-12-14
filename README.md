- A summary of the features.

- Instructions to run the app locally.
- A link to the deployed app.

---

# Calendar Application

A simple yet feature-rich calendar application that allows users to manage their events efficiently. It includes event creation, editing, deletion, and other helpful features like month transitions, filtering, and more.

## Features

### 1. **Feature Set**

#### **Calendar View**
- Displays a calendar grid for the current month with proper alignment of all days.
- Users can easily switch between months using **Previous** and **Next** buttons.

#### **Event Management**
- Users can **add events** by clicking on any day in the calendar.
- Events can be **edited or deleted** from a selected day.
- Each event includes the following information:
  - **Event Name**
  - **Start Time and End Time**
  - **Optional Description**

#### **Event List**
- Displays a list of all events for the selected day in a modal at a side panel for easy viewing.

#### **Data Persistence**
- Uses **localStorage** or an in-memory data store to ensure events persist across page refreshes.

---

### 2. **UI Requirements**
- A **clean and modern UI** 
- Days are displayed in a grid layout, with clear separation between weekdays and weekends.
- The **current day** and **selected day** are highlighted visually to improve the user experience.

---

### 3. **Complex Logic**
- **Automatic month transitions**: Automatically handle month transitions, 
- **Event overlap prevention**: Ensure that users cannot add overlapping events at the same time.
- **Event filtering**: Allow users to filter events by keyword for better organization.

---

### 4. **Bonus Features **
- **Drag-and-drop functionality**: Allows users to reschedule events by dragging them between different days.
- **Color coding for events**: Events can be color-coded based on categories (e.g., work, personal, others) for better identification.
- **Event export**: Users can export the event list for a specific month as a **JSON** or **CSV** file.

---

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd calendar
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm start
   ```

5. Open the application in your browser at `http://localhost:3000`.

---
## A link to the deployed app.

# Calendar
# Calendar
