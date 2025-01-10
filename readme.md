# Deni (Backend)

This repository contains an Express.js application configured to run inside a Docker container. Follow the instructions below to set up and run the project.

---

## Prerequisites

Ensure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)

---

## Project Structure

```
.
├── Dockerfile
├── package.json
├── package-lock.json
│── index.js
└── README.md
```

### Key Files

- `Dockerfile`: Defines the Docker image and instructions to build it.
- `index.js`: The entry point of the Express application.
- `package.json`: Contains project dependencies and scripts.

---

## Getting Started

### Build the Docker Image

To build the Docker image for the project, run the following command:

```bash
docker build -t be-deni .
```

### Run the Docker Container

After building the image, start the container with:

```bash
docker run -p 8080:8080 be-deni
```

### Access the Application

Once the container is running, you can access the application in your browser at:

```
http://localhost:8080
```

---

## Environment Variables

The project uses the following environment variables:

- `MONGODB_URI`: MongoDB connection string
- `MONGODB_DBNAME`: MongoDB database name
- `PORT`: Port the application runs on (default: 8080)
- `JWT_SECRET`: Secret key for JSON Web Tokens
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `JWT_REFRESH_SECRET`: Secret key for JWT refresh tokens
- `BASE_URL`: Base URL for the application
- `CLOUDINARY_NAME`: Cloudinary account name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

To override these variables, use the `-e` flag when running the container:

```bash
docker run -p 8080:8080 -e PORT=3000 be-deni
```

---

## Logs

To view logs from the running container:

```bash
docker logs <container-id>
```

## Stop the Container

To stop the running container:

1. Find the container ID:

   ```bash
   docker ps
   ```
2. Stop the container:

   ```bash
   docker stop <container-id>
   ```

---

## Common Issues

### Unable to Access the Application

- Ensure the container is running (`docker ps`).
- Verify the port mapping (`-p 8080:8080`).
- Check that the application binds to `0.0.0.0` in `index.js`.

---

## Contributing

Feel free to open issues or submit pull requests if you find bugs or want to add features.

---

## License

This project is licensed under the [MIT License](LICENSE).
