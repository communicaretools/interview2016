FROM phusion/passenger-nodejs:0.9.18
# Enable nginx/passenger
RUN rm -f /etc/service/nginx/down
RUN rm -f /etc/nginx/sites-enabled/default
ADD nginx.conf /etc/nginx/sites-enabled/webapp.conf
# Install application
RUN mkdir /home/app/webapp
ADD . /home/app/webapp
RUN chown -R app:app /home/app/*
