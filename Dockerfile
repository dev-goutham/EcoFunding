FROM node:16 as build 

WORKDIR /app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm run install

COPY ./jsconfig.json ./jsconfig.json 

COPY ./src ./src
COPY ./public ./public 
 
RUN npm run build 

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/static .

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]