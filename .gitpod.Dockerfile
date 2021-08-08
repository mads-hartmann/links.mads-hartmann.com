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
# Dependencies: Python3 and pip3
#

# Ubuntu 20.10 ships with Python 3.8, but not with pip.
RUN apt-get install -y python3-pip

# Taken from https://github.com/simonw/datasette/blob/main/Dockerfile
# (Mads) Modified to add missing keys.
RUN add-apt-repository "deb http://httpredir.debian.org/debian sid main" && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 04EE7237B7D453EC && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 3B4FE6ACC0B21F32 && \
    apt-get update && \
    apt-get -t sid install -y --no-install-recommends libsqlite3-mod-spatialite && \
    apt clean && \
    rm -rf /var/lib/apt && \
    rm -rf /var/lib/dpkg/info/*

# Install datasette and datasette plugins.
RUN pip install datasette airtable-export sqlite-utils datasette-render-markdown

#
# NextJS
# Dependencies: Node, NPM
#

# See https://github.com/nodesource/distributions/blob/master/README.md
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && \
    sudo apt-get install -y nodejs

#
# Gitpod user
#

# Taken from https://github.com/gitpod-io/workspace-images/blob/master/base/Dockerfile
RUN useradd -l -u 33333 -G sudo -md /home/gitpod -s /bin/bash -p gitpod gitpod \
    # passwordless sudo for users in the 'sudo' group
    && sed -i.bkp -e 's/%sudo\s\+ALL=(ALL\(:ALL\)\?)\s\+ALL/%sudo ALL=NOPASSWD:ALL/g' /etc/sudoers
ENV HOME=/home/gitpod
WORKDIR $HOME
USER gitpod
