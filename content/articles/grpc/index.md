---
title: gRPC
description: "Build gRPC endpoint using Vert.x"
date: "2023-10-31"
categories:
  - "vert.x"
keywords:
  - "vert.x"
  - "java"
  - "youtube"
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/i5wI3T-ubcM?si=XPi4yUugM6CLLUxQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Birb Service
-----------
A gRPC service that provides methods to get birb information

Protobuf Schema - Birb.proto
```proto
syntax = "proto3";

package protobuf_schema.grpc;
option java_multiple_files = true;
option java_package = "com.birb.protobuf.grpc";
option java_outer_classname = "BirbProto";

enum BirbType {
  UNKNNOW = 0;
  COCKATIEL = 1;
  LOVEBIRD = 2;
  MYNAH = 3;
  PIGEON = 4;
}

service BirbService {
  rpc GetBirb (GetBirbRequest) returns (GetBirbResponse) {}
  rpc GetBirbByType (GetBirbByTypeRequest) returns (GetBirbByTypeResponse) {}

}

message Birb {
  int64 id = 1;
  string name= 2;
  string sound = 3;
  float volume = 4;
  BirbType type = 5;
}

message GetBirbRequest {
  int64 id = 1;
}

message GetBirbResponse {
  Birb birb = 1;
}

message GetBirbByTypeRequest {
  BirbType type = 1;
}

message GetBirbByTypeResponse {
  repeated Birb birb = 1;
}


```
