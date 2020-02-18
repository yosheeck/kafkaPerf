FROM node:lts

RUN apt-get update
RUN apt-get -y install mc

RUN git clone https://github.com/yosheeck/kafkaPerf

WORKDIR /kafkaPerf

RUN npm ci
