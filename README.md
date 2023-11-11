# ShopCart Project

ShopCart is a full-stack e-commerce application inspired by platforms like Amazon and Flipkart. The project is built using React.js, HTML, CSS, Material-UI for the frontend, and Node.js, Express.js, and MongoDB for the backend.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [User Flow](#user-flow)
3. [Project Structure](#project-structure)
4. [Screenshots](#screenshots)
5. [Database Structure](#database-structure)
6. [Server File](#server-file)

## Technologies Used

- **Frontend:**
  - React.js
  - HTML
  - CSS
  - Material-UI

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  
## User Flow

The application follows a user-friendly flow:

1. **Login and Register:** Users can log in or register with validation and authentication. Only logged-in users can access the home page, and unauthorized attempts to access the home page via URL manipulation are prevented.

2. **Home Page:** Features a search bar, profile button, cart icon (with item count badge), and logout option. The profile page displays user information stored in MongoDB. The header includes a menu for categories, sub-categories, and an image slider. Display items from five main categories, allowing users to view all items or click on a specific item for detailed information

3. **Category Pages:** Display items from all main categories, allowing users to view all items or click on a specific item for detailed information.

4. **Single Item Page:** Shows detailed information about a selected item, including images, prices, discounts, ratings, and a tab navigation system for full product description and reviews.

5. **Cart Page:** Displays the current items in the cart, allowing users to delete items, clear the entire cart, and adjust item quantities. Previous orders are also visible.

6. **Checkout Page:** Utilizes Material-UI's stepper component for a three-step process: delivery address, order summary, and payment options.

7. **Order Success Page:** Confirms a successful order placement.

## Project Structure

The project is divided into two main folders:

- **Frontend:** Contains the React.js application.
- **Server:** Contains the Node.js and Express.js backend.

## Screenshots

### Login Page and sign up
![Login Page](/screenshots/login.png)
![register Page](/screenshots/register.png)


### Home Page
![Home Page](/screenshots/home1.png)

![Home Page](/screenshots/home2.png)
![Home Page](/screenshots/home3.png)
![Home Page](/screenshots/home4.png)

### Search Page
![ Search Page](/screenshots/search.png)

### Profile Page
![Profile Page](/screenshots/profile.png)


### Category Page
![ Category Page](/screenshots/category.png)
![ Category Page](/screenshots/category1.png)


### Detailed Page
![Detailed Page](/screenshots/singlepage.png)
![Detailed Page](/screenshots/singlepage1.png)


### Cart Page
![Cart Page](/screenshots/cart.png)
![Cart Page](/screenshots/cart1.png)


### Checkout Page
![Checkout Page](/screenshots/checkout.png)
![Checkout Page](/screenshots/checkout1.png)
![Checkout Page](/screenshots/checkout2.png)
![Checkout Page](/screenshots/success.png)


### Skeletons
![Skeleton Page](/screenshots/skeleton.png)
![Skeleton Page](/screenshots/skeleton1.png)

## Database Structure

The MongoDB database contains four main collections:

1. **User:**
   - _id
   - name
   - email
   - password
   - address
   - mobileNumber

2. **Products:**
   - _id
   - product_id
   - product_name
   - category
   - discounted_price
   - actual_price
   - discount_percentage
   - rating
   - rating_count
   - about_product
   - user_id
   - user_name
   - review_id
   - review_title
   - review_content
   - img_link
   - product_link

3. **Cart:**
   - _id
   - email
   - items
     - itemId
     - itemName
     - itemPrice
     - quantity
     - itemImg

4. **Ordered:**
   - _id
   - email
   - items
     - itemId
     - itemName
     - itemPrice
     - quantity
     - itemImg

## Server File

The server file is hosted separately on GitHub. You can find it [here](link).

Feel free to explore the code and contribute to the project!
