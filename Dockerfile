FROM node:14

EXPOSE 5000

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install 

COPY . .

CMD [ "npm", "run", "dev" ] 
