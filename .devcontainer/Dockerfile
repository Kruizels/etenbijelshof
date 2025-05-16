FROM mcr.microsoft.com/devcontainers/javascript-node:22

ARG SUPABASE_CLI_VERSION=1.208.0
RUN wget -O /tmp/supabase.deb \
    https://github.com/supabase/cli/releases/download/v${SUPABASE_CLI_VERSION}/supabase_${SUPABASE_CLI_VERSION}_linux_amd64.deb \
  && dpkg -i /tmp/supabase.deb \
  && rm /tmp/supabase.deb
