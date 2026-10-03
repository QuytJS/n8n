FROM nginx:alpine

# Copy static web files to nginx default directory
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
