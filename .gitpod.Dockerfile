FROM ubuntu:20.10

RUN apt update \
    && apt install -y \
        curl \
        zip \
        sudo \
        # software-properties-common provides add-apt-repository
        software-properties-common \
        # Packages needed to allow apt to use a repository over HTTPS
        apt-transport-https \
        ca-certificates \
        gnupg \
        lsb-release \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/*

# Install Docker
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
RUN echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt-get update && apt-get install -y docker-ce docker-ce-cli containerd.io

#
# Datasette
#

# Install python 3.9

RUN add-apt-repository ppa:deadsnakes/ppa && \
    apt install python3.9

# Taken from https://github.com/simonw/datasette/blob/main/Dockerfile
RUN add-apt-repository "deb http://httpredir.debian.org/debian sid main" && \
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