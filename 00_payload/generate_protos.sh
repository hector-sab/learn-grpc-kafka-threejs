#!/bin/sh

# Ensure that protoc is installed for python
pip install grpcio-tools

# Add the protoc bin to our path temporarily
export PATH="$PATH":$(pwd)/grpc/protoc/bin

############ JS protos
# https://grpc.io/docs/platforms/web/basics/
protoc -I protos payload.proto \
    --js_out=import_style=commonjs:scripts


#### Python protos
 python -m grpc_tools.protoc -I protos/ --python_out=scripts/ ./protos/payload.proto
