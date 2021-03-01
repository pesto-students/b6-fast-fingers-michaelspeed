FROM michaelspeed/node-docker-14:latest

WORKDIR /app

COPY . .

RUN rm -rf node_modules

RUN yarn --frozen-lockfile

COPY ./staging/nginx.conf /etc/nginx/conf.d/default.conf

ENV NGINX_STATIC /usr/share/nginx/html/
ENV NGINX_CONF /etc/nginx/
RUN nginx -t

RUN apk update && apk add --no-cache supervisor

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 3333 4200 8080 80

CMD ["/usr/bin/supervisord"]
