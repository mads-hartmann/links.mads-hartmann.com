FROM gitpod/workspace-full

#
# NextJS
# Dependencies: Node, NPM
#

# See https://github.com/nodesource/distributions/blob/master/README.md
# I need Node 14 (for Vercel) and NPM 8
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash - && \
    sudo apt-get install -y nodejs && \
    sudo npm install -g npm@8
