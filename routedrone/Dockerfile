# Build stage
FROM node:alpine AS build
WORKDIR /routedrone
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build && ls /routedrone/dist

# Production stage
FROM nginx:alpine
COPY --from=build /routedrone/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
