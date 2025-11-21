
# 📦 Siddhi Collection – Online Saree & Kidswear Store  
A full-stack **MERN (MongoDB, Express.js, React, Node.js)** based e-commerce platform built for a clothing store to digitalize their business and provide a smooth, secure online shopping experience.

## 🌐 Live Demo
- **User Website:** https://siddhi-frontend-rho.vercel.app/  
- **Admin Panel:** https://siddhis-admin.vercel.app/

## 📘 Project Description
**Siddhi Collection** is an online store crafted to showcase and sell sarees and kidswear. This platform replaces manual selling and provides a complete digital system with:
- Real-time inventory management  
- Customer shopping interface  
- Secure admin dashboard  
- Cloud image storage  
- Fast & responsive UI  
- Secure authentication + order management  

## 🎯 Objectives
- Digitalize the entire product catalog  
- Enable online orders and user accounts  
- Provide a responsive shopping experience  
- Give admin full control over products & orders  
- Implement secure, scalable MERN architecture  

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Context API
- Axios
- Lucide Icons
- React Hot Toast

### Backend
- Node.js
- Express.js
- Mongoose
- JWT Authentication
- bcrypt
- Multer
- Cloudinary

### Database & Deployment
- MongoDB Atlas  
- Vercel  
- Cloudinary  

## 🏗 System Architecture
- **Frontend:** React SPA  
- **Backend:** Express REST API  
- **Database:** MongoDB Atlas  
- **Storage:** Cloudinary  
- **State Management:** Context API  
- **Auth:** JWT-based  

## ✨ Features

### User Features
- Browse and filter products  
- Add to cart & checkout  
- User login/registration  
- View order history  
- Track order status  
- Mobile-friendly UI  

### Admin Panel Features
- Admin login  
- Add/Edit/Delete products  
- Cloud image uploads  
- Manage inventory  
- Manage orders  
- View user details  

## 📂 Folder Structure
```
root
│── client/
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── pages/
│       └── utils/
│
│── server/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── config/
```

## 🔌 API Endpoints

### Auth
POST /api/register  
POST /api/login  
POST /api/admin/login  

### Products
GET /api/products  
GET /api/products/:id  
POST /api/products (Admin)  
DELETE /api/products/:id (Admin)

### Orders
POST /api/orders  
GET /api/orders/myorders  
GET /api/orders (Admin)  
PUT /api/orders/:id  

## 🚀 Future Enhancements
- AI recommendations  
- Advanced search  
- PWA  
- Mobile app  
- Multi-vendor support  

## 📝 Conclusion
This MERN-based e-commerce platform digitalizes Siddhi Collection and provides a scalable solution for modern retail.
