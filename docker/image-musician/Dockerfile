FROM node:10.0 

COPY src /opt/app 

RUN apt-get update && apt-get install -y vim 

ENTRYPOINT ["node", "/opt/app/musician.js"]

