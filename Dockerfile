FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

# Copia los archivos compilados de Angular al directorio de Nginx
COPY --from=build /app/dist/s6-capturador-front /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
