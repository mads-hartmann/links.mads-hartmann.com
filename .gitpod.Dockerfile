# Taken from https://github.com/simonw/datasette/blob/main/Dockerfile

FROM python:3.9.2-slim-buster

# software-properties-common provides add-apt-repository
# which we need in order to install a more recent release
# of libsqlite3-mod-spatialite from the sid distribution
RUN apt-get update && \
    apt-get -y --no-install-recommends install software-properties-common && \
    add-apt-repository "deb http://httpredir.debian.org/debian sid main" && \
    apt-get update && \
    apt-get -t sid install -y --no-install-recommends libsqlite3-mod-spatialite && \
    apt-get remove -y software-properties-common && \
    apt clean && \
    rm -rf /var/lib/apt && \
    rm -rf /var/lib/dpkg/info/*

RUN pip install datasette airtable-export