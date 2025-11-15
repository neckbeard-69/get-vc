FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . .
RUN go build -o /bin/go-cli

FROM alpine:3.20
WORKDIR /srv
COPY --from=builder /bin/go-cli ./go-cli
ENV PORT=8080
EXPOSE 8080
CMD ["/srv/go-cli"]
