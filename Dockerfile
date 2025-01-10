
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGODB_URI=mongodb+srv://deepu024:deepu024@cluster0.e0p6uim.mongodb.net/
ENV MONGODB_DBNAME=deni
ENV PORT=8080
ENV JWT_SECRET=slidgfisudyfgiksduyvfksidvsldufv
ENV GOOGLE_CLIENT_ID=966416161943-ei2p86e6mq2da05tn1mven4v87konelk.apps.googleusercontent.com
ENV JWT_REFRESH_SECRET=sldkfbisdkuhfbskdufhbsdkufhbsdkfh
ENV BASE_URL=http://localhost:8080
ENV CLOUDINARY_NAME=dztwfu9ls
ENV CLOUDINARY_API_KEY=212275172492141
ENV CLOUDINARY_API_SECRET=B6uRwYQGH5KuP7xpWG6ZCdvCri0

EXPOSE 8080

CMD [ "node", "index.js" ]