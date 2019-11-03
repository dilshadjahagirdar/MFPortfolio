FROM ruby:2.3.1
# Copy application code
COPY . /application
# Change to the application's directory
WORKDIR /application

# Install gems
RUN bundle install --deployment --without development test

ENV RAILS_ENV production

ENTRYPOINT ./entrypoint.sh

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt install -y nodejs
