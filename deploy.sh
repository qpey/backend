#!/bin/bash

echo What should the vesion be?
read VERSION

docker build -t ianbalijawa/qpey:$VERSION .
docker push ianbalijawa/qpey:$VERSION

ssh root@private_ip "docker pull ianbalijawa/qpey:$VERSION && docker tag ianbalijawa/qpey:$VERSION && dokku deploy api $VERSION"
