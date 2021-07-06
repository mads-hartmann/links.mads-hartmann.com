FROM ubuntu:20.10

RUN apt update \
    && apt install -y \
        curl \
        zip \
        sudo \
        # Packages needed to allow apt to use a repository over HTTPS
        apt-transport-https \
        ca-certificates \
        gnupg \
        lsb-release \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/*

# Install Docker
RUN curl -o /var/lib/apt/docker.gpg -fsSL https://download.docker.com/linux/ubuntu/gpg \
    && apt-key add /var/lib/apt/docker.gpg \
    && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
    && install-packages docker-ce docker-ce-cli containerd.io

#
# Datasette
#

# Install python 3.9

RUN add-apt-repository ppa:deadsnakes/ppa && \
    apt install python3.9

# Taken from https://github.com/simonw/datasette/blob/main/Dockerfile
# software-properties-common provides add-apt-repository
# which we need in order to install a more recent release
# of libsqlite3-mod-spatialite from the sid distribution
RUN apt-get -y --no-install-recommends install software-properties-common && \
    add-apt-repository "deb http://httpredir.debian.org/debian sid main" && \
    apt-get update && \
    apt-get -t sid install -y --no-install-recommends libsqlite3-mod-spatialite && \
    apt-get remove -y software-properties-common && \
    apt clean && \
    rm -rf /var/lib/apt && \
    rm -rf /var/lib/dpkg/info/*

RUN pip install datasette airtable-export sqlite-utils datasette-render-markdown

#
# 11ty
#