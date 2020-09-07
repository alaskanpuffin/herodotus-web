FROM nginx:1.11
COPY ./dist/ /usr/share/nginx/html
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT [ "/entrypoint.sh" ]