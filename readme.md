# This readme.md file is written by AI.

# Task Management Application

This is a simple task management application built with Node.js, Express, and EJS templating. Here's a complete breakdown of how it works:

## Overview

The application allows users to:

- Create tasks with titles and details
- View all tasks
- Read individual task details
- Edit tasks
- Delete tasks

## How It Works (Non-Technical Explanation)

1. **Home Page**

   - When you visit the website, you'll see a form at the top to create new tasks
   - Below that, you'll see all your existing tasks displayed as cards
   - Each task card shows the title and has three options:
     - "Read More" to view the full details
     - An edit button to modify the task
     - A delete button to remove the task

2. **Creating a Task**

   - Fill in the title field (like "Buy Groceries")
   - Add details in the larger text box (like "Milk, Bread, Eggs")
   - Click "Add Task" button
   - The app saves this information and shows it on the home page

3. **Viewing Task Details**

   - Click "Read More" on any task
   - This takes you to a new page showing:
     - The task's title at the top
     - All the details below
     - A home button to go back

4. **Editing a Task**

   - Click the edit icon (pencil) on any task card
   - This takes you to the edit page where you can:
     - Modify the task title
     - Update the task details
     - Click "Update Task" to save changes

5. **Deleting a Task**
   - Click the delete icon (trash can) on any task card
   - The task is immediately removed
   - The page refreshes to show your updated task list

## Behind The Scenes (Simple Technical Explanation)

1. **File Storage**

   - Each task is saved as a separate text file
   - The title becomes the filename
   - The details are stored inside the file

2. **Page Structure**

   - The app uses four main pages:
     - index.ejs (home page with all tasks)
     - show.ejs (individual task details)
     - edit.ejs (task editing interface)
     - A CSS file for styling everything

3. **Data Flow**
   - When you create a task: Form → Server → New File Created
   - When you view tasks: Files → Server → Displayed on Page
   - When you edit: Form → Server → File Updated
   - When you delete: Delete Request → Server → File Removed

The application uses a clean, dark-themed interface with a responsive design that works well on both desktop and mobile devices.

## Advanced Technical Details

1. **Server Architecture**
   - Built on Express.js framework
   - RESTful API design pattern for route handling
   - Uses Node.js File System (fs) module for file operations
   - Server runs on port 3000 by default

2. **Route Structure**
   - GET '/' - Main route that reads directory and renders index
   - POST '/create' - Handles task creation
   - GET '/files/:filename' - Dynamic route for viewing individual tasks
   - GET '/edit/:filename' - Shows task editing interface
   - POST '/update/:filename' - Handles task updates
   - GET '/delete/:filename' - Handles task deletion
   - Static route for serving public assets (CSS, images)

3. **View Engine Implementation**
   - EJS (Embedded JavaScript) templating
   - Dynamic content rendering using EJS tags (<%= %>)
   - Server-side data injection into templates

4. **Frontend Technologies**
   - TailwindCSS for responsive styling
   - Google Material Icons for UI elements
   - Mobile-first design approach
   - Semantic HTML5 structure

5. **Data Management**
   - File-based storage system
   - Asynchronous file operations using fs.readFile, fs.writeFile
   - Directory-based task organization
   - URL-safe filename generation (spaces removed)

6. **Error Handling**
   - Server-side error catching in file operations
   - Automatic redirects after operations
   - Graceful handling of missing files
   - Error callbacks in async operations

7. **Performance Considerations**
   - Static file caching
   - Asynchronous I/O operations
   - Minimal DOM manipulation
   - Optimized asset loading

8. **Security Measures**
   - Input sanitization for filenames
   - Express.urlencoded middleware for form parsing
   - Static file access restrictions
   - No direct file path exposure

This application demonstrates fundamental concepts of full-stack development while maintaining a simple and efficient architecture.
