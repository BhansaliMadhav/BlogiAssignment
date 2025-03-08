# Blog Project - Full Stack Application

This is a full-stack blog application using **PostgreSQL, Node.js (Express + Prisma), and React**. The project is containerized using **Docker and Docker Compose** to manage the database, backend, and frontend services.

## 🚀 Technologies Used

- **Frontend:** Next.js
- **Backend:** Node.js, Express.js, Prisma ORM
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose

---

## 📂 Project Structure

```
📦 blog-project
├── 📂 backend           # Backend (Node.js + Express + Prisma)
│   ├── Dockerfile       # Backend Dockerfile
│   ├── package.json     # Dependencies and scripts
│   ├── prisma/schema.prisma  # Prisma schema
│   ├── src/index.js     # Main server entry point
│   ├── .env            # Environment variables
├── 📂 frontend          # Frontend (React + Next.js)
│   ├── Dockerfile       # Frontend Dockerfile
│   ├── package.json     # Dependencies and scripts
│   ├── src/App.js       # Main React app
│   ├── .env            # Environment variables
├── 📂 database          # PostgreSQL container (via Docker Compose)
├── docker-compose.yml   # Manages all services
├── .dockerignore        # Ignore unnecessary files in Docker builds
└── README.md            # Documentation
```

---

## 🛠️ Setup Instructions

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/your-username/blog-project.git
cd blog-project
```

### 2️⃣ **Environment Variables**

Create a **.env** file in the `backend/` folder with the following:

```env
DATABASE_URL=postgresql://root:secret@postgres:5432/mydatabase
PORT=5000
```

⚠️ Note: If you are not using Docker, you must update DATABASE_URL to match your actual database configuration. The format is:

Create a **.env** file in the `frontend/` folder with:

```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

### 3️⃣ **Build and Start Services with Docker**

Make sure **Docker** and **Docker Compose** are installed, then run:

```sh
docker-compose up --build
```

- This will start:
  - **PostgreSQL** (port `5432` → `5432` inside the container)
  - **Backend API** (port `5000`)
  - **Frontend UI** (port `3000`)

---

## 📌 Running Prisma Migrations

After the backend container is running, apply Prisma migrations:

```sh
docker exec -it blog_backend npx prisma migrate dev
```

Or, to generate Prisma client manually:

```sh
docker exec -it blog_backend npx prisma generate
```

---

## 📡 API Endpoints

Once running, the backend API will be available at `http://localhost:5000`.

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| GET    | `/posts`     | Fetch all posts   |
| POST   | `/posts`     | Create a new post |
| GET    | `/posts/:id` | Get a single post |
| PUT    | `/posts/:id` | Update a post     |
| DELETE | `/posts/:id` | Delete a post     |

---

## 🖥️ Accessing the Frontend

Once running, open the frontend in your browser:

```sh
http://localhost:3000
```

---

## 🔧 Stopping the Containers

To stop all services, use:

```sh
docker-compose down
```

To remove all containers and volumes:

```sh
docker-compose down -v
```

---

## 📜 License

This project is licensed under the **MIT License**. Feel free to modify and use it!
