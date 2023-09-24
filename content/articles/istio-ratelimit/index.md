---
title: "Istio Rate Limit."
description: "This description will be used for the article listing and search results on Google."
date: "2023-09-22"
banner:
  src: "../../images/kelly-sikkema-Hl3LUdyKRic-unsplash.jpg"
  alt: "First Markdown Post"
  caption: 'Photo by <u><a href="https://unsplash.com/photos/Nc5Q_CEcY44">Florian Olivo</a></u>'
categories:
  - "Istio"
keywords:
  - "Rate limit"
  - "Istio"
---

### Envoy Proxy in Istio

You can use envoy to rate limit an Istio service. There are 2 types of rate limiting in Istio:
- **Global rate limiting** provides rate limiting for all the services in the entire service mesh.
- **Local rate limiting** limits all the requests at kpod level and apply rate limit to each kpod that has an envoy proxy injected.

### Local Rate Limiting

#### All paths - including gRPC/HTTP

Apply a rate limit of 10 requests/minute to **all paths** (not individual paths) by applying the envoy filter to the your-service:
```
$ kubectl apply -f - <<EOF
apiVersion: networking.istio.io/v1alpha3
kind: EnvoyFilter
metadata:
  name: your-service-ratelimit
  namespace: your-service-namespace
spec:
  configPatches:
    - applyTo: HTTP_FILTER
      match:
        context: SIDECAR_INBOUND
        listener:
          filterChain:
            filter:
              name: "envoy.filters.network.http_connection_manager"
      patch:
        operation: INSERT_BEFORE
        value:
          name: envoy.filters.http.local_ratelimit
          typed_config:
            "@type": type.googleapis.com/udpa.type.v1.TypedStruct
            type_url: type.googleapis.com/envoy.extensions.filters.http.local_ratelimit.v3.LocalRateLimit
            value:
              stat_prefix: http_local_rate_limiter
              token_bucket:
                max_tokens: 10
                tokens_per_fill: 10
                fill_interval: 60s
              filter_enabled:
                runtime_key: local_rate_limit_enabled
                default_value:
                  numerator: 100
                  denominator: HUNDRED
              filter_enforced:
                runtime_key: local_rate_limit_enforced
                default_value:
                  numerator: 100
                  denominator: HUNDRED
              response_headers_to_add:
                - append: true
                  header:
                    key: x-local-rate-limit
                    value: 'true'
EOF
```

Check that envoy filter is running:
```
$ kubectl -n your-service-namespace get envoyfilter
your-service-ratelimit
```

Call your service > 10 times in a minute using curl:
```
$ curl http://localhost/service/path1
$ curl http://localhost/service/path1
..
$ curl http://localhost/service/path10
$ curl http://localhost/service/path11
```

11th response will return 429 error:
```
local_rate_limit with 429 code in the header
```


#### [Specific path](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/local_rate_limit_filter)
```yaml
  ...
  - match: {prefix: "/path/with/rate/limit"}
    route: {cluster: service_protected_by_rate_limit}
    typed_per_filter_config:
      envoy.filters.http.local_ratelimit:
        "@type": type.googleapis.com/envoy.extensions.filters.http.local_ratelimit.v3.LocalRateLimit
        stat_prefix: http_local_rate_limiter
        token_bucket:
          max_tokens: 10000
          tokens_per_fill: 1000
          fill_interval: 1s
    ...
```

You can also use [action and descriptor](https://learncloudnative.com/blog/2023-07-23-global-rate-limiter) to rate limit by headers and paths.
