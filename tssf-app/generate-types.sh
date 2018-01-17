#!/bin/bash

set -x
set -e
ENDPOINT="https://api.graph.cool/simple/v1/cjcjfm05056cp0141vrg7dpx0"
GEN_DIR="src/gen/"
SCHEMA="${GEN_DIR}/schema.json"

# Generate .ts file with the URL for the GraphQL endpoint
echo "export default '$ENDPOINT';" > "${GEN_DIR}/endpoint.ts"

# Generate the local json representation of the schema
apollo-codegen introspect-schema "$ENDPOINT" --output "$SCHEMA"

# Note that apollo-codegen tends to fail siliently.
# If you get "...is not a module" errors, that may be because apollo-codegen failed
apollo-codegen generate 'src/**/*.{ts,tsx}' --schema "$SCHEMA" --target typescript --output "${GEN_DIR}/gql-types.ts"

echo "All Done"