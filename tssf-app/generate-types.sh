#!/bin/bash

ENDPOINT="https://api.graph.cool/simple/v1/cjcjfm05056cp0141vrg7dpx0"
GEN_DIR="src/gen/"
SCHEMA="${GEN_DIR}/schema.json"
echo "export default \"$ENDPOINT\"" > "${GEN_DIR}/endpoint.ts"


apollo-codegen introspect-schema "$ENDPOINT" --output "$SCHEMA"
