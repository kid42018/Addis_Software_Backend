FROM node:alpine
WORKDIR /src
COPY . .
RUN npm install
EXPOSE 8000
CMD ["npm", "start"]